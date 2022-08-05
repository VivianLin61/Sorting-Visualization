class Slider {
  constructor(rangeElement, options) {
    this.rangeElement = rangeElement
    this.options = options

    // Attach a listener to "change" event
    this.rangeElement.addEventListener('input', this.updateSlider.bind(this))
  }

  // Initialize the slider
  init() {
    this.rangeElement.setAttribute('min', options.min)
    this.rangeElement.setAttribute('max', options.max)
    this.rangeElement.value = options.cur

    this.updateSlider()
  }

  generateBackground(rangeElement) {
    if (this.rangeElement.value === this.options.min) {
      return
    }

    let percentage =
      ((this.rangeElement.value - this.options.min) /
        (this.options.max - this.options.min)) *
      100
    return (
      'background: linear-gradient(to right, #50299c, #7a00ff ' +
      percentage +
      '%, #B7B9F4 ' +
      percentage +
      '%, #D7D8EE 100%)'
    )
  }

  updateSlider(newValue) {
    this.rangeElement.style = this.generateBackground(this.rangeElement.value)
  }
}

let rangeElement = document.querySelectorAll('.range [type="range"]')

let options = {
  min: 5,
  max: 200,
  cur: 100,
}

if (rangeElement) {
  let speedSlider = new Slider(rangeElement[0], options)
  let lengthSlider = new Slider(rangeElement[1], options)
  speedSlider.init()
  lengthSlider.init()
}
