//The slider ids and where they are positioned
var sliderIdAndPos = [];
//The fetched persons with relevant data
const allPersons = [];
//The number of persons fetched
var numberOfPersons = 0;

const generateUsers = () => {
  //call API and create slides and buttons after
  getUsers
    .then(function (data) {
      createArrowBtn('left');
      console.log("something", data.results)
      numberOfPersons = data.results.length;
      data.results.map((person, index) => {
        createSlide(person, index);
        createButton(index);
      })
      createArrowBtn('right');
    })
    .then(function () {

    })
}
const createSlide = (person, index) => {
  let slideContent = document.createTextNode(person.name.first + " " + person.name.last);
  let slideImage = document.createElement("img");
  slideImage.src = person.picture.large;
  if (index === 0) {
    let firstDiv = document.getElementById("slider_0");
    firstDiv.className = 'slide';
    firstDiv.appendChild(slideContent);
    firstDiv.appendChild(slideImage)
  }
  if (index === 1) {
    let secondDiv = document.getElementById("slider_1");
    secondDiv.className = 'slide';
    secondDiv.appendChild(slideContent);
    secondDiv.appendChild(slideImage)
  }
  if (index === 2) {
    let thirdDiv = document.getElementById("slider_2");
    thirdDiv.className = 'slide';
    thirdDiv.appendChild(slideContent);
    thirdDiv.appendChild(slideImage)
  }


  //test
  let testDiv = document.createElement("div");

  let testContent = document.getElementById("test");
  testDiv.append(person.name.first + " " + person.name.last)
  testDiv.className = "test"
  testContent.appendChild(testDiv);

  //create array object of the data
  allPersons.push({
    name: person.name.first + " " + person.name.last,
    img: {
      large: person.picture.large,
      medium: person.picture.medium,
      thumbnail: person.picture.thumbnail
    },
    phone: person.phone,
    email: person.email,
    id: index,
    showing: index < 3 ? true : false
  })
  console.log(allPersons);
  sliderIdAndPos.push({ sliderPos: index, sliderId: index })
}
const createButton = (index) => {
  //Parent container for buttons
  let buttonContainer = document.getElementById('buttonContainer');
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

const createArrowBtn = (dir) => {
  let buttonContainer = document.getElementById('buttonContainer');
  let dirButton = document.createElement("div");
  dirButton.className = 'allButtons';
  let dirButtonContent = '';
  dirButton.onclick = () => goTo(dir);

  dir === 'left' ?
    dirButtonContent = document.createTextNode("-") :
    dirButtonContent = document.createTextNode("+");

  dirButton.appendChild(dirButtonContent);
  buttonContainer.appendChild(dirButton);
}

const addSlideContent = (currentSlide, person) => {
  let slideContent = document.createTextNode(person.name);
  let slideImage = document.createElement("img");
  slideImage.src = person.img.large;
  currentSlide.appendChild(slideImage)
  currentSlide.appendChild(slideContent);
}


const toggleSliders = (sliders) => {
  for (let i = 0; i < 3; i++) {
    let slider = sliders[i].sliderPos;
    let currentSlide = document.getElementById("slider_" + i);
    currentSlide.innerHTML = "";

    let person = getPersonWithId(slider)
    addSlideContent(currentSlide, person);
    // let textContent = document.createTextNode(person.name);
    person.showing = true;
    // currentSlide.appendChild(textContent);

  }
}

const setShowToFalse = () => {
  for (let i = 0; i < allPersons.length; i++) {
    allPersons[i].showing = false;
  }
}

const resetDotClasses = () => {

}
const getPersonWithId = (id) => {
  return allPersons.find((person) => {
    return person.id === id;
  })
}
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
  console.log("sliderIdAndPos:", sliderIdAndPos)
  console.log("allPersons:", allPersons)
  console.log("go to:", dir)
  toggleDots();
}

generateUsers();