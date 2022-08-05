function generateRandomArray(length, max) {
  return Array(length)
    .fill()
    .map(() => Math.round(Math.random() * max))
}
//From https://stackoverflow.com/questions/9732624/how-to-swap-dom-child-nodes-in-javascript
function swapNodes(node1, node2) {
  const parent = node2.parentNode
  const afterNode2 = node2.nextElementSibling
  node1.replaceWith(node2)
  parent.insertBefore(node1, afterNode2)
}
function swap(arr, idx1, idx2) {
  var temp = arr[idx1]
  arr[idx1] = arr[idx2]
  arr[idx2] = temp
}
