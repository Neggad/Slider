
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
      console.log("something", data.results)
      numberOfPersons = data.results.length;
      data.results.map((person, index) => {
        createSlide(person, index);
        createDot(index);
      })
    })
}

//Create a slide, and the person data of each slide
const createSlide = (person, index) => {
  let currentPerson = {
    name: {first: person.name.first,last: person.name.last},
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
  //create array object of the data
  allPersons.push(currentPerson);
  sliderIdAndPos.push({ sliderPos: index, sliderId: index })
}

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

//dynamically add stuff to the slides
const addSlideContent = (currentSlide, person) => {
  //Container for slider name
  let firstName = person.name.first.charAt(0).toUpperCase() + person.name.first.slice(1);
  let lastName = person.name.last.charAt(0).toUpperCase() + person.name.last.slice(1);
  let nameContainer = document.createElement("span");
  nameContainer.textContent = firstName + " " + lastName;
  nameContainer.className = 'slideName';
  //Slider image

  let imageDiv = document.createElement("div");
  imageDiv.className = "imgDiv";
  let slideImage = document.createElement("img");
  slideImage.src = person.img.large;
  imageDiv.appendChild(slideImage);
  //info toggle button

  let toggleButton = document.createElement("div");
  let infoSpan = document.createElement("span");
  addBtnVarialbes({ btn: toggleButton, span: infoSpan, icon: "i", value: "info", className: "toggleBtn" })
  toggleButton.appendChild(infoSpan);
  toggleButton.onclick = () => toggleInfo(person, currentSlide);
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

    //Add selected indication
    toggleButton.classList.add("selectedBtn");

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
        infoContent = document.createTextNode(person.location.city.charAt(0).toUpperCase() + person.location.city.slice(1));
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
    infoContainer.appendChild(buttonContainer);
    infoContainer.appendChild(personInfoContainer);
   
  }
  else {
    //Review
    let reviewContainer = document.createElement("div");
    let reviewSpan = document.createElement("span");
    //remove selected indication on toggle button
    toggleButton.classList.remove("selectedBtn");
    reviewContainer.classList.add("reviewContainer")
    reviewSpan.textContent = reviewTexts[2];
    reviewContainer.appendChild(reviewSpan);
    infoContainer.appendChild(reviewContainer);
  }
  imageDiv.appendChild(toggleButton)
  contentContainer.appendChild(imageDiv)

  contentContainer.appendChild(infoContainer)
  currentSlide.appendChild(contentContainer);
}
//Add icon, class, value to buttons
const addBtnVarialbes = (variable) => {
  variable.span.textContent = variable.icon;
  variable.span.classList.add("btnText");
  variable.btn.className = variable.className;
  variable.btn.value = variable.value;
}

//update "state" object with what was selected and update the slide  
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
//show the slides that are requested
const toggleSliders = (sliders) => {
  for (let i = 0; i < 3; i++) {
    let slider = sliders[i].sliderPos;
    let currentSlide = document.getElementById("slider_" + i);
    currentSlide.innerHTML = "";

    let person = getPersonWithId(slider)
    addSlideContent(currentSlide, person);
    person.showing = true;
  }
}
 //update "state" to not show the slides
const setShowToFalse = () => {
  for (let i = 0; i < allPersons.length; i++) {
    allPersons[i].showing = false;
  }
}
//find person in data object to display
const getPersonWithId = (id) => {
  return allPersons.find((person) => {
    return person.id === id;
  })
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

//hide / show the information of a slide
const toggleInfo = (person, currentSlide) => {
  person.reviewShowing = !person.reviewShowing;
  toggleSliders(sliderIdAndPos)
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

generateUsers();
