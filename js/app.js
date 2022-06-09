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

const stars = document.querySelectorAll(".pumping");
stars.forEach((obj) => {
  obj.addEventListener("mouseenter", () => {
    cursor.classList.add("arrow");
  });
  obj.addEventListener("mouseleave", () => {
    cursor.classList.remove("arrow");
  });
});

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

// bee
const beeIcon = document.querySelector(".bee_icon");
const bee = document.querySelector(".bee");

beeIcon.addEventListener("click", () => {
  bee.classList.toggle("active");
});
