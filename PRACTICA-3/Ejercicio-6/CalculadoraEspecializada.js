"use strict";
class CalculadoraRPN {
    constructor() {
        this.pila = new Array();
    }
    pantalla(digito) {
        let pantalla = document.getElementById("pantalla");
        
        if (pantalla.value === '0') pantalla.value = digito; 
        else pantalla.value += digito;
    }

    anadirOperando(operando) {
        if (this.pila.length >= 2) {
            const primerValor = this.pila.pop();
            const segundoValor = this.pila.pop();
            const resultado = eval(primerValor + operando + segundoValor);
            this.pila.push(resultado);
            document.getElementById("resultado").value = resultado;
        } else {
            alert('Primero añade los numeros y luego el operando');
        }
    }

    anadirNumero(numero) {
        if (!Number.isNaN(numero)) this.pila.push(numero);
        else alert('El caracter que estas intentando añadir no se corresponde a un número');
    }

    enter() {
        this.numero = document.getElementById("pantalla").value;
        this.anadirNumero(this.numero);
        document.getElementById("pantalla").value = 0;
    }

    seno(){
        if(this.pila.length >= 1) this.calcularSeno(this.pila.pop());
        else this.error();
    }

    coseno(){
        if(this.pila.length >= 1) this.introducir(Math.cos(this.pila.pop()));
        else this.error();
    }

    tangente(){
        if(this.pila.length >= 1) this.introducir(Math.tan(this.pila.pop()));
        else this.error();
    }

    calcularFactorial(){
        if(this.pila.length >= 1) this.introducir(this.factorial(this.pila.pop()));
        else this.error();
    }

    factorial(n){
        if(n < 0) return -1;
        if(n == 0) return 1;
        return n * this.factorial(n-1);
    }

    exponencial(){
        if(this.pila.length >= 1) this.introducir(Math.exp(this.pila.pop()));
        else this.error();  
    }

    introducir(res){
        document.getElementById("resultado").value = res;
        document.getElementById("pantalla").value = 0;
        this.pila.push(this.res);
    }

    error(){
        alert('No hay elementos en la pila para realizar la operación.');
    }

    limpiar() {
        this.pila = [];
        document.getElementById("pantalla").value = 0;
        document.getElementById("resultado").value = 0;
    }
}
class CalculadoraEspecializada extends CalculadoraRPN{
    gramos = 0;
    min = 0;
    minFlag = false;
    gFlag = false;

    actividades = new Map([
        ["correr",9.2],
        ["bici", 6.4],
        ["caminar",4],
        ["patinar",10],
        ["nadar",12.4],
        ["baile",13.3],
        ["escalada",17.5],
        ["futbol",7],
        ["tenis", 9],
        ["gimnasio",7.4]
    ]);
    comidas = new Map([
        ["manzana",0.55],
        ["arroz", 1.29],
        ["pasta",3.47],
        ["pollo",1.61],
        ["jamon",1.36],
        ["lechuga",0.125],
        ["ternera",2.29],
        ["merluza",0.72],
        ["salmon",1.82],
        ["setas",0.26]
    ]);
    setGramos(gramos){
        this.gramos = gramos;
        this.gFlag = true;
        document.getElementById("pantalla").value = gramos + " g";
    }
    setMinutos(min){
        this.min = min;
        this.minFlag = true;
        document.getElementById("pantalla").value = min + " min";
    }
    addComida(comida){
        if(this.gFlag){
            let kcal = this.comidas.get(comida)*this.gramos
            document.getElementById("pantalla").value = kcal + " kcal";
            this.anadirNumero(kcal);
            this.gFlag = false;
        }
        else if(this.minFlag) alert('Debe seleccionar una actividad.');
        else alert('Debe seleccionar primero la cantidad de comida');
    }
    addActividad(actividad){
        if(this.minFlag){
            let kcal = (-1)*this.actividades.get(actividad)*this.min
            document.getElementById("pantalla").value = kcal + " kcal";
            this.anadirNumero((-1)*this.actividades.get(actividad)*this.min);
            this.minFlag = false;
        } 
        else if(this.gFlag)  alert('Debe seleccionar una comida.');
        else alert('Debe seleccionar primero la duracion de la actividad');
    }
    calcularBalance(){
        this.anadirOperando('+');
    }
    calcularIMC(){
        let peso = document.getElementById("peso").value;
        let altura = document.getElementById("altura").value;
        
        if(peso === 0 || peso === undefined || peso === null || peso < 0) alert('Introduzca su peso');
        else if(altura === 0 || altura === undefined || altura === null || altura < 0) alert('Introduzca su altura');
        else document.getElementById("imc").value = peso / (altura*altura);
    }
}
let calculadora = new CalculadoraEspecializada();