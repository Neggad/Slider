var currentSliderIds = [0, 1, 2];
var allSliders = [];
//https://freefrontend.com/css-carousels/
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
    .then(function(){
      
    })
}
const createSlide = (person, index) => {
  //Parent container for slides
  let currentdiv = document.getElementById('sliderContainer');
  //create div for person
  let newDiv = document.createElement("div");
  newDiv.id = "slider_"+index;
  allSliders.push(index);
  newDiv.className = 'slide';
  if(index > 2){
    newDiv.className += ' invisible';
  }

//test
let testDiv = document.createElement("div");

let testContent = document.getElementById("test");
testDiv.append(person.name.first + " " + person.name.last)
testDiv.className="test"
testContent.appendChild(testDiv);

  //set content of said div
  let newContent = document.createTextNode(person.name.first + " " + person.name.last);
  newDiv.appendChild(newContent);

  currentdiv.append(newDiv);
}
const createButton = (index) => {
  //Parent container for buttons
  let buttonContainer = document.getElementById('buttonContainer');
  //create button for div
  let newButton = document.createElement("div");
  newButton.className = 'button';
  let newButtonContent = document.createTextNode(index);
  newButton.appendChild(newButtonContent);
  buttonContainer.appendChild(newButton);
}

const createArrowBtn = (dir) => {
  let buttonContainer = document.getElementById('buttonContainer');
  let dirButton = document.createElement("div");
  dirButton.className = 'button';
  let dirButtonContent = '';
  dirButton.onclick = () => goTo(dir);

  dir === 'left' ?
    dirButtonContent = document.createTextNode("-") :
    dirButtonContent = document.createTextNode("+");

  dirButton.appendChild(dirButtonContent);
  buttonContainer.appendChild(dirButton);
}

const toggleSliders = (sliders) =>{
  console.log("SLIDERS", sliders)
  for(let i = 0; i < allSliders.length; i++){
    let currentSlider = document.getElementById("slider_"+allSliders[i]);
    console.log("(all)slider:", allSliders[i])
    // console.log("sliders.contains(allSliders[i])", sliders.contains(allSliders[i]))
    if(sliders.includes(allSliders[i])){
      console.log("sliders includes current number:", allSliders[i])
      if(currentSlider.classList.contains("invisible")){
        console.log("show current slider:", "slider_"+allSliders[i])
        currentSlider.classList.remove("invisible")
      }
    }
    else{
      if(!currentSlider.classList.contains("invisible")){
        currentSlider.classList.add("invisible")
      }
    }
  }
}
const goTo = (dir) => {
  if (dir === 'left') {
    for (let i = 0; i < currentSliderIds.length; i++) {
      if (currentSliderIds[i] === 0) {
        currentSliderIds[i] = numberOfPersons-1;
      }
      else {
        currentSliderIds[i] = currentSliderIds[i] - 1;
      }
    }
  }
  else{
    for (let i = 0; i < currentSliderIds.length; i++) {
      if (currentSliderIds[i] === numberOfPersons-1) {
        currentSliderIds[i] = 0;
      }
      else {
        currentSliderIds[i] = currentSliderIds[i] + 1;
      }
    }
  }

  toggleSliders(currentSliderIds);
  console.log("currentSliderIds:", currentSliderIds)
  console.log("go to:", dir)
}

generateUsers();