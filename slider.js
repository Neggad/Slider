
//The slider ids and where they are positioned
var sliderIdAndPos = [];
//The fetched persons with relevant data
const allPersons = [];
//The number of persons fetched
var numberOfPersons = 0;
//Review text
var reviewTexts = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut tellus elementum sagittis vitae et leo duis ut.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, ut doctus debitis torquatos quo, homero oblique singulis ex pri."]
const generateUsers = () => {
  //call API and create slides and buttons after
  getUsers
    .then(function (data) {
      // createArrowBtn('left');
      console.log("something", data.results)
      numberOfPersons = data.results.length;
      data.results.map((person, index) => {
        createSlide(person, index);
        createDot(index);
      })
      // createArrowBtn('right');
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
    selectedInfo: "email",
    reviewShowing: true,
  };

  if (index < 3) {
    let currentSlide = document.getElementById("slider_" + index);
    currentSlide.className = 'slide';
    addSlideContent(currentSlide, currentPerson);
  }

  //test
  // let testDiv = document.createElement("div");

  // let testContent = document.getElementById("test");
  // testDiv.append(person.name.first + " " + person.name.last)
  // testDiv.className = "test"
  // testContent.appendChild(testDiv);

  //create array object of the data
  allPersons.push(currentPerson);
  sliderIdAndPos.push({ sliderPos: index, sliderId: index })
}
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

// const createArrowBtn = (dir) => {
//   let buttonContainer = document.getElementById('buttonContainer');
//   let dirButton = document.createElement("div");
//   dirButton.className = 'arrowButtons';
//   let dirButtonContent = '';
//   dirButton.onclick = () => goTo(dir);

//   dir === 'left' ?
//     dirButton.classList.add("leftButton") :
//     dirButton.classList.add("rightButton");

//   // dirButton.appendChild(dirButtonContent);
//   buttonContainer.appendChild(dirButton);
// }

const addSlideContent = (currentSlide, person) => {
  //Container for slider name
  let nameContainer = document.createElement("span");
  let slideContent = document.createTextNode(person.name);
  nameContainer.className = 'slideName';
  nameContainer.appendChild(slideContent);
  //Slider image

  let slideImage = document.createElement("img");
  slideImage.src = person.img.large;
  slideImage.className = "slideImg";
  //info toggle button

  let infoButton = document.createElement("div");
  let infoSpan = document.createElement("span");
  addBtnVarialbes({ btn: infoButton, span: infoSpan, icon: "i", value: "info", className: "toggleBtn" })
  // infoSpan.textContent = "i";
  infoButton.appendChild(infoSpan);
  infoButton.onclick = () => toggleInfo(person, currentSlide);
  let contentContainer = document.createElement("div");
  contentContainer.className = "contentContainer";
  //Container of the bottom elements
  let infoContainer = document.createElement("div");
  infoContainer.className = "infoContainer";
  infoContainer.appendChild(nameContainer)
  //If not displaying the "review", show info and buttons about the person
  if (!person.reviewShowing) {
    //Info container, phone number, mail etc
    let personInfoContainer = document.createElement("div");
    personInfoContainer.classList.add("personInfoContainer");
    //buttons to select phone number mail etc
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");


    //Email Button
    let emailButton = document.createElement("div");
    let emailButtonSpan = document.createElement("span");
    addBtnVarialbes({ btn: emailButton, span: emailButtonSpan, icon: "📧", value: "email", className: "infoBtn" })
    emailButton.onclick = () => changeSelectedInfo(person, currentSlide);
    emailButton.appendChild(emailButtonSpan);
    //Phone button
    let phoneButton = document.createElement("div");
    let phoneButtonSpan = document.createElement("slide-button");
    addBtnVarialbes({ btn: phoneButton, span: phoneButtonSpan, icon: "📱", value: "phone", className: "infoBtn" })
    phoneButton.onclick = () => changeSelectedInfo(person, currentSlide);
    phoneButton.appendChild(phoneButtonSpan);
    //City Button
    let cityButton = document.createElement("div");
    let cityButtonSpan = document.createElement("span");
    addBtnVarialbes({ btn: cityButton, span: cityButtonSpan, icon: "🏠", value: "city", className: "infoBtn" })
    cityButton.onclick = () => changeSelectedInfo(person, currentSlide);
    cityButton.appendChild(cityButtonSpan);

    let infoContent = "";

    //add styling to the currently selected button
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
    //add personInfocontainer to bottomcontainer
    personInfoContainer.appendChild(infoContent);
    buttonContainer.appendChild(emailButton);
    buttonContainer.appendChild(phoneButton);
    buttonContainer.appendChild(cityButton);

    infoContainer.appendChild(personInfoContainer);
    infoContainer.appendChild(buttonContainer);
  }
  else {
    //Review
    let reviewContainer = document.createElement("div");
    let reviewSpan = document.createElement("span");
    reviewSpan.textContent = reviewTexts[2];
    reviewContainer.appendChild(reviewSpan);
    infoContainer.appendChild(reviewContainer);
  }
  contentContainer.appendChild(slideImage)

  contentContainer.appendChild(infoContainer)

  // currentSlide.appendChild(slideImage);
  // currentSlide.appendChild(infoButton);
  // currentSlide.appendChild(nameContainer);
  currentSlide.appendChild(infoButton)
  currentSlide.appendChild(contentContainer);

}
const addBtnVarialbes = (variable) => {
  variable.span.textContent = variable.icon;
  variable.span.classList.add("btnText");
  variable.btn.className = variable.className;
  variable.btn.value = variable.value;
}
const changeSelectedInfo = (person, currentSlide) => {
  currentSlide.innerHTML = "";
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

const toggleInfo = (person, currentSlide) => {
  person.reviewShowing = !person.reviewShowing;
  toggleSliders(sliderIdAndPos)
  console.log("person", person, currentSlide)
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
