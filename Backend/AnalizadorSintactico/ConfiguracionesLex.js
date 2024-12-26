class ConfiguracionesLex{

    // valores por default por si las moscas XD
    constructor(){
        this.fondo = "#f3ff00";
        this.fuente = "#000000";
        this.forma = "box"; 
        this.tipoFuente = "Arial";
        this.tipoConfiguracion = "";
    }

    cambiarTipoComfiguracion(nuevoTipo){
        this.tipoConfiguracion = nuevoTipo;
    }

    cambiarFondo(nuevoFondo){
        this.fondo = nuevoFondo;
    }

    cambiarFuente(nuevaFuente){
        this.fuente = nuevaFuente;
    }

    cambiarForma(nuevaForma){
        this.forma = nuevaForma;
    }

    cambiarTipoFuente(nuevaFuente){
        this.tipoFuente = nuevaFuente;
    }
}

module.exports = ConfiguracionesLex;