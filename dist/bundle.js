/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./ProyectoNieve/app/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ProyectoNieve/app/app.js":
/*!**********************************!*\
  !*** ./ProyectoNieve/app/app.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./ProyectoNieve/app/main.js\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/style.scss */ \"./ProyectoNieve/scss/style.scss\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\n\r\n\r\n(function () {\r\n    document.addEventListener(\"DOMContentLoaded\", () => new _main_js__WEBPACK_IMPORTED_MODULE_0__[\"Main\"](), false)\r\n})()\n\n//# sourceURL=webpack:///./ProyectoNieve/app/app.js?");

/***/ }),

/***/ "./ProyectoNieve/app/main.js":
/*!***********************************!*\
  !*** ./ProyectoNieve/app/main.js ***!
  \***********************************/
/*! exports provided: Main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Main\", function() { return Main; });\nclass Main{\r\n    constructor(){\r\n        this.vista = {\r\n            botonesMenu: document.querySelectorAll('a'),          //Botones del menu\r\n            botonEnviar: null,                                              //Boton de enviar formulario. No se hace el selector hasta q se pulsa about\r\n            articleHtml: document.querySelector('main'),\r\n            templates: document.querySelectorAll('link[rel=\"import\"]'),     //Templates importados\r\n            keyTemplates: {},   //Array indexada, clave= id del boton, valor= template\r\n            navExpand: document.querySelector('#panel_expand'),    //Div que depliega el menu   \r\n            botonPlus: document.querySelector('#expand'),\r\n            botonLess: document.querySelector('#contract')\r\n        }\r\n\r\n        this.vista.botonLess.style=\"display: none;\" \r\n        // Manejador de eventos del menu nav\r\n        this.vista.botonesMenu.forEach( (item) => {\r\n            item.addEventListener('click',this.menuItems.bind(this),true);\r\n            this.bindTemplates(item);\r\n        })\r\n        this.vista.navExpand.addEventListener('click',this.navExpand.bind(this),true);\r\n        \r\n               //form guardará los valores del form\r\n        this.form={\r\n            nombre: null,\r\n            email: null,\r\n            preferencia: null,\r\n            comentario: null\r\n        }\r\n        this.menuItems();\r\n    }\r\n    /*\r\n         Si un botón es pulsado carga la template correspondiente a su valor. En el caso de no ser about se realizan las siguientes acciones:\r\n            1) Pone el aside visible por si se viene de \"about\".\r\n            2) Selecciona del array asociativo el template correspondiente a su id. Este array ha sido previamente creado en la función bindTemplates\r\n            3) Inyecta en el article el html del template correspondiente.\r\n    */\r\n\r\n    menuItems(oEv) {\r\n        //Caso default\r\n        if(!oEv){\r\n            var toInyect = this.vista.keyTemplates[\"btnPuertoDeNavacerrada\"].querySelector('template');\r\n            this.vista.articleHtml.innerHTML=toInyect.innerHTML;\r\n            return;\r\n        }\r\n        oEv.preventDefault();\r\n        //El template about tiene un tratamiento especial, por lo que si el boton pulsado es about se llama a la función muestraAbout()\r\n        if(oEv.target.id=='btnAbout'){\r\n            this.muestraAbout();\r\n            return;\r\n        }\r\n        else{\r\n            document.querySelector('aside').className='';\r\n        }\r\n        var toInyect = this.vista.keyTemplates[oEv.target.id].querySelector('template');\r\n        if(toInyect){\r\n            this.vista.articleHtml.innerHTML=toInyect.innerHTML;\r\n        }\r\n        else{\r\n            this.vista.articleHtml.innerHTML=\"<h2>Ocurrio un error cargando el template</h2>\";\r\n        }\r\n        //this.vista.articleHtml.innerHTML=toInyect.innerHTML;\r\n        //document.getElementById(\"a\").style=\"display: none\"\r\n    }\r\n    /*\r\n        Esta funcion es la encargada de crear el array asociativo boton-template. Los templates deben tener como título el nombre\r\n        del boton al que hacen referencia sin el prefijo \"btn\".\r\n        En caso de que exista algún botón sin que ningún template lo referencie se le asociará el primer template\r\n        cargado. La clave del array es el id del botón y el valor es el template.\r\n        Para añadir un boton y su respectivo template deben añadirse en el nav un btnEJEMPLO y linkear un template en el index\r\n        con titulo EJEMPLO.\r\n        Ej: clave = btnAbout valor = About (templates/about.html)\r\n    */\r\n    bindTemplates(button){\r\n        this.vista.templates.forEach( (temp) => {\r\n            if(temp.title == button.id.substring(3)){\r\n                this.vista.keyTemplates[button.id]=temp.import;\r\n            }\r\n        })\r\n        if (!this.vista.keyTemplates[button.id]){\r\n            this.vista.keyTemplates[button.id]=this.vista.templates[0].import;\r\n        }\r\n    }\r\n    /*\r\n        Esta función es la encargada de manejar los eventos en el formulario. Si se pulsa enviar el formulario\r\n        en el apartado about esta es la función encargada de manejar dicho evento. Comprueba que los datos introducidos\r\n        sean correctos, y en el caso contrario pone el color del campo no válido en rojo. \r\n        Si todos los datos introducidos son correctos rellena el objeto this.form obteniendo los valores del documento.\r\n        Una vez relleno el objeto form es encapsulado en JSON y guardado en localStorage.\r\n    */\r\n    botonFormulario(oEv){\r\n        oEv.preventDefault();\r\n        let nombre=document.getElementById(\"Nombre\").value;\r\n        let email=document.getElementById(\"Email\").value;\r\n        let comentario=document.getElementById(\"Comentario\").value;\r\n        let esqui=document.getElementById(\"Preferencia_esqui\").checked;\r\n        let snow=document.getElementById(\"Preferencia_snow\").checked;\r\n        let valid=true;\r\n        let preferencia;\r\n        let i;\r\n        if(comentario.length < 5){\r\n            document.getElementById(\"Comentario\").placeholder=\"Mínimo 5 caracteres\";\r\n            document.getElementById(\"label_Comentario\").className='required';\r\n            valid=false;\r\n        }\r\n        else{\r\n            document.getElementById(\"label_Comentario\").className='';\r\n        }\r\n        (email.length <5) ? document.getElementById(\"label_Email\").className='required' : document.getElementById(\"label_Email\").className='';\r\n        (nombre.length < 3)  ? document.getElementById(\"label_Nombre\").className='required' :  document.getElementById(\"label_Nombre\").className='';\r\n        \r\n        for (i=1; i<email.length-1; i++){\r\n            if(email[i] == '@' && email.length>=5)\r\n                break;\r\n        }\r\n        if(i==email.length-1){ //No ha encontrado ninguna arroba en el correo\r\n            document.getElementById(\"label_Email\").className='required';\r\n            valid=false;\r\n\r\n        }\r\n        if(!esqui && !snow){\r\n            document.getElementById(\"label_Preferencia\").className=\"required\";\r\n            valid=false;\r\n        }\r\n        else{\r\n            document.getElementById(\"label_Preferencia\").className=\"\";\r\n        }\r\n        if(valid && email.length>=5 && nombre.length>=3){\r\n            this.form.nombre=nombre;\r\n            this.form.email=email;\r\n            (esqui) ? preferencia=\"Esqui\" : preferencia=\"Snow\";\r\n            this.form.preferencia=preferencia;\r\n            this.form.comentario=comentario;\r\n            localStorage.setItem(\"form\", JSON.stringify(this.form))\r\n            this.muestraForm();\r\n        }\r\n    }\r\n    /*\r\n        Esta función muestra el formulario ya validado al usuario. EL usuario tendrá dos opciones:\r\n            1) Enviar el formulario. En este caso se simula que el formulario es enviado al servidor. El objeto form\r\n            se elimina de localstorage.\r\n            2) Editar el formulario. En este caso vuelve a la página about que rellenará automáticamente los campos con\r\n            los valores que había introducido el usuario. El usuario puede editar los datos y volver a enviar el formulario.\r\n\r\n    */\r\n    muestraForm(){\r\n        var toInyect;\r\n        if(localStorage.getItem(\"form\")){\r\n            this.vista.templates.forEach( (temp) => {\r\n                if(temp.title == \"Form\"){\r\n                    toInyect =temp.import.querySelector('template');\r\n                }\r\n                if(toInyect){\r\n                    this.vista.articleHtml.innerHTML=toInyect.innerHTML;\r\n                    document.getElementById('btnEditar').addEventListener('click',this.accionForm.bind(this),true);\r\n                    document.getElementById('btnEnviar').addEventListener('click',this.accionForm.bind(this),true);\r\n                    document.getElementById('showNombre').innerHTML+=this.form.nombre;\r\n                    document.getElementById('showEmail').innerHTML+=this.form.email;\r\n                    document.getElementById('showPreferencia').innerHTML+=this.form.preferencia;\r\n                    document.getElementById('showComentario').value=this.form.comentario;\r\n                }\r\n            })\r\n           \r\n\r\n        }\r\n    }\r\n    /*\r\n        Esta función muestra la página about al usuario. Tiene un tratamiento diferente al resto de apartados\r\n        debido a que es necesario llevar a cabo varias acciones:\r\n            1) Ocultar el aside\r\n            2) Inyectar el html correspondiente a about.html (acción común al resto de templates)\r\n            3) Bindear el botón enviar que se encuentra al final del formulario.\r\n            4) Rellenar el formulario. En el caso de que el usuario hubiera rellenado el formulario anteriormente\r\n            pero hubiera decidido editarlo la función rellenaForm() rellena automáticamente el formulario accediendo\r\n            a LocalStorage\r\n    */\r\n    muestraAbout(){\r\n        document.querySelector('aside').className='oculto';\r\n        var toInyect = this.vista.keyTemplates['btnAbout'].querySelector('template');\r\n        if(toInyect){\r\n            this.vista.articleHtml.innerHTML=toInyect.innerHTML;\r\n        }\r\n        else{\r\n            this.vista.articleHtml.innerHTML=\"<h2>Ocurrio un error cargando el template</h2>\";\r\n        }\r\n        this.vista.articleHtml.innerHTML=toInyect.innerHTML;\r\n        this.vista.botonEnviar=document.querySelector('button');\r\n        if(this.vista.botonEnviar){ //Si existe boton enviar (about) se añade el event listener\r\n            this.vista.botonEnviar.addEventListener('click', this.botonFormulario.bind(this));\r\n        }\r\n        this.rellenaForm();\r\n    }\r\n    /*\r\n        Esta es la función manejadora de los botones de la página que muestra el formulario validado.\r\n        Las únicas opciones que hay son:\r\n            Editar: se vuelve a la página about, donde se mostrará el formulario tal y como lo había rellenado\r\n            el usuario.\r\n            Enviar: se simula que el formulario es definitivo y se envía al servidor. El objeto form se elimina de localStorage.\r\n            se vuelve a mostrar la página about, esta vez sin rellenar ya que el objeto \"form\" de localstorage no existirá.\r\n    */\r\n    accionForm(oEv){\r\n        if(oEv.target.id==\"btnEditar\"){\r\n            this.muestraAbout();\r\n        }\r\n        if(oEv.target.id==\"btnEnviar\"){\r\n            localStorage.removeItem(\"form\");\r\n            this.muestraAbout();\r\n        }\r\n    }\r\n    /*  \r\n        Esta función es la encargada de autorellenar el formulario de la página about en el caso de que el usuario quiera\r\n        editar sus respuestas. Siempre que se muestra el about se llama a esta función, pero solo autorellenará los campos\r\n        en el caso de que exista el objeto \"form\" de localstorage.\r\n    */\r\n    rellenaForm(){\r\n        let json_formObject = localStorage.getItem(\"form\");\r\n        if(json_formObject){\r\n            let formObject = JSON.parse(json_formObject);\r\n            document.getElementById('Email').value=formObject.email;\r\n            document.getElementById('Nombre').value=formObject.nombre;\r\n            document.getElementById('Comentario').value=formObject.comentario;\r\n            if(formObject.preferencia == \"Snow\"){\r\n                document.getElementById('Preferencia_snow').checked=true;\r\n            }\r\n            else{\r\n                document.getElementById('Preferencia_esqui').checked=true;\r\n            }\r\n        }\r\n    }\r\n\r\n    navExpand(oEv){\r\n        \r\n        if(this.vista.botonPlus.style.display=='none'){\r\n            document.getElementById('nav_responsive').style=\"display: none;\"\r\n            this.vista.botonPlus.style=\"display: inherit;\"\r\n            this.vista.botonLess.style=\"display: none;\" \r\n        }\r\n        else{\r\n            document.getElementById('nav_responsive').style=\"display: inherit;\"\r\n            this.vista.botonPlus.style=\"display: none;\"\r\n            this.vista.botonLess.style=\"display: inherit;\" \r\n        }\r\n\r\n    }\r\n}\n\n//# sourceURL=webpack:///./ProyectoNieve/app/main.js?");

/***/ }),

/***/ "./ProyectoNieve/scss/style.scss":
/*!***************************************!*\
  !*** ./ProyectoNieve/scss/style.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./ProyectoNieve/scss/style.scss?");

/***/ })

/******/ });