function layout_test() {
  let parent = document.getElementById("forecastWeather")
  let child = parent.querySelector(".forecastItem")
  for (let i = 0; i < 10; i++) {
    let child_copy = child.cloneNode(true)
    parent.appendChild(child_copy)
  }
}

// layout_test()
