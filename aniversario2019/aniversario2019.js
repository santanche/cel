class Zoom {

start() {
  this.imageZoom = this.imageZoom.bind(this);
  this.zoomInClicked = this.zoomInClicked.bind(this);
  this.zoomOutClicked = this.zoomOutClicked.bind(this);

  this._treeImage = document.querySelector("#tree-image");
  this._treeImage.addEventListener("click", this.imageZoom, false);

  this._buttonZoomIn = document.querySelector("#button-in");
  this._buttonZoomIn.addEventListener("click", this.zoomInClicked, false);

  this._buttonZoomOut = document.querySelector("#button-out");
  this._buttonZoomOut.addEventListener("click", this.zoomOutClicked, false);

  this._treeImage.addEventListener("click", this.imageZoomIn, false);
  // this._state = 0;
  this._dimensions = this.screenDimensions();
  this._shiftX = 0;
  this._shiftY = 0;
  this._scale = 1;
  this._directionIn = true;
}

zoomInClicked() {
  this._buttonZoomIn.style.display = "none";
  this._buttonZoomOut.style.display = "block";
  this._directionIn = false;
}

zoomOutClicked() {
  this._buttonZoomOut.style.display = "none";
  this._buttonZoomIn.style.display = "block";
  this._directionIn = true;
}

imageZoom(event) {
  this._shiftX = this._shiftX +
    ((this._dimensions.width / 2) - event.clientX) / this._scale;
  this._shiftY = this._shiftY +
    ((this._dimensions.height / 2) - event.clientY) / this._scale;

  this._scale = (this._directionIn) ? this._scale * 2 : this._scale / 2;
  this._treeImage.style.transform =
    "scale(" + this._scale +
    ") translate(" + this._shiftX + "px," + this._shiftY + "px)";

  /*
  if (this._state <= 4) {
    this._shiftX = this._shiftX +
      ((this._dimensions.width / 2) - event.clientX) / this._scale;
    this._shiftY = this._shiftY +
      ((this._dimensions.height / 2) - event.clientY) / this._scale;
    this._scale *= 2;
    this._treeImage.style.transform =
      "scale(" + this._scale +
      ") translate(" + this._shiftX + "px," + this._shiftY + "px)";
  } else {
    this._treeImage.style.transform = "";
    this._shiftX = 0;
    this._shiftY = 0;
    this._scale = 1;
  }
  this._state = (this._state + 1) % 6;
  */
}

screenDimensions() {
  let dimensions = {
     left: (window.screenLeft != undefined) ? window.screenLeft : window.screenX,
     top: (window.screenTop != undefined) ? window.screenTop : window.screenY,
     width: (window.innerWidth)
               ? window.innerWidth
               : (document.documentElement.clientWidth)
                  ? document.documentElement.clientWidth
                  : screen.width,
     height: (window.innerHeight)
                ? window.innerHeight
                : (document.documentElement.clientHeight)
                   ? document.documentElement.clientHeight
                   : screen.height,
     };
  dimensions.zoom = dimensions.width / window.screen.availWidth;
  return dimensions;
}

}

(function() {
   Zoom.instance = new Zoom();
})();