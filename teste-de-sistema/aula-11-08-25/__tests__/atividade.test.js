import { atividade } from '../src/atividade';

describe('atividade', () => {
    test('Retorna correto', () => {
        const array = [1, 3, 5, 7, 8];
        expect(atividade(array, 3)).toBe(7);
    });

    test('Erro para índice negativo', () => {
        const array = [1, 3, 5, 7, 8];
        expect(() => atividade(array, -1)).toThrow("Índice inválido.");
    });

    test('Erro para índice maior', () => {
        const array = [1, 3, 5, 7, 8];
        expect(() => atividade(array, 5)).toThrow("Índice inválido.");
    });
});