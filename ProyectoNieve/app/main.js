export class Main{
    constructor(){
        this.vista = {
            botonesMenu: document.querySelectorAll('nav ul li a'),          //Botones del menu
            botonEnviar: null,                                              //Boton de enviar formulario. No se hace el selector hasta q se pulsa about
            articleHtml: document.querySelector('article'),
            templates: document.querySelectorAll('link[rel="import"]'),     //Templates importados
            keyTemplates: {}                                                //Array indexada, clave= id del boton, valor= template
        }
        // Manejador de eventos del menu nav
        this.vista.botonesMenu.forEach( (item) => {
            item.addEventListener('click',this.menuItems.bind(this),true);
            this.bindTemplates(item);
        })
        //form guardará los valores del form
        this.form={
            nombre: null,
            email: null,
            preferencia: null,
            comentario: null
        }
        this.menuItems();
    }
    /*
         Si un botón es pulsado carga la template correspondiente a su valor. En el caso de no ser about se realizan las siguientes acciones:
            1) Pone el aside visible por si se viene de "about".
            2) Selecciona del array asociativo el template correspondiente a su id. Este array ha sido previamente creado en la función bindTemplates
            3) Inyecta en el article el html del template correspondiente.
    */

    menuItems(oEv) {
        //Caso default
        if(!oEv){
            var toInyect = this.vista.keyTemplates["btnPuertoDeNavacerrada"].querySelector('template');
            this.vista.articleHtml.innerHTML=toInyect.innerHTML;
            return;
        }
        oEv.preventDefault();
        console.log(oEv.target.name);
        //El template about tiene un tratamiento especial, por lo que si el boton pulsado es about se llama a la función muestraAbout()
        if(oEv.target.name=='btnAbout'){
            this.muestraAbout();
            return;
        }
        else{
            document.querySelector('aside').className='';
        }
        var toInyect = this.vista.keyTemplates[oEv.target.name].querySelector('template');
        if(toInyect){
            this.vista.articleHtml.innerHTML=toInyect.innerHTML;
        }
        else{
            this.vista.articleHtml.innerHTML="<h2>Ocurrio un error cargando el template</h2>";
        }
        this.vista.articleHtml.innerHTML=toInyect.innerHTML;

    }
    /*
        Esta funcion es la encargada de crear el array asociativo boton-template. Los templates deben tener como título el id
        del boton al que hacen referencia sin el prefijo "btn".
        En caso de que exista algún botón sin que ningún template lo referencie se le asociará el primer template
        cargado. La clave del array es el id del botón y el valor es el template.
        Para añadir un boton y su respectivo template deben añadirse en el nav un btnEJEMPLO y linkear un template en el index
        con titulo EJEMPLO.
        Ej: clave = btnAbout valor = About (templates/about.html)
    */
    bindTemplates(button){
        this.vista.templates.forEach( (temp) => {
            if(temp.title == button.name.substring(3)){
                this.vista.keyTemplates[button.name]=temp.import;
            }
        })
        if (!this.vista.keyTemplates[button.name]){
            this.vista.keyTemplates[button.name]=this.vista.templates[0].import;
        }
    }
    /*
        Esta función es la encargada de manejar los eventos en el formulario. Si se pulsa enviar el formulario
        en el apartado about esta es la función encargada de manejar dicho evento. Comprueba que los datos introducidos
        sean correctos, y en el caso contrario pone el color del campo no válido en rojo. 
        Si todos los datos introducidos son correctos rellena el objeto this.form obteniendo los valores del documento.
        Una vez relleno el objeto form es encapsulado en JSON y guardado en localStorage.
    */
    botonFormulario(oEv){
        oEv.preventDefault();
        let nombre=document.getElementById("Nombre").value;
        let email=document.getElementById("Email").value;
        let comentario=document.getElementById("Comentario").value;
        let esqui=document.getElementById("Preferencia_esqui").checked;
        let snow=document.getElementById("Preferencia_snow").checked;
        let valid=true;
        let preferencia;
        if(comentario.length < 5){
            document.getElementById("Comentario").placeholder="Mínimo 5 caracteres";
            document.getElementById("label_Comentario").className='required';
            valid=false;
        }
        else{
            document.getElementById("label_Comentario").className='';
        }
        (email.length <5) ? document.getElementById("label_Email").className='required' : document.getElementById("label_Email").className='';
        (nombre.length < 3)  ? document.getElementById("label_Nombre").className='required' :  document.getElementById("label_Nombre").className='';

        if(!esqui && !snow){
            document.getElementById("label_Preferencia").className="required";
            valid=false;
        }
        else{
            document.getElementById("label_Preferencia").className="";
        }
        if(valid && email.length>=5 && nombre.length>=3){
            this.form.nombre=nombre;
            this.form.email=email;
            (esqui) ? preferencia="Esqui" : preferencia="Snow";
            this.form.preferencia=preferencia;
            this.form.comentario=comentario;
            localStorage.setItem("form", JSON.stringify(this.form))
            this.muestraForm();
        }
    }
    /*
        Esta función muestra el formulario ya validado al usuario. EL usuario tendrá dos opciones:
            1) Enviar el formulario. En este caso se simula que el formulario es enviado al servidor. El objeto form
            se elimina de localstorage.
            2) Editar el formulario. En este caso vuelve a la página about que rellenará automáticamente los campos con
            los valores que había introducido el usuario. El usuario puede editar los datos y volver a enviar el formulario.

    */
    muestraForm(){
        var toInyect;
        if(localStorage.getItem("form")){
            this.vista.templates.forEach( (temp) => {
                if(temp.title == "Form"){
                    toInyect =temp.import.querySelector('template');
                }
                if(toInyect){
                    this.vista.articleHtml.innerHTML=toInyect.innerHTML;
                    document.getElementById('btnEditar').addEventListener('click',this.accionForm.bind(this),true);
                    document.getElementById('btnEnviar').addEventListener('click',this.accionForm.bind(this),true);
                    document.getElementById('showNombre').innerHTML+=this.form.nombre;
                    document.getElementById('showEmail').innerHTML+=this.form.email;
                    document.getElementById('showPreferencia').innerHTML+=this.form.preferencia;
                    document.getElementById('showComentario').value=this.form.comentario;
                }
            })
           

        }
    }
    /*
        Esta función muestra la página about al usuario. Tiene un tratamiento diferente al resto de apartados
        debido a que es necesario llevar a cabo varias acciones:
            1) Ocultar el aside
            2) Inyectar el html correspondiente a about.html (acción común al resto de templates)
            3) Bindear el botón enviar que se encuentra al final del formulario.
            4) Rellenar el formulario. En el caso de que el usuario hubiera rellenado el formulario anteriormente
            pero hubiera decidido editarlo la función rellenaForm() rellena automáticamente el formulario accediendo
            a LocalStorage
    */
    muestraAbout(){
        document.querySelector('aside').className='oculto';
        var toInyect = this.vista.keyTemplates['btnAbout'].querySelector('template');
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
        this.rellenaForm();
    }
    /*
        Esta es la función manejadora de los botones de la página que muestra el formulario validado.
        Las únicas opciones que hay son:
            Editar: se vuelve a la página about, donde se mostrará el formulario tal y como lo había rellenado
            el usuario.
            Enviar: se simula que el formulario es definitivo y se envía al servidor. El objeto form se elimina de localStorage.
            se vuelve a mostrar la página about, esta vez sin rellenar ya que el objeto "form" de localstorage no existirá.
    */
    accionForm(oEv){
        if(oEv.target.id=="btnEditar"){
            this.muestraAbout();
        }
        if(oEv.target.id=="btnEnviar"){
            localStorage.removeItem("form");
            this.muestraAbout();
        }
    }
    /*  
        Esta función es la encargada de autorellenar el formulario de la página about en el caso de que el usuario quiera
        editar sus respuestas. Siempre que se muestra el about se llama a esta función, pero solo autorellenará los campos
        en el caso de que exista el objeto "form" de localstorage.
    */
    rellenaForm(){
        let json_formObject = localStorage.getItem("form");
        if(json_formObject){
            let formObject = JSON.parse(json_formObject);
            document.getElementById('Email').value=formObject.email;
            document.getElementById('Nombre').value=formObject.nombre;
            document.getElementById('Comentario').value=formObject.comentario;
            if(formObject.preferencia == "Snow"){
                document.getElementById('Preferencia_snow').checked=true;
            }
            else{
                document.getElementById('Preferencia_esqui').checked=true;
            }
        }
    }
}
