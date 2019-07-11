const getUsers = new Promise(
  function (resolve, reject) {
    fetch('https://randomuser.me/api/?results=10')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        // console.log(JSON.stringify(myJson));
        resolve(myJson)
      })
      .catch((error) => {
        console.log(error.message)
        let container = document.body;
        let errorMsg = document.createElement("h2");
        errorMsg.classList.add("errorMsg");
        errorMsg.textContent = "Error Message: " + error.message;
        container.appendChild(errorMsg);
        // container.textContent = error.message;
        }
      )
  }
)

