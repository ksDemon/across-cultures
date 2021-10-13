myID = document.getElementById('navigation');

window.onwheel = e => {
  if(e.deltaY >= 0){
      myID.className = "hide"
  } else {
    myID.className = "show"
  }
}

// distort scroll
const body = document.body,
scrollWrap = document.getElementsByClassName("smooth-scroll-wrapper")[0],
height = scrollWrap.getBoundingClientRect().height - '100px',
speed = 0.08;

var offset = 0;

body.style.height = Math.floor(height) + "px";

// Distort
//const content = document.querySelectorAll("section");
const blocks = document.querySelectorAll("blockquote");
//const header = document.querySelector("header");
let currentPos = window.pageYOffset;

const callDistort = function () {
  const newPos = window.pageYOffset;
  const diff = newPos - currentPos;
  const speed = diff * 0.1;

  //content.forEach(element => {
  //  element.style.transform = "skewY(" + speed + "deg)";
  //});
  blocks.forEach(element => {
    element.style.transform = "skewY(" + speed + "deg)";
  });
  //header.style.transform = "skewY(" + speed + "deg)";
  currentPos = newPos;
  requestAnimationFrame(callDistort);
};

callDistort();