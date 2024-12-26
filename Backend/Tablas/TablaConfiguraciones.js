class TablaConfiguraciones{

    constructor(){
        // valores por default
        this.fondo = 'yellow';
        this.fuente = 'white';
        this.forma = 'circle';
    }


    cambiarFondo(fondo){
        if(!fondo){
            this.fondo = 'red';
        }
        this.fondo = fondo;
    }

    cambiarForma(forma){
        this.forma = forma;
    }

    cambiarFuente(fuente){
        this.fuente = fuente;
    }


}

module.exports = TablaConfiguraciones;