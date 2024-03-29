fetch("https://amazing-events-back.onrender.com/event")
.then((res)=>res.json()) //me lo convierte a json
.then((data)=> {
console.log(data);

let datos = data.response;

const queryString = location.search
const params = new URLSearchParams(queryString) 
const id = params.get("id")

let persona = datos.find(item=> item._id == id)

let cajaBig = document.querySelector("#cardBig") 
cajaBig.innerHTML = `<div class="cajacard2 p-1">
<img src="${persona.image}" class="imgcard2" alt="concierto">
</div>
<div class="card-body cajatexto">
<p class="card-text p-1">Name: ${persona.name}</p>
<p class="card-text p-1">Date: ${persona.date}</p>
<p class="card-text p-1">Description: ${persona.description}</p>
<p class="card-text p-1">Category: ${persona.category}</p>
<p class="card-text p-1">Place: ${persona.place}</p>
<p class="card-text p-1">Capacity: ${persona.capacity}</p>
<p class="card-text p-1 primeraletra">${Object.keys(persona)[8]}: ${persona.assistance || persona.estimate} </p>
<p class="card-text p-1">Price: ${persona.price}</p>
</div>`

})
.catch( (error) => console.log(error))