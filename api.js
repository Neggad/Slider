const getUsers = new Promise(
  function (resolve, reject) {
    fetch('https://randomuser.me/api/?results=5')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        // console.log(JSON.stringify(myJson));
        resolve(myJson)
      })
  }
)

