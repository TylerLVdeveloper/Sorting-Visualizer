const sortingDisplay = document.getElementById("sorting_display");
let valuesToSort = [];
let valuesArrSize = 20;
let sortSpeed = 100;
let leftPosition = 0;
let currentIndex = 0;
let nextIndex = 1;
let valueBar,
  valueBarNext,
  valueBarNextOldStyle,
  valueBarOldStyle,
  oldValue,
  oldValueNext;
let sortingOccurred = false;

// Generate random array
for (let i = 0; i <= valuesArrSize; i++) {
  valuesToSort.push(Math.ceil(Math.random() * 99));
}

// Elements are created from array - later to be cleared and re-ran when array changes
valuesToSort.forEach((value, index) => {
  const valueHTML = `<div id="${index}" class="bar">${value}</div>`;
  sortingDisplay.insertAdjacentHTML("beforeend", valueHTML);
  const valueBar = document.getElementById(index);
  valueBar.style.height = `${value}%`;
  valueBar.style.left = `${leftPosition}%`;
  valueBar.style.width = `${100 / valuesArrSize - 0.8}%`;
  leftPosition += 100 / valuesToSort.length;
});

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
      document
        .getElementById("sort_button")
        .addEventListener("click", beginSorting);
    }
  }
};
let sortTimeout;
const beginSorting = function () {
  document
    .getElementById("sort_button")
    .removeEventListener("click", beginSorting);
  sortTimeout = setTimeout(compareTwoValues, sortSpeed);
};

const pauseSorting = function () {
  clearTimeout(sortTimeout);
  document
    .getElementById("sort_button")
    .addEventListener("click", beginSorting);
};

document.getElementById("sort_button").addEventListener("click", beginSorting);
document.getElementById("pause_button").addEventListener("click", pauseSorting);
