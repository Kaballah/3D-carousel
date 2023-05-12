var radius = 240;
var autoRotate = true;
var rotateSpeed = -60;
var imgWidth = 120;
var imgHeight = 170;
var bgMusicURL = "./img/Ariana Grande _ Justin Bieber - Stuck with U (8D AUDIO)(MP3_320K).mp3"
var bgMusicControls = true;

setTimeout(init, 1000);

var oDrag = document.getElementById("drag-container");
var oSpin = document.getElementById("spin-container");
var aImage = oSpin.getElementsByTagName("img");
var aVideo = oSpin.getElementsByTagName("video");
var aElement = [...aImage, ...aVideo];

oSpin.style.width = imgWidth + "px";
oSpin.style.height = imgHeight + "px";

var ground = document.getElementById("ground");

ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
    for (var i = 0; i < aElement.length; i++) {
        aElement[i].style.transform = "rotateY(" +(i * (360 / aElement.length)) + "deg) translateZ(" + radius + "px)";
        aElement[i].style.transition = "transform 1s";
        aElement[i].style.transitionDelay = delayTime || (aElement.length - i) / 4 + "s";
    }
}

function applyTranform(obj) {
    if(tY > 180) {
        tY = 180;
    }
    if(tY < 0) {
        tY = 0
    }

    obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
    oSpin.style.animationPlayState = (yes ? "running" : "paused");
}

var sX, sY, nX, nY, desX = 0, 
    desY = 0, 
    tX = 0, 
    tY = 10;

if(autoRotate) {
    var animationName = (rotateSpeed > 0 ? "spin" : "spinRevert");
    oSpin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

if(bgMusicURL) {
    document.getElementById("music-container").innerHTML += `<audio src="${bgMusicURL}" ${bgMusicControls ? "controls" : ""} autoplay loop>
    <p>If you are reading this, it is because your browser does not support the audio element.</p>
    </audio>`;
    var autoPlay = document.getElementById("music-container").autoplay = true;
    autoPlay.autoplay = true;
}

// window.addEventListener("DOMContentLoaded", event => {
//     const audio = document.querySelector("iframe");
//     audio.volume = 0.2;
//     audio.play();
// });

// var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  
// if (!isChrome){
//     $('#iframeAudio').remove()
// }
//   else {
//     $('#playAudio').remove() // just to make sure that it will not have 2x audio in the background 
// }


document.onpointerdown = function(e) {
    clearInterval(oDrag.timer);
    e = e || window.event;
    var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(oDrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    oDrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(oDrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(oDrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

document.onmousewheel = function(e) {
    e = e || window.event;
    var d = e.wheelDelta / 20 || -e.detail;
    radius += d;
    init(1);
};
