const sortingDisplay = document.getElementById("sorting_display");
// Buttons
const sortBtn = document.getElementById("sort_button");
const pauseBtn = document.getElementById("pause_button");
const shuffleBtn = document.getElementById("shuffle_button");
const sizeOptions = document.getElementById("size_options");
const speedOptions = document.getElementById("speed_options");

let valuesToSort = [];
let valuesArrSize = 20;
let sortSpeed = 10;
let leftPosition = 0;
let currentIndex = 0;
let nextIndex = 1;
let barGap = 0.8;
let valueBar,
  valueBarNext,
  valueBarNextOldStyle,
  valueBarOldStyle,
  oldValue,
  oldValueNext;
let sortingOccurred = false;

const generateNewValues = function () {
  // Clear array
  valuesToSort = [];
  // Clear bars
  sortingDisplay.innerHTML = "";
  // Generate random array
  for (let i = 0; i <= valuesArrSize; i++) {
    valuesToSort.push(Math.ceil(Math.random() * 99));
  }
  leftPosition = 0;
  // Elements are created from array - later to be cleared and re-ran when array changes
  valuesToSort.forEach((value, index) => {
    const valueHTML = `<div id="${index}" class="bar"></div>`;
    sortingDisplay.insertAdjacentHTML("beforeend", valueHTML);
    const valueBar = document.getElementById(index);
    valueBar.style.height = `${value}%`;
    valueBar.style.left = `${leftPosition}%`;
    valueBar.style.width = `${100 / valuesArrSize - barGap}%`;
    leftPosition += 100 / valuesToSort.length;
  });
  // Reset for value comparison
  currentIndex = 0;
  nextIndex = 1;
  setSpeed();
};

const setSize = function () {
  if (sizeOptions.value >= 50) barGap = 0.8;
  if (sizeOptions.value < 50) barGap = 1;
  if (sizeOptions.value < 20) barGap = 2;
  if (sizeOptions.value < 10) barGap = 5;

  valuesArrSize = sizeOptions.value;
  generateNewValues();
  setSpeed();
};

const setSpeed = function () {
  const barClass = document.querySelectorAll(".bar");

  if (speedOptions.value === "slow") {
    sortSpeed = 200;
    barClass.forEach((bar) => (bar.style.transition = "all .5s"));
  }
  if (speedOptions.value === "medium") {
    sortSpeed = 110;
    barClass.forEach((bar) => (bar.style.transition = "all 0.25s"));
  }
  if (speedOptions.value === "fast") {
    sortSpeed = 1;
    barClass.forEach((bar) => (bar.style.transition = "all 0.1s"));
  }
};

const compareTwoValues = function () {
  console.log("-----------");
  if (valueBar) valueBar.style.opacity = valueBarNext.style.opacity = "0.8";
  if (currentIndex !== valuesToSort.length - 1) {
    valueBar = document.getElementById(currentIndex);
    valueBarNext = document.getElementById(nextIndex);
    valueBarOldId = valueBar.id;
    valueBarNextOldId = valueBarNext.id;
    valueBarNextOldStyle = valueBarNext.style.left;
    valueBarOldStyle = valueBar.style.left;
    oldValue = valuesToSort[currentIndex];
    oldValueNext = valuesToSort[nextIndex];

    valueBar.style.opacity = valueBarNext.style.opacity = "0.5";
    if (oldValue > oldValueNext) {
      sortingOccurred = true;

      // Swap location in the DOM (Distance from the left)
      valueBar.style.left = valueBarNextOldStyle;
      valueBarNext.style.left = valueBarOldStyle;

      // Swap locations in the array
      valuesToSort[currentIndex] = oldValueNext;
      valuesToSort[nextIndex] = oldValue;

      // Swap IDs in the DOM to match array index
      valueBar.id = valueBarNextOldId;
      valueBarNext.id = valueBarOldId;
    }
    currentIndex++;
    nextIndex++;
    beginSorting();
  } else {
    currentIndex = 0;
    nextIndex = 1;
    if (sortingOccurred) {
      sortingOccurred = false;
      beginSorting();
    } else {
      console.log("SORTED!");
      sortBtn.addEventListener("click", beginSorting);
    }
  }
};
let sortTimeout;
const beginSorting = function () {
  sortBtn.removeEventListener("click", beginSorting);
  sortTimeout = setTimeout(compareTwoValues, sortSpeed);
};

const pauseSorting = function () {
  clearTimeout(sortTimeout);
  sortBtn.addEventListener("click", beginSorting);
};

generateNewValues();
sortBtn.addEventListener("click", beginSorting);
pauseBtn.addEventListener("click", pauseSorting);
shuffleBtn.addEventListener("click", generateNewValues);
sizeOptions.addEventListener("change", setSize);
speedOptions.addEventListener("change", setSpeed);
