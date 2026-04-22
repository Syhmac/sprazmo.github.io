let map = L.map('map').setView([53.432780, 14.548085], 16);
L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);

function shuffle(array) {
  let currIdx = array.length;

  while (currIdx !== 0) {
    let randIdx = Math.floor(Math.random() * currIdx);
    currIdx--;

    [array[currIdx], array[randIdx]] = [array[randIdx], array[currIdx]];
  }
}

function validateFields(puzzleFields) {
  let correct = 0
  for (let puzzleField of puzzleFields) {
    let child = puzzleField.childNodes.length > 0 ? puzzleField.childNodes[0] : null;
    if (child != null) {
      if (child.getAttribute("puzzleID") === puzzleField.getAttribute("fieldID")) {
        correct++;
      }
    }
  }
  if (correct === 16) {
    winNotification()
  }
}

function winNotification() {
  console.log("a")
  if (!("Notification" in window)) {
    console.log("not")
    console.error("Notifications are not supported by this browser");
    return
  }
  if (Notification.permission === "granted") {
    console.log("b")
    const notification = new Notification("Wygrałeś!")
    return
  }
  if (Notification.permission === "default") {
    console.log("c")
    Notification.requestPermission().then((permission) => {
      console.log("d")
      if (Notification.permission === "granted") {
        console.log("e")
        const notification = new Notification("Wygrałeś!")
      }
    })
  }
}

document.getElementById("export").addEventListener("click", () => {
  leafletImage(map, (err, canvas) => {
    let rastMap = document.getElementById("puzzleBox");
    let rastCtx = rastMap.getContext("2d")

    const puzzleHeight = rastMap.height / 4;
    const puzzleWidth = rastMap.width / 4;
    let puzzles = [];
    let puzzlesBox = document.getElementById("puzzles");

    rastCtx.drawImage(canvas, 0, 0, rastMap.width, rastMap.height);

    let puzzleIdx = 1

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        // Create puzzle element
        let puzzle = document.createElement("canvas");
        puzzle.classList.add("puzzle");
        puzzle.width = puzzleWidth;
        puzzle.height = puzzleHeight;
        puzzle.setAttribute("puzzleID", puzzleIdx++);
        puzzle.draggable = true;
        // Add puzzle to array
        puzzles.push(puzzle);
        // Draw puzzle piece
        let ctx = puzzle.getContext("2d");
        ctx.drawImage(rastMap, j * puzzleWidth, i * puzzleHeight, puzzleWidth, puzzleHeight, 0, 0, puzzleWidth, puzzleHeight);
        // Add drag-and-drop functionality
        puzzle.addEventListener("dragstart", (e) => {
          puzzle.style.border = "1px dotted red";
          e.dataTransfer.setData("text/plain", puzzle.getAttribute("puzzleID"));
        })

        puzzle.addEventListener("dragend", (_e) => {
          puzzle.style.border = "none";
        })
      }
    }

    // Clear content of puzzlesBox
    let maxI = puzzlesBox.children.length // Need to take the length once
    for (let i = 0; i < maxI; i++) {
      let child = puzzlesBox.children[0]
      child.remove()
    }

    shuffle(puzzles);

    for (let puzzle of puzzles) {
      puzzlesBox.appendChild(puzzle);
    }

    let puzzleFields = document.querySelectorAll(".puzzleField");

    for (let puzzleField of puzzleFields) {
      puzzleField.style.display = "block"
      if (puzzleField.children.length > 0) {
        let child = puzzleField.children[0]
        child.remove()
      }
    }
  })
})

document.getElementById("myLocation").addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    map.setView([lat, lng], 16);
  }, (err) => {
    console.error(err);
  }, {
    enableHighAccuracy: true,
  })
})

// Drag-and-drop functionality for puzzle box
let puzzlesBox = document.getElementById("puzzles");
puzzlesBox.addEventListener("dragover", (e) => {
  e.preventDefault();
})

puzzlesBox.addEventListener("drop", (e) => {
  let puzzleID = e.dataTransfer.getData("text/plain");
  let puzzle = document.querySelector(`.puzzle[puzzleID="${puzzleID}"]`);
  puzzlesBox.appendChild(puzzle);
})

let puzzleFields = document.querySelectorAll(".puzzleField");
let fieldID = 1

for (let puzzleField of puzzleFields) {
  puzzleField.setAttribute("fieldID", fieldID++);

  puzzleField.addEventListener("dragenter", (_e) => {
    puzzleField.style.backgroundColor = "#a06fe1";
  })

  puzzleField.addEventListener("dragleave", (_e) => {
    puzzleField.style.backgroundColor = "transparent";
  })

  puzzleField.addEventListener("dragover", (e) => {
    e.preventDefault();
  })

  puzzleField.addEventListener("drop", (e) => {
    let puzzleID = e.dataTransfer.getData("text/plain");
    let puzzle = document.querySelector(`.puzzle[puzzleID="${puzzleID}"]`);
    if (puzzleField.children.length < 1) {
      puzzleField.appendChild(puzzle);
    }
    puzzleField.style.backgroundColor = "transparent";
    validateFields(puzzleFields);
  })
}
