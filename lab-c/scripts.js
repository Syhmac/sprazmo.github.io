let map = L.map('map').setView([53.432780, 14.548085], 16);
L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);

document.getElementById("export").addEventListener("click", () => {
  leafletImage(map, (err, canvas) => {
    let rastMap = document.getElementById("puzzleBox");
    let rastCtx = rastMap.getContext("2d")

    rastCtx.drawImage(canvas, 0, 0, rastMap.width, rastMap.height);
  })
})
