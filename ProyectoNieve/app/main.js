export class Main{
    constructor(){
        console.log("Cargado");
        this.vista = {
            botonesMenu: document.querySelectorAll('nav ul li a'),          //Botones del menu
            articleHtml: document.querySelector('article'),
            templates: document.querySelectorAll('link[rel="import"]'),     //Templates importados
            keyTemplates: {}                                                //Array indexada, clave= id del boton, valor= template
        }
        // Manejador de eventos del menu
        this.vista.botonesMenu.forEach( (item) => {
            item.addEventListener('click',this.menuItems.bind(this),true);
            this.bindTemplates(item);
        })
        console.dir(this.vista.keyTemplates);
        console.dir(this.vista.templates);
    }
    /*
         Si un botón es pulsado carga la template correspondiente a su valor
    */

    menuItems(oEv) {
        oEv.preventDefault();
        var toInyect = this.vista.keyTemplates[oEv.target.id].querySelector('template');
        console.log(oEv.target.id);
        if(toInyect){
            this.vista.articleHtml.innerHTML=toInyect.innerHTML;
        }
        else{
            this.vista.articleHtml.innerHTML="<h2>Ocurrio un error cargando el template</h2>";
        }
        this.vista.articleHtml.innerHTML=toInyect.innerHTML;
    }
    /*
        Esta funcion es la encargada de crear el array asociativo. Los templates deben tener como título el id
        del boton al que hacen referencia sin el prefijo "btn".
        En caso de que exista algún botón sin que ningún template lo referencie se le asociará el primer template
        cargado. La clave del array es el id del botón y el valor es el template.
    */
    bindTemplates(button){
        this.vista.templates.forEach( (temp) => {
            if(temp.title == button.id.substring(3)){
                this.vista.keyTemplates[button.id]=temp.import;
            }
        })
        if (!this.vista.keyTemplates[button.id]){
            this.vista.keyTemplates[button.id]=this.vista.templates[0].import;
        }
    }
}

