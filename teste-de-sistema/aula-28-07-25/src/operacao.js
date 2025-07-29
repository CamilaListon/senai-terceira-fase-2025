export function excecutarOperacao(a, b, operacao) {
    if(typeof a !== "number" || typeof b !== "number"){
        return"Erro"
    }
    if(operacao == "soma"){
        return a + b
    }
    else if(operacao == "multiplicacao"){
        return a * b
    }
    else if (operacao == "divisao"){
        return a / b 
    }
    else if (operacao == "subtracao"){
        return a - b 
    }
    else{
        return "Erro: operação não existe"
    }
}

console.log(excecutarOperacao(2,2, "soma"));
console.log(excecutarOperacao(2,2, "multiplicacao"));
console.log(excecutarOperacao(2,2, "divisao"));
console.log(excecutarOperacao(2,2, "subtracao"));