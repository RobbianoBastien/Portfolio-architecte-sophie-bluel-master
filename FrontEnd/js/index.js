console.log("hello")

const galleryConteneur = document.querySelector(".gallery")
const buttonConteneur = document.querySelector(".button-project-box")
const loged = window.localStorage.token;
const textLogout = document.querySelector("#logout")




/*fonction returne getwork*/




 
let categoriesFetched;
let worksFetched;

async function getworks(){
    const response = await fetch("http://localhost:5678/api/works")
    const JsonData = await response.json()
    worksFetched = JsonData;
  }
await getworks()




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
  worksFetched.forEach((work) => {
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
  trashcandiv.setAttribute("id",work.id)
}


async function displayWorksModal() {
  worksFetched.forEach((work) => {
    buildWorkModal(work);
  });
  deletework()
}
displayWorksModal();


const ModalContainer = document.querySelector(".modal-overlay")
const Close = document.querySelector("#close1")
const Close2 = document.querySelector("#close2")
const Return1 = document.querySelector("#return")
const Modal = document.querySelector(".modal")
const ModalAdd = document.querySelector(".modal-add")
const Open = document.querySelector(".open")
const Open2 = document.querySelector(".project-conteneur-login")
const SwitchModal = document.querySelector(".button-modal")


function manageDisplayModal() {
  Open.addEventListener("click", (e) => {
    ModalContainer.style.display = "flex";
    Modal.style.display = "flex";
  });
  Open2.addEventListener("click", (e) => {
    ModalContainer.style.display = "flex";
    Modal.style.display = "flex";
  });
  Close.addEventListener("click", (e) => {
    ModalContainer.style.display = "none";
  });
  SwitchModal.addEventListener("click", (e) => {
    Modal.style.display = "none";
    ModalAdd.style.display = "flex";
  });
  Close2.addEventListener("click", (e) => {
    ModalContainer.style.display = "none";
    ModalAdd.style.display = "none";
  });
  Return1.addEventListener("click", (e) => {
    Modal.style.display = "flex";
    ModalAdd.style.display = "none";
  });
}
manageDisplayModal();


function deletework() {
  const trashcandivALL = document.querySelectorAll(".delete");
  trashcandivALL.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      const id = trash.getAttribute("id");
      console.log(id)
      console.log(loged)
         fetch("http://localhost:5678/api/works/" + id,{
          method: "DELETE",
          headers: { 
            "Authorization": `Bearer ${loged}`,
              },
        })
        .then(async(data)  => {
          console.log("la delete a réussi voici la data :", data);
          modalGalery.innerHTML = ""
          galleryConteneur.innerHTML = ""
          await getworks().then(() => {
            displayWorksModal()
            displayworks()
            resetform()
        })
        })
        .catch ((error) => { 
          return error;
    });
  });
})
}



/* fonction return getcategorys */



async function getcategorys(){
  const response = await fetch ("http://localhost:5678/api/categories")
  const categorys = await response.json()
  return categorys
}

await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then(JsonData => {

     categoriesFetched = JsonData;

    }).catch(error => console.error)

console.log( categoriesFetched )


function buildcategory(category) {
  const button = document.createElement ("button");
  button.textContent = category.name;
  button.classList.add("button-project");
  button.id = category.id;
  buttonConteneur.appendChild(button);
}



for (let i = 0; i < categoriesFetched.length; i ++){
  buildcategory(categoriesFetched[i])
}


// filtre

async function filtercategorys() {
  const buttons = document.querySelectorAll(".button-project-box button");
  console.log(buttons)
  buttons.forEach((button) => {
    button.addEventListener("click", (e)=> {
      const buttonid = e.target.id;
      galleryConteneur.innerHTML = "";
      if (buttonid !== "0") {
        const worksfiltercategory = worksFetched.filter((categoryworks) => {
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

/*******Rajouter des images ********/


function Filevalidation(){
  if (inputFile.files.length > 0) {
      for (let i = 0; i <= inputFile.files.length - 1; i++) {
          const fileSize = inputFile.files.item(i).size;
          const file = Math.round((fileSize / 1024));
          const allowedTypes = ['image/jpeg', 'image/png'];
          const allowedExtensions = ['jpg', 'jpeg', 'png'];
          const fileExtension = inputFile.files[i].name.split('.').pop().toLowerCase();
          const isValidExtension = allowedExtensions.includes(fileExtension);
          console.log(allowedExtensions.includes(inputFile.files[i].type))
          if (file >= 4096 || isValidExtension == false || !allowedTypes.includes(inputFile.files[i].type)) {
           inputFile[i] = null
           console.log("aled")
           alert('Veuillez télécharger une image au format .png, .jpg ou .jpeg.')
           return false
          }
          else{
            return true
          }
      }
  }
}


const previewImg = document.querySelector(".modal-add-file img")
let inputFile = document.querySelector(".modal-add-file input")
const labelFile = document.querySelector(".modal-add-file label")
const inconFile = document.querySelector(".modal-add-file .fa-image")
const pFile = document.querySelector(".modal-add-file p")


inputFile.addEventListener("change",(e)=>{
  const file = inputFile.files[0]
  const response = Filevalidation()
  if(!response){
      return
  }
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e){
      previewImg.src = e.target.result
      previewImg.style.display = "flex"
      labelFile.style.display = "none"
      inconFile.style.display = "none"
      pFile.style.display = "none"
    }
    reader.readAsDataURL(file);
  }
})


async function displayCategoryModal (){
  const select = document.querySelector(".modal-add select")
  categoriesFetched.forEach(category => {
    const option = document.createElement("option")
    option.value = category.id
    option.textContent = category.name
    select.appendChild(option)
  })
}
displayCategoryModal()

const form = document.querySelector(".modal-add form")
const title = document.querySelector(".modal-add #title")
const category = document.querySelector(".modal-add #category")

form.addEventListener("submit",async (e)=>{
  e.preventDefault()
  if(title.value ==""){
    alert('titre vide')
    return
  }
  const formData = new FormData();
    formData.append('title', title.value);
    formData.append('category', category.value);
    formData.append('image', inputFile.files[0]);
  fetch("http://localhost:5678/api/works",{
    method:"POST",
    body: formData,
    headers: { 
      "Authorization": `Bearer ${loged}`,
        },
  })
  .then(response => response.json())
  .then(async data =>{
    console.log(data);
    console.log("voici l'iamge ajouté",data);
    modalGalery.innerHTML = "";
    galleryConteneur.innerHTML = "";
    await getworks().then(() => {
      displayWorksModal()
      displayworks()
      resetform()
  })
  })
  .catch(error => console.log("voici l'erreur",error))
})

function resetform (){
  const category = document.getElementById("category")
  const title = document.getElementById ("title")
  const img = document.getElementById ("file")
  title.value = ""
  category.value = "1"
  img.value = null
  previewImg.src = ""
  previewImg.style.display = "none"
  labelFile.style.display = "flex"
  inconFile.style.display = "flex"
  pFile.style.display = "flex"
}


