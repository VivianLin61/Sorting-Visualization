LENGTH = 100 //length of array.
const MAX_VALUE = 100 //Max value in array.
const UNIT = 500 / MAX_VALUE
SPEED = 100 //initial sorting speed.
sorted = false
ARR = generateRandomArray(LENGTH, MAX_VALUE)
algorithm = '' //current typee of sort;
let animationIdx
let interval
let animations
let elementBars
displayArray(ARR)

function generateNewArray() {
  LENGTH = parseInt(document.getElementById('lenRange').value)
  ARR = generateRandomArray(LENGTH, MAX_VALUE)
  clearArr()
  displayArray(ARR)
  sorted = false
}

function sort(elm, type) {
  if (sorted == false) {
    disableButtons()
    elm.style.color = 'var(--secoundary-color)'
    switch (type) {
      case 'merge':
        mergeSort(ARR)
        algorithm = 'merge'
        break
      case 'bubble':
        bubbleSort(ARR)
        algorithm = 'bubble'
        break
      case 'selection':
        selectionSort(ARR)
        algorithm = 'selection'
        break
      case 'insertion':
        insertionSort(ARR)
        algorithm = 'insertion'
        break
      case 'quick':
        quickSort(ARR)
        algorithm = 'quick'
        break
    }
  }
}

function mergeInterval(speed) {
  interval = setInterval(function () {
    if (animationIdx < animations.length) {
      const colorChange = animationIdx % 3 != 2
      if (colorChange) {
        const [idx1, idx2] = animations[animationIdx]
        const color = animationIdx % 3 === 0 ? 'green' : 'black'
        if (elementBars[idx1] && elementBars[idx2]) {
          elementBars[idx1].style.backgroundColor = color
          elementBars[idx2].style.backgroundColor = color
        }
      } else {
        const [barOneIdx, newHeight] = animations[animationIdx]
        elementBars[barOneIdx].style.height = `${newHeight}px`
      }

      animationIdx++
    } else {
      enableButtons()
      sorted = true
      clearInterval(interval)
    }
  }, SPEED)
}

function insertionInterval() {
  interval = setInterval(function () {
    if (animationIdx < animations.length) {
      //inserts the element at keyPos before the element at insertPos.
      const [keyPos, insertPos] = animations[animationIdx]
      var parent = elementBars[keyPos].parentNode
      var elm = elementBars[keyPos]
      var insert = elementBars[insertPos]
      const colorChange = animationIdx % 3 != 2
      if (colorChange) {
        const color = animationIdx % 3 === 0 ? 'green' : 'black'
        if (elm && insert) {
          elm.style.backgroundColor = color
          insert.style.backgroundColor = color
        }
      } else {
        parent.insertBefore(elm, insert)
      }
      animationIdx++
    } else {
      enableButtons()
      sorted = true
      clearInterval(interval)
    }
  }, SPEED)
}

//loops through the animations and shows the swapping.
function swappingAnimationsInterval() {
  interval = setInterval(function () {
    if (animationIdx < animations.length) {
      const [pos1, pos2] = animations[animationIdx]
      var node1 = elementBars[pos1]
      var node2 = elementBars[pos2]
      const colorChange = animationIdx % 3 != 2
      if (colorChange) {
        const color = animationIdx % 3 === 0 ? 'green' : 'black'
        if (node1 && node2) {
          node1.style.backgroundColor = color
          node2.style.backgroundColor = color
        }
      } else {
        swapNodes(node1, node2)
      }
      animationIdx++
    } else {
      enableButtons()
      sorted = true
      clearInterval(interval)
    }
  }, SPEED)
}

function mergeSort(arr) {
  animationIdx = 0
  animations = doMergeSort(arr)
  elementBars = document.body
    .getElementsByClassName('box')[0]
    .getElementsByClassName('array')[0]
    .getElementsByClassName('elm')

  mergeInterval()
}

function insertionSort(arr) {
  animationIdx = 0
  elementBars = document.body
    .getElementsByClassName('box')[0]
    .getElementsByClassName('array')[0]
    .getElementsByClassName('elm')
  animations = doInsertionSort(arr)
  insertionInterval()
}

function quickSort(arr) {
  clearArr()
  displayArray(ARR)
  animationIdx = 0
  elementBars = document.body
    .getElementsByClassName('box')[0]
    .getElementsByClassName('array')[0]
    .getElementsByClassName('elm')
  animations = []
  quick(arr, 0, arr.length - 1)

  swappingAnimationsInterval()
}

function bubbleSort(arr) {
  animationIdx = 0
  animations = doBubbleSort(arr)
  elementBars = document.body
    .getElementsByClassName('box')[0]
    .getElementsByClassName('array')[0]
    .getElementsByClassName('elm')

  swappingAnimationsInterval()
}

function selectionSort(arr) {
  animations = doSelectionSort(arr)
  elementBars = document.body
    .getElementsByClassName('box')[0]
    .getElementsByClassName('array')[0]
    .getElementsByClassName('elm')
  animationIdx = 0

  swappingAnimationsInterval()
}

function disableButtons() {
  var buttons = document.getElementsByClassName('tablinks')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true
    buttons[i].style.opacity = '0.5'
    buttons[i].classList.add('noHover')
    buttons[i].onmouseover = function () {
      buttons[i].style.color = 'white'
    }
    buttons[i].onmouseout = function () {
      buttons[i].style.color = 'var(--text-color)'
    }
  }
}

function enableButtons() {
  var buttons = document.getElementsByClassName('tablinks')
  console.log(buttons)
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.color = 'var(--text-color)'
    buttons[i].classList.remove('noHover')
    buttons[i].disabled = false
    buttons[i].style.opacity = '1'
  }
}

function clearArr() {
  const myNode = document
    .getElementsByClassName('box')[0]
    .getElementsByClassName('array')[0]
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild)
  }
}

function displayArray(arr) {
  width = 1100 / LENGTH //width of each bar
  for (i = 0; i < LENGTH; i++) {
    var elm = document.createElement('div')
    elm.className = 'elm'
    percentage = (((500 / MAX_VALUE) * arr[i]) / 500) * 100
    elm.style.background =
      'linear-gradient(to bottom, var(--top-gradient), var(--bottom-gradient))'
    elm.style.width = '' + width + 'px'
    elm.style.height = '' + (500 / MAX_VALUE) * arr[i] + 'px'
    document.body.getElementsByClassName('array')[0].appendChild(elm)
  }
}

function updateSpeed() {
  //resets the speed of the sort.
  if (interval) {
    clearInterval(interval)

    switch (algorithm) {
      case 'merge':
        mergeInterval()
        break
      case 'bubble':
        swappingAnimationsInterval()
        break
      case 'selection':
        swappingAnimationsInterval()
        break
      case 'insertion':
        insertionInterval()
        break
      case 'quick':
        swappingAnimationsInterval()
        break
    }
  }
}

var slide = document.getElementById('speedRange')

slide.onchange = function () {
  SPEED = 205 - parseInt(slide.value)
  updateSpeed()
}
