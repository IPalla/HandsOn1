/*Crea una funcion anonima y en el mismo momento que la crea la mete entre parentesis y se ejecuta, para evitar que haya funciones globales
y pueden ser:
document -> DOMContentLoaded    ----> document.addEventListener("DOMContentLoaded",<nombrefuncion>,false);
window -> Load                  ----> 
*/

(function (){
    document.addEventListener("DOMContentLoaded",main,false);
})();

//Acceso al DOM -> Utiliza selectores de CSS
//document.querySelector() -> devuelve el primero que encuentre de ese tipo
//document.querySelectorAll() -> Devuelve un array con todos los objetos del topo que pones
// Dentro de query selector si quieres una clase, un id o lo que sea se tiene que poenr como CSS con #
// un . o lo que sea segun la cosa que esté cogiendo
//Lo que te devuelve el queryselector son punteros al objeto del html

//Si en el document.querySelector("#btnSaludar").addEventListener("click",btnSaludar(),false)
//con el parentesis de la funcion se ejecutara cuando se lee la linea no cuando se haga click
//para ello: document.querySelector("#btnSaludar").addEventListener("click",btnSaludar,false)
function main(){
    console.log("Documento Cargado")
    //console.dir(window); -> directorio de todo el elemento window
    console.log(document.querySelector("#btnSaludar"))
    console.log(document.querySelectorAll("#btnRegistrar")[0])
    document.querySelector("#btnSaludar").addEventListener("click",btnSaludar,false)
    document.querySelectorAll("#btnRegistrar")[0].addEventListener("click",btnRegistrar,false)
    document.querySelector("#btnGoogle").addEventListener("click",btnGoogle,false)

}

//BOM interactua con la ventana del navegador, no hace falta poner delante window, se da por echo

function btnSaludar(){
    alert("Hola a todos");
}

function btnRegistrar(){
    let user = prompt("Dime tu Nombre","Pepe");
}

//Interactua con la barra del navegador, tanto para leer como escribir
function btnGoogle(){
    console.log(window.location.href);
    window.location.href="https://www.google.com"
}