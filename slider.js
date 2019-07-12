
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
  "Lorem ipsum dolor sit amet, ut doctus debitis torquatos quo, homero oblique singulis ex pri."];

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
    name: { first: person.name.first, last: person.name.last },
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
    reviewText: reviewTexts[Math.floor(Math.random() * reviewTexts.length)]
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

//hide / show the information of a slide
const toggleInfo = (person, currentSlide) => {
  person.reviewShowing = !person.reviewShowing;
  toggleSliders(sliderIdAndPos)
}

generateUsers();
