console.log("hello")

const galleryConteneur = document.querySelector(".gallery")
const buttonConteneur = document.querySelector(".button-project-box")



/*fonction returne getwork*/



async function getworks(){
  const response = await fetch ("http://localhost:5678/api/works");
  return await response.json();
}



function buildwork(work) {
  const figure = document.createElement ("figure");
  galleryConteneur.appendChild(figure);
  const img = document.createElement ("img");
  figure.appendChild(img)
  img.src = work.imageUrl
  const text = document.createElement("figcaption")
  figure.appendChild(text)
  text.textContent = work.title
}


async function displayworks() {
  const works = await getworks();
  works.forEach((work) => {
    buildwork(work);
  });
}
displayworks();


/* modal */

const modalGalery = document.querySelector(".modal-galerie")

function buildWorkModal(work) {
  const figure = document.createElement ("figure");
  figure.classList.add("modal-work")
  modalGalery.appendChild(figure);
  const img = document.createElement ("img");
  img.classList.add("work-img")
  figure.appendChild(img)
  img.src = work.imageUrl
  const trashcandiv = document.createElement ("div")
  trashcandiv.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
  figure.appendChild(trashcandiv)
  trashcandiv.classList.add ("delete")
  
}


async function displayWorksModal() {
  const works = await getworks();
  works.forEach((work) => {
    buildWorkModal(work);
  });
}
displayWorksModal();


const ModalContainer = document.querySelector(".modal-overlay")
const Close = document.querySelector(".fa-xmark")
const Modal = document.querySelector(".modal")
const Open = document.querySelector(".open")
const Open2 = document.querySelector(".project-conteneur-login")


function manageDisplayModal() {
  Open.addEventListener("click", (e) => {
    ModalContainer.style.display = "flex";
  });
  Open2.addEventListener("click", (e) => {
    ModalContainer.style.display = "flex";
  });
  Close.addEventListener("click", (e) => {
    ModalContainer.style.display = "none";
  });
}
manageDisplayModal();

/* fonction return getcategorys */



async function getcategorys(){
  const response = await fetch ("http://localhost:5678/api/categories")
  const categorys = await response.json()
  return categorys
}

function buildcategory(category) {
  const button = document.createElement ("button");
  button.textContent = category.name;
  button.classList.add("button-project");
  button.id = category.id;
  buttonConteneur.appendChild(button);
}


const categorys = await getcategorys()
console.log(categorys)
for (let i = 0; i < categorys.length; i ++){
  buildcategory(categorys[i])
}


// filtre

async function filtercategorys() {
  const allworks = await getworks ();
  const buttons = document.querySelectorAll(".button-project-box button");
  console.log(buttons)
  buttons.forEach((button) => {
    button.addEventListener("click", (e)=> {
      const buttonid = e.target.id;
      galleryConteneur.innerHTML = "";
      if (buttonid !== "0") {
        const worksfiltercategory = allworks.filter((categoryworks) => {
          return categoryworks.categoryId == buttonid;
        })
        worksfiltercategory.forEach((categoryworks) => {
          buildwork(categoryworks)
        })
      } else {
        displayworks();
      }
    })
  })
}

filtercategorys()

const loged = window.localStorage.token;
const textLogout = document.querySelector("#logout")

if (loged != null){
    document.getElementById("edition-box").style.display = "flex";
    document.querySelector(".project-conteneur-login").style.display = "flex"
    textLogout.textContent = ("logout")
}

function logout() {
 textLogout.addEventListener("click", (e) => {
  localStorage.removeItem("token");
 })
}

logout()
console.log(loged)

