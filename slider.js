var display = [0, 1, 2]
var numberOfPersons = 5;
const generateUsers = () => {
  //call API and create slides and buttons after
  getUsers
    .then(function (data) {
      createArrowBtn('left');
      console.log("something", data.results)
      data.results.map((person, index) => {
        createSlide(person);
        createButton(index);
      })
      createArrowBtn('right');
    })
}
const createSlide = (person) => {
  //Parent container for slides
  let currentdiv = document.getElementById('sliderContainer');
  //create div for person
  let newDiv = document.createElement("div");
  newDiv.className = 'slide';
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

  // nextButton.after(newButton);
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

const goTo = (dir) => {
  console.log("display before:", display)
  if (dir === 'left') {
    for (let i = 0; i < display.length; i++) {
      if (display[i] === 0) {

        display[i] = numberOfPersons;
      }
      else {
        display[i] = display[i] - 1;
      }
    }
  }
  console.log("display:", display)
  console.log("go to:", dir)
}

generateUsers();