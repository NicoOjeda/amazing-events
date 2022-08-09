fetch("https://amazing-events.herokuapp.com/api/events")
.then((res)=>res.json()) //me lo convierte a json
.then((data)=>{

let datos = data.events
console.log(datos);
let fechaActual = data.currentDate

// comparo fechas y saco futuras y pasadas
let arrEventosFuturos = datos.filter(eventoFuturo=> eventoFuturo.date > fechaActual)
let arrEventosPasados = datos.filter(eventoFuturo=> eventoFuturo.date < fechaActual)
console.log(arrEventosPasados);

//eventos futuros
let categoryAssistance = arrEventosFuturos.map(eventos => eventos.category)
let categoryFuture = new Set(categoryAssistance)

//eventos pasados
let categoryAssistance2 = arrEventosPasados.map(eventos => eventos.category)
let categoryPast = new Set(categoryAssistance2)


let percentaje2 = []

arrEventosPasados.map(eventos => {
    percentaje2.push({
        eventos: eventos.name,
        perAssist: (eventos.assistance * 100 / eventos.capacity).toFixed(2)
    })
})
let max = percentaje2.sort((a, b) => b.perAssist - a.perAssist)[0]

let min = percentaje2.sort((a, b) => a.perAssist - b.perAssist)[0]

let capacity = arrEventosPasados.filter(e => e.capacity).sort((a, b) => b.capacity - a.capacity)[0]

console.log(percentaje2);
console.log(max);
console.log(min);
console.log(capacity);

//imprimir celdas
let filas2 = document.getElementById("eventsTable")
let div2 = document.createElement("tr")
div2.innerHTML = `<td>${max.eventos}: ${max.perAssist}%</td>
<td>${min.eventos}: ${min.perAssist}%</td>
<td>${capacity.name}: ${capacity.capacity}</td>`
filas2.appendChild(div2)


// parte 2 de la tabla
let filas = document.getElementById("upcoming")
categoryFuture.forEach(elemento=>{
let revenues = 0
let percentage = 0
arrEventosFuturos.forEach(cat=>{
    if(cat.category == elemento){
    revenues = revenues + (cat.price*cat.estimate)
    percentage = ((cat.estimate*100)/cat.capacity).toFixed(2);
    }
})
// console.log(revenues);
let div = document.createElement("tr")
div.innerHTML = `<td>${elemento}</td>
<td>${revenues}</td>
<td>${percentage}%</td>`
filas.appendChild(div)
})


// parte 3 de la tabla 
let filasw = document.getElementById("past")
categoryPast.forEach(elemento=>{
let revenues = 0
let percentage = 0
arrEventosPasados.forEach(cat=>{
    if(cat.category == elemento){
    revenues = revenues + (cat.price*cat.assistance)
    percentage = ((cat.assistance*100)/cat.capacity).toFixed(2);
    }
})
// console.log(revenues);
let div = document.createElement("tr")
div.innerHTML = `<td>${elemento}</td>
<td>${revenues}</td>
<td>${percentage}%</td>`
filasw.appendChild(div)
})


})
.catch( (error) => console.log(error))