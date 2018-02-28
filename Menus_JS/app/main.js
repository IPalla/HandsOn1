
/*Cuando hay errores del this pork cambia su valor se puede utilizar el metodo
.bind(this) y ejecutaria el metodo que sea, lo de antes del punto del objeto this pasado
    document.querySelectorAll("#btnRegistrar")[0].addEventListener("click",this.btnRegistrar.bind(this),false)
    quiere decir que cuando encuentre un this dentro del objeto lo enlace a el this del bind
    this.btnRegistrar.bind(this)
*/
class Main {

    constructor(){
        console.log("Documento Cargado")
        //console.dir(window); -> directorio de todo el elemento window
        console.log(document.querySelector("#btnSaludar"))
        console.log(document.querySelectorAll("#btnRegistrar")[0])
        document.querySelector("#btnSaludar").addEventListener("click",this.btnSaludar,false)
        document.querySelectorAll("#btnRegistrar")[0].addEventListener("click",this.btnRegistrar,false)
        document.querySelector("#btnGoogle").addEventListener("click",this.btnGoogle,false)
    }

    btnSaludar(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones/?api_key=jyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqbW9udGVyb2dAYWVtZXQuZXMiLCJqdGkiOiI3NDRiYmVhMy02NDEyLTQxYWMtYmYzOC01MjhlZWJlM2FhMWEiLCJleHAiOjE0NzUwNTg3ODcsImlzcyI6IkFFTUVUIiwiaWF0IjoxNDc0NjI2Nzg3LCJ1c2VySWQiOiI3NDRiYmVhMy02NDEyLTQxYWMtYmYzOC01MjhlZWJlM2FhMWEiLCJyb2xlIjoiIn0.xh3LstTlsP9h5cxz3TLmYF4uJwhOKzA0B6-vH8lPGGw",
            "method": "GET",
            "headers": {
              "cache-control": "no-cache"
            }
          }
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
    }
    
    btnRegistrar(){
        let user = prompt("Dime tu Nombre","Pepe");
    }
    
    //Interactua con la barra del navegador, tanto para leer como escribir
    btnGoogle(){
        console.log(window.location.href);
        window.location.href="https://www.google.com"
    }

}

(function (){
    document.addEventListener("DOMContentLoaded",
        ()=>{oMain= new Main()},false);
})();