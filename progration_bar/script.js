let progrationPoints = document.querySelector('.progration-grid')
let points = progrationPoints.getElementsByTagName('div')
let progrationLine = document.querySelector('.prohrasing-line')

let point = 0;

function onepointincrease() {

    let divsCount = points.length - 1 

    if (point - 1 < divsCount) {
        let increaseWidth = 100 / divsCount * point // this formula cut the 100 in equal part 
        progrationLine.style.width = increaseWidth + '%'
        points[point].style.backgroundColor = 'yellow'
        points[point].style.boxShadow = '0 0 25px yellow'
        if (point > 0) {
            points[point].innerText = 'step :' + (point)

            if (point == divsCount) points[point].innerText = 'Finish' //it's set the last div text to finish
        }
        point++
    }
}
function onepointdecrease() {
    let divsCount = points.length - 1
    if (point - 1 <= divsCount && point > 0) {
        point--
        let increaseWidth = (100 / divsCount * point) - 100 / divsCount //this formula first divide 100 in equal parts and minus 1 part also
        progrationLine.style.width = increaseWidth + '%'
        points[point].style.backgroundColor = 'gray'
         points[point].style.boxShadow = '0 0 25px #0007'

        if (point > 0) points[point].innerText = ''   //it's set the last div text to none
    }
}

function adddiv() {
    let divsCount = points.length - 1
    if (point === 0 && divsCount < 10) {
        let div = document.createElement('div')
        progrationPoints.appendChild(div)
    }
}

function deletediv() {
    if (point === 0) {
        let divsCount = points.length - 1
        let item = progrationPoints.getElementsByTagName('div')[divsCount]

        if (divsCount >= 2) item.remove()
    }
}