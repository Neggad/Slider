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
  createImageContent(imageDiv, { firstName, lastName }, person.img.large);

  //info toggle button
  let toggleButton = document.createElement("button");
  let infoSpan = document.createElement("span");
  addBtnVarialbes({ btn: toggleButton, span: infoSpan, spanClass: "", icon: "i", value: "info", btnClass: "toggleBtn" })
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

    let emailButton = document.createElement("button");
    let phoneButton = document.createElement("button");
    let cityButton = document.createElement("button");

    createInfoButtonContent({ emailButton, phoneButton, cityButton }, person, currentSlide);

    //add styling to the currently selected button
    let infoContent = document.createElement("span");
    createInfoContent({ emailButton, phoneButton, cityButton }, person, infoContent);

    personInfoContainer.appendChild(infoContent);
    buttonContainer.appendChild(emailButton);
    buttonContainer.appendChild(phoneButton);
    buttonContainer.appendChild(cityButton);
    infoContainer.appendChild(buttonContainer);
    infoContainer.appendChild(personInfoContainer);
  }
  else {
    toggleButton.classList.remove("selectedBtn");
    createReviewContent(person, infoContainer);
  }

  imageDiv.appendChild(toggleButton)
  contentContainer.appendChild(imageDiv)
  contentContainer.appendChild(infoContainer)
  currentSlide.appendChild(contentContainer);
}

const createInfoContent = (button, person, infoContent) => {
  switch (person.selectedInfo) {
    case "email": {
      infoContent.textContent = person.email;
      button.emailButton.classList.add("selectedBtn");
      break;
    }
    case "phone": {
      infoContent.textContent = person.phone;
      button.phoneButton.classList.add("selectedBtn");
      break;
    }
    case "city": {
      infoContent.textContent = person.location.city.charAt(0).toUpperCase() + person.location.city.slice(1);
      button.cityButton.classList.add("selectedBtn");
      break;
    }
    default:
      infoContent.textContent = person.email;
      button.emailButton.classList.add("selectedBtn");
      break;
  }
}

const createImageContent = (imageDiv, name, img) => {
  //Slider image
  imageDiv.className = "imgDiv";
  let slideImage = document.createElement("img");
  slideImage.alt = "Image of " + name.firstName + " " + name.lastName;
  slideImage.src = img;
  imageDiv.appendChild(slideImage);
}

const createReviewContent = (person, infoContainer) => {
  //Quotation mark
  let quoteIconDiv = document.createElement("div");
  let quoteIcon = document.createElement("span");
  quoteIcon.classList.add("quoteIcon");
  quoteIconDiv.appendChild(quoteIcon);
  quoteIconDiv.classList.add("quoteIconDiv");
  quoteIcon.textContent = '"';
  //Review text
  let reviewContainer = document.createElement("div");
  let reviewSpan = document.createElement("span");
  reviewContainer.classList.add("reviewContainer")
  reviewContainer.appendChild(quoteIconDiv);
  reviewSpan.textContent = person.reviewText;
  reviewContainer.appendChild(reviewSpan);
  infoContainer.appendChild(reviewContainer);
}

const createInfoButtonContent = (button, person, currentSlide) => {
  //Email Button
  let emailButtonSpan = document.createElement("span");
  addBtnVarialbes({ btn: button.emailButton, span: emailButtonSpan, spanClass: "btnText", icon: "📧", value: "email", btnClass: "infoBtn" })
  button.emailButton.onclick = () => changeSelectedInfo(person, currentSlide);
  button.emailButton.appendChild(emailButtonSpan);
  //Phone button
  let phoneButtonSpan = document.createElement("slide-button");
  addBtnVarialbes({ btn: button.phoneButton, span: phoneButtonSpan, spanClass: "btnText", icon: "📱", value: "phone", btnClass: "infoBtn" })
  button.phoneButton.onclick = () => changeSelectedInfo(person, currentSlide);
  button.phoneButton.appendChild(phoneButtonSpan);
  //City Button
  let cityButtonSpan = document.createElement("span");
  addBtnVarialbes({ btn: button.cityButton, span: cityButtonSpan, spanClass: "btnText", icon: "🏠", value: "city", btnClass: "infoBtn" })
  button.cityButton.onclick = () => changeSelectedInfo(person, currentSlide);
  button.cityButton.appendChild(cityButtonSpan);
}
//Add icon, class, value to buttons
const addBtnVarialbes = (variable) => {
  variable.span.textContent = variable.icon;
  variable.span.className = variable.spanClass;
  variable.btn.className = variable.btnClass;
  variable.btn.value = variable.value;
}