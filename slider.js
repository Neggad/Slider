
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
  let currentPerson = {
    name: person.name.first + " " + person.name.last,
    img: {
      large: person.picture.large,
      medium: person.picture.medium,
      thumbnail: person.picture.thumbnail
    },
    location: { city: person.location.city, state: person.location.state },
    phone: person.phone,
    email: person.email,
    id: index,
    showing: index < 3 ? true : false,
    selectedInfo: "email"
  };

  if (index < 3) {
    let currentSlide = document.getElementById("slider_" + index);
    currentSlide.className = 'slide';
    addSlideContent(currentSlide, currentPerson);
  }

  //test
  let testDiv = document.createElement("div");

  let testContent = document.getElementById("test");
  testDiv.append(person.name.first + " " + person.name.last)
  testDiv.className = "test"
  testContent.appendChild(testDiv);

  //create array object of the data
  allPersons.push(currentPerson);

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
  dirButton.className = 'arrowButtons';
  let dirButtonContent = '';
  dirButton.onclick = () => goTo(dir);

  dir === 'left' ?
    dirButtonContent = document.createTextNode("-") :
    dirButtonContent = document.createTextNode("+");

  dirButton.appendChild(dirButtonContent);
  buttonContainer.appendChild(dirButton);
}

const addSlideContent = (currentSlide, person) => {
  //Container for slider name
  let slideNameContainer = document.createElement("h3");
  let slideContent = document.createTextNode(person.name);
  slideNameContainer.className = 'slideName';
  slideNameContainer.appendChild(slideContent);
  //Slider image
  let slideImage = document.createElement("img");
  slideImage.src = person.img.large;
  slideImage.className = "slideImg";
  //Info container, phone number, mail etc
  let slideInfoContainer = document.createElement("div");
  slideInfoContainer.className = "slideInfoContainer";
  let infoContent = "";

  //buttons to select phone number mail etc
  let slideButtonContainer = document.createElement("div");
  slideButtonContainer.className = "slideButtonContainer";
  //Email Button
  let emailButton = document.createElement("div");
  let emailButtonContent = document.createTextNode("@");

  emailButton.className = "infoBtn";
  emailButton.value = "email";
  emailButton.appendChild(emailButtonContent);
  emailButton.onclick = () => changeSelectedInfo(person, currentSlide);
  //Phone button
  let phoneButton = document.createElement("div");
  let phoneButtonContent = document.createTextNode("123");
  phoneButton.className = "infoBtn";
  phoneButton.value = "phone";
  phoneButton.appendChild(phoneButtonContent);
  phoneButton.onclick = () => changeSelectedInfo(person, currentSlide);
  //City Button
  let cityButton = document.createElement("div");
  let cityButtonContent = document.createTextNode("Adr.");
  cityButton.className = "infoBtn";
  cityButton.value = "city";
  cityButton.appendChild(cityButtonContent);
  cityButton.onclick = () => changeSelectedInfo(person, currentSlide);



  switch (person.selectedInfo) {
    case "email": {
      infoContent = document.createTextNode(person.email);
      emailButton.classList.add("selectedBtn");
      break;
    }
    case "phone": {
      infoContent = document.createTextNode(person.phone);
      phoneButton.classList.add("selectedBtn");
      break;
    }
    case "city": {
      infoContent = document.createTextNode(person.location.city + " " + person.location.state);
      cityButton.classList.add("selectedBtn");
      break;
    }
    default:
      infoContent = document.createTextNode(person.email);
      emailButton.classList.add("selectedBtn");
      break;
  }

  // let phoneContent = document.createTextNode(person.phone);
  // let cityContent = document.createTextNode(person.location.city);
  // let stateContent = document.createTextNode(person.location.state);

  slideInfoContainer.appendChild(infoContent);


  slideButtonContainer.appendChild(emailButton);
  slideButtonContainer.appendChild(phoneButton);
  slideButtonContainer.appendChild(cityButton);

  currentSlide.appendChild(slideImage)
  currentSlide.appendChild(slideNameContainer);
  currentSlide.appendChild(slideInfoContainer);
  currentSlide.appendChild(slideButtonContainer);
}

const changeSelectedInfo = (person, currentSlide) => {
  console.log("change selected of ", person)
  console.log("clicked:", event.current)
  // let currentSlide = document.getElementById("slider_" + person.id);
  currentSlide.innerHTML = "";

  console.log("clicked:", event.target.value, "person:", person)
  switch (event.target.value) {
    case "email": {
      if (person.selectedInfo !== "email")
        person.selectedInfo = "email";
      break;
    }
    case "phone": {
      if (person.selectedInfo !== "phone") {
        person.selectedInfo = "phone";
      }
      break;
    }
    case "city": {
      if (person.selectedInfo !== "city")
        person.selectedInfo = "city";
      break;
    }
    default:
      person.selectedInfo = person.selectedInfo;
      break;
  }
  addSlideContent(currentSlide, person)
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