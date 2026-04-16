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

document.getElementById("export").addEventListener("click", () => {
  leafletImage(map, (err, canvas) => {
    let rastMap = document.getElementById("puzzleBox");
    let rastCtx = rastMap.getContext("2d")

    const puzzleHeight = rastMap.height / 4;
    const puzzleWidth = rastMap.width / 4;
    const puzzleImage = canvas.toDataURL("image/png");
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
          puzzle.style.border = "2px dotted red";
          e.dataTransfer.setData("text/plain", puzzle.getAttribute("puzzleID"));
        })

        puzzle.addEventListener("dragend", (e) => {
          puzzle.style.border = "none";
        })
      }
    }

    shuffle(puzzles);

    for (let puzzle of puzzles) {
      puzzlesBox.appendChild(puzzle);
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
puzzlesBox.addEventListener("dragenter", (e) => {
  puzzlesBox.style.border = "2px dotted green";
})

puzzlesBox.addEventListener("dragleave", (e) => {
  puzzlesBox.style.border = "none";
})

puzzlesBox.addEventListener("dragover", (e) => {
  e.preventDefault();
})

puzzlesBox.addEventListener("drop", (e) => {
  let puzzleID = e.dataTransfer.getData("text/plain");
  let puzzle = document.querySelector(`.puzzle[puzzleID="${puzzleID}"]`);
  puzzlesBox.appendChild(puzzle);
  puzzlesBox.style.border = "none";
})
