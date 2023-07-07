`use strict` 
class Calculadora {
  constructor(previoOperadorTextElement, siguienteOperadorTextElement) {
    this.previoOperadorTextElement = previoOperadorTextElement;
    this.siguienteOperadorTextElement = siguienteOperadorTextElement;
    this.borrar();
  }

  borrar() {
    this.siguienteOperador = "";
    this.previoOperador = "";
    this.operacion = undefined;
  }

  del() {
    this.siguienteOperador = this.siguienteOperador.toString().slice(0, -1);
  }

  escribirNumero(numero) {
    if (numero === "." && this.siguienteOperador.includes(".")) return;
    this.siguienteOperador = this.siguienteOperador.toString() + numero.toString();
  }

  hacerOperacion(operacion) {
    if (this.siguienteOperador === "") return;
    if (this.previoOperador !== "") {
      this.calculo();
    }
    this.operacion = operacion;
    this.previoOperador = this.siguienteOperador;
    this.siguienteOperador = "";
  }

  calculo() {
    let cuenta;
    const primero = parseFloat(this.previoOperador);
    const segundo = parseFloat(this.siguienteOperador);
    if (isNaN(primero) || isNaN(segundo)) return;
    switch (this.operacion) {
      case "+":
        cuenta = primero + segundo;
        break;
      case "-":
        cuenta = primero - segundo;
        break;
      case "*":
        cuenta = primero * segundo;
        break;
      case "/":
        cuenta = primero / segundo;
        break;
      default:
        return;
    }
    this.siguienteOperador = cuenta;
    this.operacion = undefined;
    this.previoOperador = "";
  }

  getPantallaNumero(numero) {
    const stringNumero = numero.toString();
    const digitoEntero = parseFloat(stringNumero.split(".")[0]);
    const digitoDecimal = stringNumero.split(".")[1];
    let pantallaEntera;
    if (isNaN(digitoEntero)) {
      pantallaEntera = "";
    } else {
      pantallaEntera = digitoEntero.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (digitoDecimal != null) {
      return `${pantallaEntera}.${digitoDecimal}`;
    } else {
      return pantallaEntera;
    }
  }

  actulizarPantalla() {
    this.siguienteOperadorTextElement.innerText = this.getPantallaNumero(this.siguienteOperador);
    if (this.operacion != null) {
      this.previoOperadorTextElement.innerText = `${this.getPantallaNumero(
        this.previoOperador
      )} ${this.operacion}`;
    } else {
      this.previoOperadorTextElement.innerText = "";
    }
  }
}

const numeroBoton = document.querySelectorAll("[data-numero]");
const operacionBoton = document.querySelectorAll("[data-operacion]");
const igualBoton = document.querySelector("[data-igual]");
const delBoton = document.querySelector("[data-del]");
const borrarBoton = document.querySelector("[data-borrar]");
const previoOperadorTextElement = document.querySelector(
  "[data-previo-operador]"
);
const siguienteOperadorTextElement = document.querySelector(
  "[data-siguiente-operador]"
);

const calculadora = new Calculadora(
  previoOperadorTextElement,
  siguienteOperadorTextElement
);

numeroBoton.forEach((button) => {
  button.addEventListener("click", () => {
    calculadora.escribirNumero(button.innerText);
    calculadora.actulizarPantalla();
  });
});

operacionBoton.forEach((button) => {
  button.addEventListener("click", () => {
    calculadora.hacerOperacion(button.innerText);
    calculadora.actulizarPantalla();
  });
});

igualBoton.addEventListener("click", (button) => {
  calculadora.calculo();
  calculadora.actulizarPantalla();
});

borrarBoton.addEventListener("click", (button) => {
  calculadora.borrar();
  calculadora.actulizarPantalla();
});

delBoton.addEventListener("click", (button) => {
  calculadora.del();
  calculadora.actulizarPantalla();
});
