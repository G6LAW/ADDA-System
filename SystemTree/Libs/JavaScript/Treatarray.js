//criado em 04/05/2022 por Giovani Imperatrice
//última alteração em 05/05/2022 por Giovani Imperatrice
//? Objeto de métodos relacionados a tratamento de arrays
export const Treatarray = {
    //?old function transpose
    transpose: function(matrix) {
        return matrix.reduce((prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i])), []);
    },
    //?old function quantDeX
    quantDeX: function(arr, value){
        return arr.filter(x => x==value).length;
    },
    //?old function comareArrays
    compareArrays: function(a,b) {
        if (a.length == b.length) {
            for (let i = 0; i < a.length; i++) {
                r = false;
                if (a[i] !== b[i]) { break } else {r = true };   
            };
        } else {r = false};
        return r;
    },
    //?old function rotate
    rotate: function( array , times ){
        /** //?? INFORMAÇÕES SOBRE A FUNÇÃO: rotate ////////////////////////////////////////////////////////
        * Criado em: 13/04/2022
        * ?-----------------------------------------------------------------------------------------------------
        * ? Função: rotate.
        * ? Descrição: Rotação de Arrays 1D.
        * ? @array: É o array que será rotacionado.
        * ? @times: É a fase de deslocamento. Valores positivos empurram o array para a esquerda e valores
        * ? negativos empurram o array para a direita.
        * ? ----------------------------------------------------------------------------------------------------
        * * EX: array: [ 0, 0, 1, 0, 0, 0], times: 2 --> [ 1, 0, 0, 0, 0, 0].
        */ /////////////////////////////////////////////////////////////////////////////////////////////////////
        function mod(x, m) {
            return ((x % m) + m) % m;
        };
        let timecliped = mod(times,array.length);
        let tmp = array.slice();
        let left = tmp.splice(0,timecliped);
        tmp.push(left);
        return tmp.flat();
    },
    //?old Agrupar
    group: function(A, B, C) {
        //Agrupa um array de forma diferente do concat e afins..
        let D = [];
        for (let i = 0; i < A.length; i++) {
            if (C == null) {
                D[i] = A[i]+B[i];
            } else {
                D[i] = A[i]+B[i]+C[i];
            };
        };
        return D;
      }
};

