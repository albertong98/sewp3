"use strict";
class CalculadoraMilan{

    constructor(){
        this.mrcValue=0;
        this.pantalla='';
        this.calculado = false;
    }

    colocar()
    {
        document.getElementById('expresion').value = this.pantalla;
    }

    poner(expr)
    {
        if(this.pantalla==='Error' || this.pantalla==='NaN')
        {
            this.pantalla='';
            this.calculado=false;
        }

        if(this.calculado)
        {
            this.pantalla='';
            this.calculado=false;
        }

        this.pantalla += expr.toString();
        this.colocar();
    }
    punto(){
        if (!this.pantalla.includes(".")) {
            this.pantalla += ".";
        }
        this.colocar();
    }
    suma(){
        this.poner('+');
    }
    resta(){
        this.poner('-');
    }
    division(){
        this.poner('/');
    }
    multiplicacion(){
        this.poner('*');
    }
    mrc(){
        this.pantalla=this.mrcValue;
        this.calculado=true;
        this.colocar();
    }
    mmas(){
        this.mrcValue += eval(this.pantalla);
        this.borrar();
    }
    mmenos(){
        this.mrcValue -= eval(this.pantalla);
        this.borrar();
    }
    limpiar(){
        this.pantalla='';
        this.mrcValue = 0;
        this.colocar();
    }
    borrar()
    {
        this.pantalla='';
        this.colocar();
    }
    igual()
    {
        try
        {
            this.pantalla=eval(this.pantalla);
            this.calculado = true;
            this.colocar();
        }
        catch(err)
        {
            this.error();
        }
        this.mrcValue=0;
    }
    porcentaje(){
             if(this.pantalla.includes("*")) this.tantoPorCiento();
        else if(this.pantalla.includes("/")) this.porcentajeDe();
        else if(this.pantalla.includes("+")) this.incrementarPorcentaje();   
        else if(this.pantalla.includes("-")) this.decrementarPorcentaje();
        else this.error();
    }
    tantoPorCiento(){
        this.pantalla += "/100";
        this.igual();
    }
    porcentajeDe(){
        this.pantalla += "*100";
        this.igual();
    }
    incrementarPorcentaje(){
        let n = Number.parseFloat(this.pantalla.split("+")[0]);
        let p = Number.parseFloat(this.pantalla.split("+")[1]);
        let r = n + (n*p/100);
        this.pantalla = r;
        this.calculado = true;
        this.colocar();
    }
    decrementarPorcentaje(){
        let n = Number.parseFloat(this.pantalla.split("-")[0]);
        let p = Number.parseFloat(this.pantalla.split("-")[1]);
        let r = n - (n*p/100);
        this.pantalla = r;
        this.calculado = true;
        this.colocar();
    }
    sqrt(){
        this.pantalla = Math.sqrt(Number.parseFloat(this.pantalla));
        this.calculado = true;
        this.colocar();
    }
    masmenos(){
        let n = Number.parseFloat(this.pantalla);
        this.pantalla = (n * (-1)).toString();
        this.colocar();
    }
    error(){
        this.pantalla = 'Error';
        this.colocar();
    }

}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if(isFinite(keyName) || keyName in operators) calculadora.poner(keyName);
    else
        switch(keyName.toLowerCase()){
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
            default:
                break;
        }
});
const operators = ['+','-','/','*','.'];
let calculadora = new CalculadoraMilan();


