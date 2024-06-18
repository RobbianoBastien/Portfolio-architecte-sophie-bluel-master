console.log("hello")

const galleryConteneur = document.querySelector(".gallery")
const buttonConteneur = document.querySelector(".button-project-box")



/*fonction returne getwork*/



async function getworks(){
  const response = await fetch ("http://localhost:5678/api/works");
  return await response.json();
}
getworks()



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

if (loged != null){
    document.getElementById("edition-box").style.display = "flex";
}

console.log(loged)