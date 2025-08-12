export function atividade(array, indice) {
    if (indice < 0 || indice >= array.length) {
        throw new Error("Índice inválido.");
    }
    return array[indice];
}

