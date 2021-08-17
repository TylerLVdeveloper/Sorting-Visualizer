const sortingDisplay = document.getElementById("sorting_display");
let valuesToSort = [
  60, 1, 45, 36, 100, 61, 55, 2, 42, 27, 3, 67, 46, 5, 66, 10, 92,
];
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

valuesToSort.forEach((value, index) => {
  const valueHTML = `<div id="${index}" class="bar">${value}</div>`;
  sortingDisplay.insertAdjacentHTML("beforeend", valueHTML);
  const valueBar = document.getElementById(index);
  valueBar.style.height = `${value}%`;
  valueBar.style.left = `${leftPosition}%`;
  leftPosition += 6;
});

const compareTwoValues = function () {
  console.log("-----------");
  if (valueBar)
    valueBar.style.backgroundColor = valueBarNext.style.backgroundColor =
      "blue";
  if (currentIndex !== valuesToSort.length - 1) {
    valueBar = document.getElementById(currentIndex);
    valueBarNext = document.getElementById(nextIndex);
    valueBarOldId = valueBar.id;
    valueBarNextOldId = valueBarNext.id;
    valueBarNextOldStyle = valueBarNext.style.left;
    valueBarOldStyle = valueBar.style.left;
    oldValue = valuesToSort[currentIndex];
    oldValueNext = valuesToSort[nextIndex];

    valueBar.style.backgroundColor = valueBarNext.style.backgroundColor =
      "white";
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
    }
  }
};

const beginSorting = function () {
  setTimeout(compareTwoValues, 80);
};

document.getElementById("test_button").addEventListener("click", beginSorting);
