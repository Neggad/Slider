//create dots to show which persons that are being displayed
const createDot = (index) => {
  //Parent container for buttons
  let buttonContainer = document.getElementById('dotContainer');
  //create button for div
  let newButton = document.createElement("div");
  newButton.classList.add('allDotButtons');
  if (index < 3) {
    newButton.classList.add('isActive');
  } else {
    newButton.classList.add('isInactive');
  }
  newButton.id = "dot_" + index;
  buttonContainer.appendChild(newButton);
}

//When a user clicks right or left arrow
const goTo = (dir) => {
  if (dir === 'left') {
    for (let i = 0; i < sliderIdAndPos.length; i++) {
      if (sliderIdAndPos[i].sliderPos === 0) {
        sliderIdAndPos[i].sliderPos = numberOfPersons - 1;
      }
      else {
        sliderIdAndPos[i].sliderPos = sliderIdAndPos[i].sliderPos - 1;
      }
    }
  }
  else {
    for (let i = 0; i < sliderIdAndPos.length; i++) {
      if (sliderIdAndPos[i].sliderPos === numberOfPersons - 1) {
        sliderIdAndPos[i].sliderPos = 0;
      }
      else {
        sliderIdAndPos[i].sliderPos = sliderIdAndPos[i].sliderPos + 1;
      }
    }
  }

  setShowToFalse();
  toggleSliders(sliderIdAndPos);
  toggleDots();
}

//Update dots to show which persons are being displayed
const toggleDots = () => {
  let activePersons = allPersons.filter((person) => {
    return person.showing
  })
  let inactivePersons = allPersons.filter((person) => {
    return !person.showing
  })

  for (let i = 0; i < activePersons.length; i++) {
    let currentDot = document.getElementById("dot_" + activePersons[i].id);
    if (!currentDot.classList.contains("isActive")) {
      currentDot.classList.add("isActive")
      currentDot.classList.remove("isInactive")
    }
  }
  for (let i = 0; i < inactivePersons.length; i++) {
    let currentDot = document.getElementById("dot_" + inactivePersons[i].id);
    if (currentDot.classList.contains("isActive")) {
      currentDot.classList.add("isInactive")
      currentDot.classList.remove("isActive")
    }
  }
}
