var titulo = document.createElement("h1");

var puerta = [];
var numeroPuertas = 0;
var numeroPuertaPremio = 0
var ejecutarOnclick = true;
var botonCambiable = 0;
var botonSeleccionado = 0;
var desvelarFinal = false;

var botonReiniciar = document.createElement("button");
botonReiniciar.style.height=h;
botonReiniciar.style.width=w;
botonReiniciar.textContent="Reiniciar";

botonReiniciar.onclick = function(){
for(var i = 0; i<=puerta.length - 1; i++){
if(puerta[i]){
puerta[i].eliminar();
}
}

titulo.style.color = "black";
titulo.textContent= "Problema de Monty Hall " + ganadas + "/" + partidas;
desvelarFinal = false;
puerta = [];
console.log(puerta.length);
numeroPuertaPremio = 0
ejecutarOnclick = true;
botonCambiable = 0;
botonSeleccionado = 0;
document.body.removeChild(botonReiniciar);
crearPuertas(numeroPuertas);


}

var botonDesvelar = document.createElement("button");
botonDesvelar.style.height=h;
botonDesvelar.style.width=w;
botonDesvelar.textContent="Desvelar";

botonDesvelar.onclick = function(){
if(desvelarFinal==false){
desvelarPuertas();
}

if(desvelarFinal==true){
comprobarResultado()
}
}

var botonNoCambiar = document.createElement("button");
botonNoCambiar.style.height=h;
botonNoCambiar.style.width=w;
botonNoCambiar.textContent="No Cambiar";

botonNoCambiar.onclick = function(){
if(ejecutarOnclick == false){
document.body.appendChild(botonDesvelar);
desvelarFinal=true;
document.body.removeChild(botonNoCambiar);
}
}

var objeto = function(numero,azar){
var self = this;
this.seleccionado = false;
this.premio = azar;
this.x = false;
this.desvelado = false;

this.button = document.createElement("button");
this.button.id= "boton" + numero;

this.button.style.background = "url('p1s.jpeg')";
this.button.style.backgroundSize = "cover";
this.button.style.height = 200;
this.button.style.width = 100;
document.body.appendChild(this.button);

this.button.onclick = function(){
if(self.desvelado==false && ejecutarOnclick==false && self.seleccionado==false){
comprobacion();
self.seleccionado=true;
self.button.style.background = "url('p1.jpeg')";
desvelarFinal=true;
document.body.appendChild(botonDesvelar);
document.body.removeChild(botonNoCambiar);
}

if(ejecutarOnclick==true && !self.seleccionado){
comprobacion();
self.seleccionado = true;
self.button.style.background = "url('p1.jpeg')";
document.body.appendChild(botonDesvelar);
}
}

this.eliminar = function(){
document.body.removeChild(self.button);
}

}

function crearPuertas(total){
partidas++;
numeroPuertaPremio = Math.floor(Math.random()*numeroPuertas+1);
console.log(numeroPuertaPremio);
for(var y=1;y<=total;y++){
if(y == numeroPuertaPremio){
puerta.push(new objeto(y,true))
console.log(y);
} else{
puerta.push(new objeto(y,false));
}
}

}

function desvelarPuertas(){
ejecutarOnclick = false;

document.body.removeChild(botonDesvelar);
document.body.appendChild(botonNoCambiar);

for(var i = 0; i<=puerta.length-1;i++){
if(puerta[i].seleccionado==true && puerta[i].premio==true){
var j = Math.floor(Math.random()*(numeroPuertas-1)+1);
if(j!=i){
puerta[j].x=true;
} else {
while(j==i){
j = Math.floor(Math.random()*(numeroPuertas-1)+1);
}
}
}

}

for(var i = 0; i<=puerta.length-1;i++){
if(puerta[i].premio==false && puerta[i].seleccionado==false && puerta[i].x==false){
puerta[i].button.style.background = "url('p2s.jpeg')";
puerta[i].desvelado=true;
} else if (puerta[i].seleccionado==false){
botonCambiable=i;
} else if(puerta[i].seleccionado==true){
botonSeleccionado=i;
}
}

}

function comprobacion(){
for(var i=0;i<=puerta.length-1;i++){
console.log("comprobado1");
if(puerta[i].seleccionado==true){
console.log("comprobado2");
puerta[i].seleccionado=false;
puerta[i].button.style.background = "url('p1s.jpeg')";
}
}

}

function comprobarResultado(){
for(var i = 0; i<=puerta.length-1;i++){
if(puerta[i].premio==false){
puerta[i].button.style.background = "url('p2s.jpeg')";
} else{
puerta[i].button.style.background = "url('p2w.jpeg')";
}

if(puerta[i].premio==true && puerta[i].seleccionado==true){
ganadas++;
titulo.textContent="Has Ganado " + ganadas + "/" + partidas;
titulo.style.textDecoration = "underline";
titulo.style.color = "red";
}
}

document.body.removeChild(botonDesvelar);
document.body.appendChild(botonReiniciar);
}

function inicializar(){
titulo.textContent= "Problema de Monty Hall " + ganadas + "/" + partidas;

var formulario = document.createElement("form");
var botonSubmit = document.createElement("button");
botonSubmit.type = "submit";
botonSubmit.textContent = "Enviar";
formulario.appendChild(botonSubmit);

document.body.appendChild(titulo);
document.body.appendChild(input);
document.body.appendChild(formulario);
formulario.appendChild(input);


formulario.addEventListener("submit",function(event){
event.preventDefault();
numeroPuertas = parseInt(input.value,10);
crearPuertas(numeroPuertas);
document.body.removeChild(formulario);
});
}
