var h= 60;
var w = 80;

var puerta = [];
var numeroPuertaPremio = Math.floor(Math.random()*36);
var ejecutarOnclick = true;
var botonCambiable = 0;
var botonSeleccionado = 0;

var botonReiniciar = document.createElement("button");
botonReiniciar.style.height=h;
botonReiniciar.style.width=w;
botonReiniciar.textContent="Reiniciar";

botonReiniciar.onclick = function(){
location.reload();
}

var botonDesvelar = document.createElement("button");
botonDesvelar.style.height=h;
botonDesvelar.style.width=w;
botonDesvelar.textContent="Desvelar";

botonDesvelar.onclick = function(){
desvelarPuertas();
}

var botonCambiar = document.createElement("button");
botonCambiar.style.height=h;
botonCambiar.style.width=w;
botonCambiar.textContent="Cambiar";

botonCambiar.onclick = function(){
if(ejecutarOnclick == false){
puerta[botonCambiable].seleccionado=true;
puerta[botonSeleccionado].seleccionado=false;
comprobarResultado();
}
}

var botonNoCambiar = document.createElement("button");
botonNoCambiar.style.height=h;
botonNoCambiar.style.width=w;
botonNoCambiar.textContent="No Cambiar";

botonNoCambiar.onclick = function(){
if(ejecutarOnclick == false){
comprobarResultado();
}
}

var objeto = function(numero,azar){
var self = this;
this.seleccionado = false;
this.premio = azar;
this.x = false;

this.button = document.createElement("button");
this.button.id= "boton" + numero;

this.button.style.background = "url('p1s.jpeg')";
this.button.style.backgroundSize = "cover";
document.body.appendChild(this.button);

this.button.onclick = function(){
if(ejecutarOnclick==true && !self.seleccionado){
comprobacion();
self.seleccionado = true;
self.button.style.background = "url('p1.jpeg')";
document.body.appendChild(botonDesvelar);
}
}

}

function crearPuertas(total){
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
document.body.appendChild(botonCambiar);
document.body.appendChild(botonNoCambiar);

for(var i = 0; i<=puerta.length-1;i++){
if(puerta[i].seleccionado==true && puerta[i].premio==true){
puerta[Math.floor(Math.random()*36)].x=true;
}
}

for(var i = 0; i<=puerta.length-1;i++){
if(puerta[i].premio==false && puerta[i].seleccionado==false && puerta[i].x==false){
puerta[i].button.style.background = "url('p2s.jpeg')";
} else if (puerta[i].seleccionado==false){
botonCambiable=i;
} else if(puerta[i].seleccionado==true){
botonSeleccionado=i;
}
}

}

function comprobacion(){
for(var i=0;i<=puerta.length-1;i++){
if(puerta[i].seleccionado==true){
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
}

document.body.removeChild(botonCambiar);
document.body.removeChild(botonNoCambiar);
document.body.appendChild(botonReiniciar);
}

function inicializar(){
crearPuertas(36);
}
