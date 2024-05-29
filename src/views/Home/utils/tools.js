import mitt from 'mitt'
const BusInstance = mitt()


const log = console.log.bind(console)


const toLower = function (d) {
    const enWordUpper = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ]
    let res = []
    let arr = d.split('')
    arr.forEach(e => {
        if (enWordUpper.includes(e)) {
            e = e.toLowerCase()
        }
        res.push(e)
    })
    return res.join('')
}


export {
    log,
    BusInstance,
    toLower,
}
