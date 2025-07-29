import { somar } from '../src/somar';

describe('funcao somar', () => {
    test('espero que a soma de dois numeros inteiros esteja correta', () =>{
        expect(somar(1, 2)).toBe(3);
    });

    test('espero que a soma de dois decimais inteiros esteja correta', () =>{
        expect(somar(1.5, 2.5)).toBe(4);
    });

    test('espero que a soma de dois negativos inteiros esteja correta', () =>{
        expect(somar(-2, -3)).toBe(-5);
    });

    test('espero que ao tentar somar letas retorne uma mensagem de erro', () =>{
        expect(somar(a, b)).toBe("Erro ao somar");
    });

    test('espero que ao tentar somar objetos retorne uma mensagem de erro', () =>{
        expect(somar({}, {})).toBe("Erro ao somar");
    });

    test('espero que ao tentar somar arrays retorne uma mensagem de erro', () =>{
        expect(somar([], [])).toBe("Erro ao somar");
    });

    test('espero que ao tentar somar arrays e numeros retorne uma mensagem de erro', () =>{
        expect(somar([], 8)).toBe("Erro ao somar");
    });
});