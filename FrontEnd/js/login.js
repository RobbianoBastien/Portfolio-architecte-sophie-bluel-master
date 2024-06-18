const email = document.querySelector("#email")
const password = document.querySelector("#password")
const form = document.querySelector("form")
const messageErreur = document.querySelector(".error")


form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(e)
    fetch("http://localhost:5678/api/users/login", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      })
      .then( (response) => { 
         return response.json();
      })
      .then(data => {
        if(data.message || data.error ) {
            messageErreur.innerHTML = "identifiants incorrect"
            return
        }
        console.log(data)
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      })
      .catch ((error) => { 
        return error;
      })
} )    

