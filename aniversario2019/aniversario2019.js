class Zoom {

start() {
  this.imageZoom = this.imageZoom.bind(this);
  this.zoomInClicked = this.zoomInClicked.bind(this);
  this.zoomOutClicked = this.zoomOutClicked.bind(this);
  this.nextClicked = this.nextClicked.bind(this);
  this.zoomEnd = this.zoomEnd.bind(this);

  this._treeImage = document.querySelector("#tree-image");
  this._treeImage.addEventListener("click", this.imageZoom, false);
  this._treeImage.addEventListener("animationend", this.zoomEnd, false);

  this._buttonZoomIn = document.querySelector("#button-in");
  this._buttonZoomIn.addEventListener("click", this.zoomInClicked, false);

  this._buttonZoomOut = document.querySelector("#button-out");
  this._buttonZoomOut.addEventListener("click", this.zoomOutClicked, false);

  this._buttonNext = document.querySelector("#button-next");
  this._buttonNext.addEventListener("click", this.nextClicked, false);

  this._treeImage.addEventListener("click", this.imageZoomIn, false);

  this._dimensions = this.screenDimensions();
  this._shiftX = 0;
  this._shiftY = 0;
  this._scale = 1;
  this._directionIn = true;
  this._storyCounter = 1;

  this._pathPos = 0;
  this._lastScale = 1;
  this._lastTransX = 0;
  this._lastTransY = 0;
}

zoomInClicked() {
  this._buttonZoomIn.style.display = "none";
  this._buttonZoomOut.style.display = "inline";
  this._directionIn = false;
}

zoomOutClicked() {
  this._buttonZoomOut.style.display = "none";
  this._buttonZoomIn.style.display = "inline";
  this._directionIn = true;
}

nextClicked() {
  const next = Zoom.path[this._pathPos];
  const scale = next[0];
  const transX = next[1] * this._dimensions.width / 1299;
  const transY = next[2] * this._dimensions.height / 630;

  this.zoomToAnim(scale, transX, transY);
  this._pathPos++;
}

zoomTo(scale, transX, transY) {
  this._treeImage.style.transform =
    "scale(" + scale +
    ") translate(" + transX + "px," + transY + "px)";

  this._lastScale = scale;
  this._lastTransX = transX;
  this._lastTransY = transY;
}

zoomToAnim(scale, transX, transY) {
  let rule = this.findKeyframesRule("tree-anim");

  rule.appendRule("100% {transform: scale(" + scale +
                    ") translate(" + transX + "px," +
                    transY + "px)}");

  this._treeImage.classList.add("tree-zoom");

  this._lastScale = scale;
  this._lastTransX = transX;
  this._lastTransY = transY;
}

zoomEnd() {
   this._treeImage.style.transform =
      "scale(" + this._lastScale +
      ") translate(" + this._lastTransX + "px," + this._lastTransY + "px)";
   this._treeImage.classList.remove("tree-zoom");
}

imageZoom(event) {
  console.log("x: " + event.clientX + "; y: " + event.clientY);
  const transX = this._lastTransX +
    ((this._dimensions.width / 2) - event.clientX) / this._lastScale;
  const transY = this._lastTransY +
    ((this._dimensions.height / 2) - event.clientY) / this._lastScale;

  const scale = (this._directionIn) ? this._lastScale * 2 : this._lastScale / 2;
  console.log("scale(" + scale +
    ") translate(" + transX + "px," + transY + "px)");
  this.zoomTo(scale, transX, transY);
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

findKeyframesRule(rule) {
  console.log(rule);
  let ss = document.styleSheets;
  for (let i = 0; i < ss.length; i++) {
    console.log(ss[i]);
    for (let j = 0; j < ss[i].cssRules.length; j++) {
      if (ss[i].cssRules[j].type == window.CSSRule.KEYFRAMES_RULE && 
      ss[i].cssRules[j].name == rule) { 
        return ss[i].cssRules[j]; }
    }
  }
  return null;
}

}

(function() {

   Zoom.path = [[4, 515, 76],
                [8, 564, 74],
                [8, 578, 24],
                [8, 503, 24],
                [1, 0, 0],
                [4, 360, -106],
                [8, 360, -106],
                [32, 360, -106],
                [128, 360, -104],
                [128, 360, -107],
                [1, 0, 0],
                [10, 133, -91],
                [20, 133, -91],
                [50, 133, -87],
                [50, 133, -95],
                [1, 0, 0],
                [4, -130, -29],
                [16, -53, -28],
                [16, -201, -40],
                [1, 0, 0],
                [4, -402, 68],
                [16, -402, 68],
                [2, -589, 61],
                [8, -562, -79],
                [32, -560, -113],
                [128, -554, -122],
                [128, -566, -121]];

   Zoom.instance = new Zoom();
})();