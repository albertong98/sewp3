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
document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if(isFinite(keyName)) calculadora.pantalla(keyName);
    else if(keyName in operators) calculadora.anadirOperando(keyName);
    else
        switch(keyName.toLowerCase()){
            case '.':
                calculadora.pantalla('.');
                break;
            case 'c':
                calculadora.limpiar();
                break;
            case 'delete':
                calculadora.borrar();
                break;
            case 'tab':
                calculadora.masmenos();
                break;
            case 's':
                calculadora.sqrt();
                break;
            case '%':
                calculadora.porcentaje();
                break;
            case 'm':
                calculadora.mrc();
                break;
            case 'arrowright':
                calculadora.mmas();
                break;
            case 'arrowleft':
                calculadora.mmenos();
                break;
            case 't':
                calculadora.tangente();
                break;
            case '^':
                calculadora.elevarA();
                break;
            case 'x':
                calculadora.elevarA2();
                break;
            case 'd':
                calculadora.elevar10A();
                break;
            case 'l':
                calculadora.logaritmo();
                break;
            case 'backspace':
                calculadora.borrarUno();
                break;
            case 'f':
                calculadora.callFactorial();
                break;
            case 'e':
                calculadora.exponencial();
                break;
            case 'o':
                calculadora.coseno();
                break;
            case 'n':
                calculadora.seno();
                break;
            case 'enter':
                calculadora.enter();
                break;
            default:
                break;
        }
});
const operators = ['+','-','/','*'];
let calculadora = new CalculadoraRPN();