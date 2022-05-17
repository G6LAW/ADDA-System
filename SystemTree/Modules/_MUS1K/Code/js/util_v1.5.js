//!-IMPORTS:-----------------------------------------------------------------------
import {Music} from "./Music.js";
import {Treatarray} from "../../../../Libs/JavaScript/Treatarray.js";
import {Mymath} from "../../../../Libs/JavaScript/Mymath.js";
//!-CONSTANTES:--------------------------------------------------------------------

//!-FUNÇOES DE APOIO---------------------------------------------------------------

//!-FUNÇOES MUSICAIS----------------------------------------------------------------------------------


//! daqui para baixo são testes ---------------------------------------------------------------------------



//? ------------------------------------------------------------------------------------------------------
//? Aqui para testes: ------------------------------------------------------------------------------------
 let array1 =  [4,6,9,11];
 let baixo = null;
let intervalos = Music.chordInterval(array1);
console.log(intervalos);
console.log(Treatarray.quantDeX(intervalos ,  4));
//console.log(quantArray(intervalos));
console.log(Music.noteByInterval(array1,6,1));
console.log(Music.scale(1,"II","#",0))
console.log("o acorde é:",Music.chord(array1, baixo )); 
//
//? ------------------------------------------------------------------------------------------------------
//? ------------------------------------------------------------------------------------------------------



//? Aqui seguem os resultados das funções para não esquecer
/*
//* Define uma escala:
let escalaTest = scale("C", "I", "b", 1 );      
console.log(escalaTest);

//* Constrói o campo harmônico de uma escala, baseado em segundas:
let harmonyTest = harmony(escalaTest,4);  
console.log(harmonyTest);

console.log(chord([0, 4, 7], ));

//* Define a escala em formato de acordes usando a função chord junto da harmony:
let har = [];
for (let p = 0; p < harmonyTest.length; p++) {
  har[p] = chord(harmonyTest[p], harmonyTest[p][0]);
};
console.log(har);

*/

/* ||||||||||||||||||||||||||||||||||||||||||||///|||||||||||||||||
  ! LISTAGEM DE ERROS:
  *----------------------------------------------------------------
  ER001 -----> Root note do acorde não existe.    //?(Função Chord)
  ER002 -----> Acorde não catalogado.             //?(Função Chord)
  ER003 -----> Array inconsistente.               //?(Função Chord)
  ER004 -----> Array com valor fora dos limites.  //?(Função Chord)
*///|||||||||||||||||||||||||||||||||||||||||///|||||||||||||||||||
/*
//! Testando a função Chord
let poschord = []; fullchord = [];
for (let a = 0; a < 12; a++) {
  poschord[0] = a;
  for (let b = 0; b < 12; b++) {
    poschord[1] = b;
    for (let c = 0; c < 12; c++) {
      poschord[2] = c;
      for (let d = 0; d < 12; d++) {
        poschord[3] = d;
        for (let e = 0; e < 12; e++) {
          poschord[4] = e;
          for (let f = 0; f < 12; f++) {
            poschord[5] = f;
            for (let g = 0; g < 12; g++) {
              poschord[6] = g;
              fullchord[a+b+c+d+e+f+g] = poschord;
            };
          };
        };
      };
    };
  };
}; */
//console.log(fullchord);
/*
let consult = []; consult2 = []; consultn = [];
for (let i = 0; i < 12; i++) {
  for (let l = 0; l < 12; l++) {  
    consult[l] = Mymath.mod(l*7,12);
  };
  for (let k = 0; k< consult.length; k++) {
    if (i == 0) { 
    consult2[i] = consult;
    break;
    } else {
      consultn[k] = consult[k]+3;
    };
    consult2[i] = consult
  };
};


// complicaaado
function taxaDeTensao(stA,stB) {
  //Para duas notas. A e B.
  //1º: Transoformar semitons em frequências
  //2º: Calcular o delta entre as duas.
  //3º: Ciclo das Quintas -> C G D A E B F# C# Ab Eb Bb F
  //4º: Em ordem de Tensão -> C G F D Bb A Eb E Ab B C# F#
};

console.log(stToFreq(7)-1);
console.log(consult2)
*/