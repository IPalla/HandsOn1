export class Main{
    constructor(){
        this.vista = {
            botonesMenu: document.querySelectorAll('nav ul li a'),          //Botones del menu
            botonEnviar: null,                                              //Boton de enviar formulario. No se hace el selector hasta q se pulsa about
            articleHtml: document.querySelector('article'),
            templates: document.querySelectorAll('link[rel="import"]'),     //Templates importados
            keyTemplates: {}                                                //Array indexada, clave= id del boton, valor= template
        }
        // Manejador de eventos del menu
        this.vista.botonesMenu.forEach( (item) => {
            item.addEventListener('click',this.menuItems.bind(this),true);
            this.bindTemplates(item);
        })
        this.form={
            nombre: null,
            email: null,
            preferencia: null,
            comentario: null
        }
    }
    /*
         Si un botón es pulsado carga la template correspondiente a su valor
    */

    menuItems(oEv) {
        oEv.preventDefault();
        //Si el boton pulsado es el about el aside se oculta.
        if(oEv.target.id=='btnAbout'){
            document.querySelector('aside').className='oculto';
        }
        else{
            document.querySelector('aside').className='';
        }
        var toInyect = this.vista.keyTemplates[oEv.target.id].querySelector('template');
        if(toInyect){
            this.vista.articleHtml.innerHTML=toInyect.innerHTML;
        }
        else{
            this.vista.articleHtml.innerHTML="<h2>Ocurrio un error cargando el template</h2>";
        }
        this.vista.articleHtml.innerHTML=toInyect.innerHTML;

        this.vista.botonEnviar=document.querySelector('button');
        if(this.vista.botonEnviar){ //Si existe boton enviar (about) se añade el event listener
            this.vista.botonEnviar.addEventListener('click', this.botonFormulario.bind(this));
        }
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
    botonFormulario(oEv){
        oEv.preventDefault();
        let nombre=document.getElementById("Nombre").value;
        let email=document.getElementById("Email").value;
        let comentario=document.getElementById("Comentario").value;
        let esqui=document.getElementById("Preferencia_esqui").checked;
        let snow=document.getElementById("Preferencia_snow").checked;
        if(comentario.length < 5){
            document.getElementById("Comentario").placeholder="Mínimo 5 caracteres";
            document.getElementById("Comentario").className='required';
        }
        else{
            document.getElementById("Comentario").className='';
        }
        console.dir(esqui);
        console.dir(snow);
        if(!esqui && !snow){
            document.getElementById("Preferencia").className="required";
        }
        else{
            document.getElementById("Preferencia").className="";
        }

    }
}
