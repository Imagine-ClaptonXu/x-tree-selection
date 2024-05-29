<template>
    <div class="container">
        <h3>x-tree-selection</h3>
        <hr>

        <button v-if="!close" @click="toggleBox">show x-tree-selection</button>
        <div class="outBox" id="id-outBox" v-if="close">
            <div class="titleTile" id="id-outBoxDrag">
                <div class="titleName">x-tree-selection</div>
                <div class="closeBtn" @click="toggleBox">
                    <div class="closeBtnIcon closeIcon"></div>
                </div>
            </div>
            <div class="midBody">
                <div class="midInnerTree">
                    <div class="treeBox">
                        <div class="topTreeSearch">
                            <div class="searchIcon" v-if="treeSearchText.length === 0"></div>
                            <input placeholder="搜搜看吧" v-model="treeSearchText" type="text">
                            <div class="clearSearch closeIcon" v-if="treeSearchText.length !== 0" @click="clearSearch"></div>
                        </div>
                        <div class="bodyArr">
                            <div class="handTreeBox">
                                <tree-selection
                                    ref="xTree"
                                    class="treeOutBox"
                                    :hlWord="toLower(treeSearchText)"
                                    :treeBoxData="menuOptions2"
                                    :outData="menuOptions2"
                                    @selfSeled="seledParent"
                                    @noSeled="noSelParent"
                                ></tree-selection>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottomBtnLine">
                <div class="leftDefaultBtn btmBtn" @click="clickCancelBtn">取消</div>
                <div class="leftConfirmDBtn btmBtn" @click="clickConfirmBtn">确定</div>
            </div>
        </div>
        <hr>

        <div>
            <div class="result">已选：</div>
            <textarea v-model="result" name="" id="" cols="5" rows="10"></textarea>
        </div>
        <hr>

        <div>
            <button class="result" @click="addSeledTreeData">模拟初始化时已有数据的情况</button>
            <li>3层1-1-2</li>
        </div>
        <hr>
    </div>
</template>

<script setup>
import {
    ref,
    onMounted,
    watch,
} from 'vue'
import {
    log,
    BusInstance,
    toLower,
} from './utils/tools.js'
import TreeSelection from "./components/innerTreeSelection.vue"
import {
    mockData,
} from './mockData.js'


const treeSearchText = ref('')
const menuOptions = ref([])
const menuOptions2 = ref([])
const menuOptions2Bak = ref([])
const filterTreeArr = ref([])
const result = ref('')
const close = ref(true)


onMounted(() => {
    log('onMounted')
    getTreeData()
    BusInstance.on('selfSeled', seledParent)
    BusInstance.on('noSeled', noSelParent)
})

watch(treeSearchText, (val) => {
    filterTreeArr.value = []
    let a = toLower(val)
    filterTreeData(a)
})

const toggleBox = function() {
    close.value = !close.value
}

const clearSearch = function() {
    treeSearchText.value = ''
}

const clickCancelBtn = function() {
    result.value = ''
    clearSearch()
    initTreeData(mockData)
}

const clickConfirmBtn = function() {
    getSeledTreeData()
}

const getTreeData = function() {
    menuOptions.value = mockData
    initTreeData(mockData)
}

const getSeledTreeData = function() {
    let r = []
    r = getSeledTreeDataInner(menuOptions2.value, [])
    result.value = r.join(', ')
    return r
}

const getSeledTreeDataInner = function(d) {
    let r = []
    d.forEach(e => {
        // 这里不关联父子，只放入当前行
        if (e.is_sel === 'selfSeled') {
            r.push(e.code)
        }
        if (e.children && e.children.length > 0) {
            let a = getSeledTreeDataInner(e.children)
            r = [...r, ...a]
        }
    })
    return r
}

const filterTreeData = function(d) {
    closeAllTreeDataInner(menuOptions2.value, false)
    filterTreeDataInner(menuOptions2.value, d)
    openSeledTreeParent(d)
}

const closeAllTreeDataInner = function(arr, val) {
    arr.forEach(e => {
        e.show_line = val
        e.is_open = val
        if (e.children && e.children.length > 0) {
            closeAllTreeDataInner(e.children, val)
        }
    })
}

const filterTreeDataInner = function(arr, val) {
    arr.forEach(e => {
        if (e.name.includes(val)) {
            e.show_line = true
            e.is_open = true
            filterTreeArr.value.push(e)
        }
        if (e.children && e.children.length > 0) {
            filterTreeDataInner(e.children && e.children, val)
        }
    })
}

const openSeledTreeParent = function() {
    filterTreeArr.value.forEach(e => {
        openSeledTreeParentInner(menuOptions2.value, e)
    })
}

const openSeledTreeParentInner = function(d, line) {
    let n = line.menuType
    let code = line.code
    if (n !== 1) {
        d.forEach(e => {
            if (e.children.length > 0) {
                let needUnder = true
                e.children.forEach(e2 => {
                    if (e2.code === code) {
                        e.show_line = true
                        e.is_open = true
                        needUnder = false
                        if (e.menuType !== 1) {
                            // 找上级
                            openSeledTreeParentInner(menuOptions2.value, e)
                        }
                    }
                })
                // 找下级
                if (needUnder) {
                    openSeledTreeParentInner(e.children, line)
                }
            }
        })
    } else {
        d.forEach(e => {
            if (e.code === code) {
                e.show_line = true
                e.is_open = true
            }
        })
    }
}

const addSeledTreeData = function(d='') {
    initTreeData(mockData)
    d = [
        "1-1-2",
    ]
    d.forEach(e => {
        addSeledTreeDataInner(menuOptions2.value, e)
    })
}

const addSeledTreeDataInner = function(data, code) {
    data.forEach(e => {
        if (e.code === code) {
            e.is_sel = 'selfSeled'
            e.is_open = true
            checkSameLvAndParentLv(menuOptions2.value, e, 'selfSeled')
        } else {
            if (e.children && e.children.length > 0) {
                addSeledTreeDataInner(e.children, code)
            }
        }
    })
}

const initTreeData = function(d) {
    let data = d
    let formatData = []
    formatData = initTreeDataInner(data, 0)
    menuOptions2Bak.value = JSON.parse(JSON.stringify(formatData))
    menuOptions2.value = JSON.parse(JSON.stringify(menuOptions2Bak.value))
}

const initTreeDataInner = function(d, p_code) {
    let r = []
    if (d.length > 0) {
        let d2 = JSON.parse(JSON.stringify(d))
        d2.forEach(e => {
            let o = {}
            let lName = toLower(e.name)
            o.code = e.code
            o.name = lName
            o.nameSplit = e.name.split('')
            o.menuType = e.menuType
            o.is_sel = 'noSeled'
            o.is_open = true
            o.btnShow_openArrow = e.children && e.children.length > 0
            o.btnShow_sel = true
            o.show_line = true
            o.p_code = p_code
            o.children = initTreeDataInner(e.children, e.code)
            r.push(o)
        })
    }
    return r
}

const seledParent = function(d) {
    checkSameLvAndParentLv(menuOptions2.value, d, 'selfSeled')
}

const noSelParent = function(d) {
    checkSameLvAndParentLv(menuOptions2.value, d, 'noSeled')
}

const checkSameLvAndParentLv = function(arr, d, r) {
    // 父元素不是 0，再看同级和父元素
    if (d.p_code !== 0) {
        let p_code = d.p_code
        let findParent = false
        arr.forEach(e => {
            // 找父元素
            if (e.code === p_code) {
                findParent = true
                e.is_sel = checkSonAllSeled(r, e.children)
                checkSameLvAndParentLv(menuOptions2.value, e, r)
                return
            }
            if (!findParent) {
                checkSameLvAndParentLv(e.children, d, r)
                return
            }
        })
    }
}

const checkSonAllSeled = function(r, arr) {
    arr.forEach(e => {
        if (e.is_sel !== r) {
            r = 'sonSeled'
        }
    })
    return r
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
