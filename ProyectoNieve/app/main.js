export class Main{
    constructor(){
        console.log("Cargado");
        this.vista = {
            botonesMenu: document.querySelectorAll('nav ul li a'),
            articleHtml: document.querySelector('article'), 
            aImports: document.querySelectorAll('link[rel="import"]'),
            oImports: {}
        }
        // Manejador de eventos del menu
        this.vista.botonesMenu.forEach( (item) => {
            item.addEventListener('click',this.menuItems.bind(this),true);
            console.log("BInd");
        })
    }
    menuItems(oEv) {
        oEv.preventDefault();
        console.dir(oEv.target.id);
    }
}

