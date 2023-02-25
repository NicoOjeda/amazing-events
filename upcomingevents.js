fetch("https://amazing-events-back.onrender.com/event")
.then((res)=>res.json()) //me lo convierte a json
.then((data)=> {
console.log(data);


let datos = data.response;
let cajaCards = document.getElementById("cajacards");
let btnBuscador = document.getElementById("buscador");
let textoCapturado = document.getElementById("search");
let cajaCheck = document.getElementById("checkbox")
let today = parseInt("2022-01-01")

imprimeCards(datos)

// busca por texto y luego pinto
btnBuscador.addEventListener("click",()=>{
  let arrayFiltradoPorCategoria = filtrarPorCategoria(datos)
  let arrayFiltradoPorTexto = buscadorTexto(textoCapturado.value,arrayFiltradoPorCategoria)
  imprimeCards(arrayFiltradoPorTexto)
})

function imprimeCards(array){
  cajaCards.innerHTML= ""
  if(array.length>0){
  array.forEach((dato)=>{
    if(parseInt(dato.date) == today){
    let card = document.createElement("div")
    card.innerHTML =`<div class="card" style="width: 18rem;">
  <img src="${dato.image}" class="card-img-top imgcard " alt="...">
  <div class="card-body d-flex flex-column justify-content-between">
    <h5 class="card-title fw-bold">${dato.name}</h5>
    <p class="card-text">${dato.description}</p>
    <p class="card-text">Date: ${dato.date}</p>
    <div class="d-flex justify-content-around align-items-center">
      <p class="d-inline-block">Price: $${dato.price}</p>
      <a href="./details.html?id=${dato._id}" class="btn search2 d-inline-block">See more..</a>
    </div>
  </div>
  </div>`
  cajaCards.appendChild(card)
  }
})
} else {
  cajacards.innerHTML= `<p class="noEncontrado">No results found</p>`
}
}


// filtra por texto
function buscadorTexto(textoCapturado,arrayDatos){
  let arrayF = arrayDatos.filter((dato)=> dato.name.toLowerCase().includes(textoCapturado.toLowerCase()))
  return arrayF
}

// crea array de categorias
function separarCards() {
  let categorias =[];
  datos.forEach(dato=>{
    if(!categorias.includes(dato.category)){
      categorias.push(dato.category)
    }
})
categorias.forEach(dato=>{
  let checks = document.createElement("div")
  checks.innerHTML=`<div class="form-check form-switch pe-3">
  <input class="form-check-input check2" type="checkbox" role="switch" id="${dato}" value="${dato}">
  <label class="form-check-label check1" for="${dato}">${dato}</label>
  </div>`
  cajaCheck.appendChild(checks)
})
}
separarCards()

// capturando desde la caja de checks y pintando cards
cajaCheck.addEventListener("change",()=>{
  let arrayFiltradoPorTexto =  buscadorTexto(textoCapturado.value,datos) 
  let arrayFiltradoPorCategoria = filtrarPorCategoria(arrayFiltradoPorTexto)
  imprimeCards(arrayFiltradoPorCategoria)
})

function filtrarPorCategoria(arrayDatos) {
  let checkCategorias = document.querySelectorAll("input[type='checkbox']")
  let arrayCheck = Array.from(checkCategorias)
  let checksCambiados = arrayCheck.filter(check=>check.checked)
  let categorias = checksCambiados.map(checksCambiado=> checksCambiado.value) 
  console.log(categorias)
  // si la categoria no esta vacia las filtro y me fijo si dato.category coincide con algun elemento de categorias
  if(categorias.length>0){
    let datosFiltrados = arrayDatos.filter(dato=>categorias.includes(dato.category)) 
    console.log(datosFiltrados);
    return datosFiltrados
  }
  // sino devuelvo directamente el array sin filtrar
  return arrayDatos
}
})
.catch( (error) => console.log(error))