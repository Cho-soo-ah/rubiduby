// let wrap;
// // let cursor;
// let about;
// let code;
// let art;
// let pic;
// let contact;

// let x = 0;
// let y = 0;
// let mx = 0;
// let my = 0;
// let speed = 0.009;

// window.onload = function () {
//   wrap = document.querySelector(".icon_wrap");
//   cursor = document.querySelector(".cursor");
//   about = document.querySelector(".about");
//   code = document.querySelector(".code");
//   art = document.querySelector(".art");
//   pic = document.querySelector(".pic");
//   contact = document.querySelector(".contact");

//   window.addEventListener("mousemove", mouseFunc, false);
//   window.addEventListener("click", mouseClick, false);
//   about.addEventListener("click", mouseOver, false);

//   function mouseFunc(e) {
//     x = e.clientX - window.innerWidth / 2;
//     y = e.clientY - window.innerHeight / 2;
//   }
//   function mouseClick() {}
//   function mouseOver(e) {
//     console.log(e);
//   }
//   loop();
// };

// function loop() {
//   mx += (x - mx) * speed;
//   mx += (x - mx) * speed;

//   // wrap.style.transform =
//   //   "translate3d(" +
//   //   -(mx / 15) +
//   //   "px," +
//   //   -(my / 15) +
//   //   "px,0) rotate3d(0,1,0," +
//   //   -mx / 50 +
//   //   "deg)";
//   cursor.style.transform = "translate(" + x + "px, " + y + "px )";

//   window.requestAnimationFrame(loop);
// }
const cursor = document.querySelector("#cursor");
const cursorCircle = cursor.querySelector(".cursor__circle");
const mouse = { x: -100, y: -100 };
const pos = { x: 0, y: 0 };
const speed = 0.1;

const con = document.querySelectorAll(".con img");

window.onload = function () {
  window.addEventListener("mousemove", updateCoordinates);
};

const updateCoordinates = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  const maxSqueeze = 0.15;
  const accelerator = 1500;
  return Math.min(distance / accelerator, maxSqueeze);
}

const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);

  pos.x += diffX * speed;
  pos.y += diffY * speed;

  const angle = getAngle(diffX, diffY);
  const squeeze = getSqueeze(diffX, diffY);
  const scale = "scale(" + (1 + squeeze) + ", " + (1 - squeeze) + ")";
  const rotate = "rotate(" + angle + "deg)";
  const translate = "translate3d(" + pos.x + "px ," + pos.y + "px, 0)";

  cursor.style.transform = translate;
  cursorCircle.style.transform = rotate + scale;
};

function loop() {
  updateCursor();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

const cursorModifiers = document.querySelectorAll("[cursor-class]");
const [...contant] = document.querySelectorAll(".box_con");
const innerWrap = document.querySelector(".inner_wrap");

cursorModifiers.forEach((curosrModifier) => {
  curosrModifier.addEventListener("mouseenter", function () {
    cursor.classList.add("arrow");
  });

  curosrModifier.addEventListener("mouseleave", function () {
    cursor.classList.remove("arrow");
  });

  curosrModifier.addEventListener("click", function () {
    const className = this.getAttribute("cursor-class");
    const showContant = contant[className - 1];

    cursor.classList.remove(className);

    contant.forEach((i) => {
      i.style.display = "none";
    });
    showContant.style.display = "flex";
    innerWrap.style.display = "flex";
  });
});
