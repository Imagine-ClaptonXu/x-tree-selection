<template>
    <div class="treeBoxInnerComponent">
        <div class="lineBox" v-for="(e) in treeBoxData">
            <div class="lineSame"
                :style="`specClass-${e.code}`"
                :class="{
                    'firstLine': e.menuType === 1,
                    'seledHL': e.is_sel !== 'noSeled' || e.menuType === 1,
                    'notFirstLine': e.menuType !== 1,
                    'font3': e.menuType > 2,
                }"
                v-if="e.show_line"
            >
                <div class="spaceHolder" :style="{'margin-left': `${(e.menuType - 2) < 0 ? 0 : 25 * (e.menuType - 2)}px`}"></div>    

                <div class="leftArrow" v-if="e.btnShow_openArrow && e.menuType !== 1" @click="openSon(e)">
                    <div class="leftArrowSonOpen" v-if="e.is_open"></div>
                    <div class="leftArrowSonClose" v-else></div>
                </div>
                <div class="leftArrow" v-if="!e.btnShow_openArrow && e.menuType !== 1"></div>
                
                <div class="selIconBox" v-if="e.btnShow_sel" @click="selLine(e)">
                    <div class="eachSelIcon selClassNo" :class="{'eachSelSonIcon': e.menuType !== 1}" v-if="e.is_sel === 'noSeled'"></div>
                    <div class="eachSelIcon selClassSelf" :class="{'eachSelSonIcon': e.menuType !== 1}" v-if="e.is_sel === 'selfSeled'"></div>
                    <div class="eachSelIcon selClassSon" :class="{'eachSelSonIcon': e.menuType !== 1}" v-if="e.is_sel === 'sonSeled'"></div>
                </div>
                
                <div class="wordLine">
                    <div class="innerWord" :class="{'hlWordClass': hlWord.includes(toLower(eachWord))}" v-for="(eachWord) in e.nameSplit">
                        {{eachWord}}
                    </div>
                </div>
                
                <div class="rightArrow" v-if="e.btnShow_openArrow && e.menuType === 1" @click="openSon(e)">
                    <div class="rightArrow1Open" v-if="e.is_open"></div>
                    <div class="rightArrow1Close" v-else></div>
                </div>
            </div>
            
            <innerTreeSelection v-if="e.show_line && e.is_open" :hlWord="hlWord" class="lineChildren" :treeBoxData="e.children" :outData="outData"></innerTreeSelection>
        </div>
    </div>
</template>

<script setup>
import {
    log,
    toLower,
    BusInstance,
} from '../utils/tools.js'


const props = defineProps({
    treeBoxData:  {
        type: [Object],
        default: () => {
            return []
        },
    },
    hlWord: {
        type: String,
        default: '',
    },
    outData: {
        type: [Object],
        default: () => {
            return []
        },
    },
})

const openSon = function(d) {
    d.is_open = !d.is_open
}

const selLine = function(d) {
    if (d.is_sel === 'noSeled') {
        d.is_sel = 'selfSeled'
        BusInstance.emit('selfSeled', d)
    } else if (d.is_sel === 'selfSeled') {
        d.is_sel = 'noSeled'
        // log('子组件 noSeled')
        BusInstance.emit('noSeled', d)
    } else if (d.is_sel === 'sonSeled') {
        d.is_sel = 'selfSeled'
        BusInstance.emit('selfSeled', d)
    } else {
        console.error('### d.is_sel err:', d.is_sel)
    }
    if (d.children && d.children.length > 0) {
        selInner(d.children, d.is_sel)
    }
}

const selInner = function(d, val) {
    d.forEach(e => {
        e.is_sel = val
        if (e.children && e.children.length > 0) {
            selInner(e.children, val)
        }
    })
}
</script>

<style lang="less" scoped>
.treeBoxInnerComponent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 16px;
    .lineBox {
        color: #999;
        width: 99%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .lineSame {
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            .selIconBox {
                .eachSelIcon {
                    cursor: pointer;
                    margin: 6px 10px 6px 10px;
                    height: 18px;
                    width: 18px;
                    background-size: cover;
                }
                .selClassNo {
                    background-image: url("../files/imgs/xTreeSelection/noSeled.png");
                }
                .selClassSelf {
                    background-image: url("../files/imgs/xTreeSelection/seled.png");
                }
                .selClassSon {
                    background-image: url("../files/imgs/xTreeSelection/innerSeled.png");
                }
                .eachSelSonIcon {
                    margin: 6px 10px 6px 0px;
                }
            }
            .rightArrow {
                position: absolute;
                right: 0;
                .rightArrow1Open {
                    cursor: pointer;
                    margin: 7px 10px 7px 4px;
                    height: 9px;
                    width: 15px;
                    background-image: url("../files/imgs/xTreeSelection/L1Open.png");
                    background-size: cover;
                }
                .rightArrow1Close {
                    cursor: pointer;
                    margin: 7px 10px 7px 4px;
                    height: 9px;
                    width: 15px;
                    background-image: url("../files/imgs/xTreeSelection/L1Close.png");
                    background-size: cover;
                }
            }
            .leftArrow {
                width: 30px;
                .leftArrowSonOpen {
                    cursor: pointer;
                    margin: 8px 11px 8px 10px;
                    height: 9px;
                    width: 13px;
                    background-image: url("../files/imgs/xTreeSelection/L2Open.png");
                    background-size: cover;
                }
                .leftArrowSonClose {
                    cursor: pointer;
                    margin: 6px 13px 6px 12px;
                    height: 13px;
                    width: 9px;
                    background-image: url("../files/imgs/xTreeSelection/L2Close.png");
                    background-size: cover;
                }
            }
        }
        .lineChildren {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }
    }
    .wordLine {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        flex-wrap: wrap;
        max-width: 100%;
        .innerWord {
            display: inline-flex;
        }
    }
    .seledHL {
        color: white !important;
    }
    .firstLine {
        background: #2A2A2A;
        color: white;
        margin-bottom: 10px;
    }
    .notFirstLine {
        color: #999;
    }
    .font3 {
        font-size: 14px !important;
    }
    .hlWordClass {
        color: #FFA200 !important;
    }
}
</style>
