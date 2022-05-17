const notesSharp = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const notesFlat = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];
const modes = [
  ["I", "Ionian", [2, 2, 1, 2, 2, 2, 1]], // Ionian (I)
  ["II", "Dorian", [2, 1, 2, 2, 2, 1, 2]], // Dorian (II)
  ["III", "Phrygian", [1, 2, 2, 2, 1, 2, 2]], // Phrygian (III)
  ["IV", "Lydian", [2, 2, 2, 1, 2, 2, 1]], // Lydian (IV)
  ["V", "Mixolydian", [2, 2, 1, 2, 2, 1, 2]], // Mixolydian (V)
  ["VI", "Aeolian", [2, 1, 2, 2, 1, 2, 2]], // Aeolian (VI)
  ["VII", "Locrian", [1, 2, 2, 1, 2, 2, 2]], //Locrian (VII)
];

//!----------------------------------------------------------------------


// math modulo x = valor inserido. m = limíte do módudo.
function mod(x, m) {
  return ((x % m) + m) % m;
};

  // função de transposição de linhas e colunas array 2D
function transpose(matrix) {
  return matrix.reduce((prev, next) => next.map((item, i) =>
    (prev[i] || []).concat(next[i])
  ), []);
}

// encontra a distância entre duas notas.
function interval(e1, e2) {
  let r ;
  if ( e1 < 6 ) {
    r = Math.abs( e2 - e1);
  } else if (e1 >= 6 && e2 >= 6) {r = Math.abs( e2 - e1)
  } else { r = e2 + 12 - e1 };
  return r;
};

// sequência de intervalos entre um acorde
function chordInterval(arr) {
  let r = [];
  for (let g = 0; g < arr.length -1 ; g++) {
    r[g] = interval(arr[g],arr[g+1]);
  };
  r[arr.length-1] = interval(arr[arr.length-1],arr[0]);
  return r;

};

// Conta o número de ocorrencias de um elemento no array
function quantDeX(arr, value){
  return arr.filter(x => x==value).length;
}

// Compara Arrays e responde em boolean.
function compareArrays(a,b) {
  if (a.length == b.length) {
  for (let i = 0; i < a.length; i++) {
    r = false;
    if (a[i] !== b[i]) { break } else {r = true };   
  }};
  console.log(r);
  return r;
};

// Array de quantidades de X
function quantArray(chord) {
  let C = [];
  for (let q = 0; q < 12; q++) {
    C[q] = quantDeX(chord,q);
  };
  return C;
};

//Define o intervalo específico do acorde (chord), buscando por um valor (findvalue) e dando um determinado deslocamento (phase)
function intervalByValue(chord, findvalue, phase){
  let inter = chordInterval(chord);
  let idx = inter.indexOf(findvalue) + phase
  return inter[mod(idx, chord.length)];
};

//Define uma nota do acorde (chord) buscando por um intervalo (findvalue) e dando um determinado deslocamento (phase)
function noteByInterval(chord, findvalue, phase){
  let inter = chordInterval(chord);
  let idx = inter.indexOf(findvalue) + phase
  return chord[mod(idx, chord.length)];
};

// função de rotação de array 1D
function rotate( array , times ){
  /** //?? INFORMAÇÕES SOBRE A FUNÇÃO: rotate ////////////////////////////////////////////////////////
  * Criado em: 13/04/2022
  * ?-----------------------------------------------------------------------------------------------------
  * ? Função: rotate.
  * ? Descrição: Rotação de Arrays.
  * ? @array: É o array que será rotacionado.
  * ? @times: É a fase de deslocamento. Valores positivos empurram o array para a esquerda e valores
  * ? negativos empurram o array para a direita.
  * ? ----------------------------------------------------------------------------------------------------
  * * EX: array: [ 0, 0, 1, 0, 0, 0], times: 2 --> [ 1, 0, 0, 0, 0, 0].
  */ /////////////////////////////////////////////////////////////////////////////////////////////////////

  console.log(times)
  console.log(array.length)
  console.log(mod(times, array.length));
  let timecliped = mod(times,array.length)
  let tmp = array.slice();
  let left = tmp.splice(0,timecliped);
  tmp.push(left);
  return tmp.flat();
  }

function harmony(fromScale, size, jump) {
  /** //?? INFORMAÇÕES SOBRE A FUNÇÃO: harmony ////////////////////////////////////////////////////////
  * Criado em: 13/04/2022
  * ?-----------------------------------------------------------------------------------------------------
  * ? Função: harmony.
  * ? Descrição: Devolve um Array de Arrays com o campo harmônico da escala selecionada.
  * ? @fromScale: Escala modelo para a construção do campo.
  * ? @size: Tamanho dos acordes construidos por nota da escala.
  * ? @jump: intervalo entre as notas dos acordes.
  * ? ----------------------------------------------------------------------------------------------------
  * * EX: fromScale: [C, D, E, F, G, A, B], size: 3, jump: 2 --> 
  * *     [G, A, B, C, D, E, F].
  * *     [E, F, G, A, B, C, D].
  * *     [C, D, E, F, G, A, B].
  */ /////////////////////////////////////////////////////////////////////////////////////////////////////
  var harm=[];
  if (jump == null) { jump = 2};
  for (let j = 0; j < size; j++) {
    harm[j] = rotate(fromScale,jump*j)
    console.log("🚀 ~ file: util_v1.0.js ~ line 344 ~ harmony ~ 2*j", 2*j)
  };
  let harmt = transpose(harm);
  console.log("🚀 ~ file: util_v1.0.js ~ line 346 ~ harmony ~ harmt", harmt)
  return harmt;
};

//Agrupa um array de forma diferente do concat e afins..
function agrupar(A, B, C) {
  let D = [];
  for (let i = 0; i < A.length; i++) {
    D[i] = A[i]+B[i]+C[i];
  };
  return D;
};

// Define a escala através da fundamental e do modo. Gaps podem ser # ou b. number ativa o modo numérico.
function scale(rootNote, mode, gaps, isnumber) {
  var r,
    scl = [],
    sum,
    result = [];

    //ajusta os gaps
  if (gaps == "b") {
    gaps = notesFlat;
  } else if (gaps == "#") {
    gaps = notesSharp;
  } else if (notesSharp.indexOf(rootNote) > -1) {
    gaps = notesSharp;
  } else if (notesFlat.indexOf(rootNote) > -1) {
    gaps = notesFlat;
  } else {
    gaps = [0, 0, 0, 0, 0, 0, 0];
  };

  //chama o índex da root note pelo nome
  r = gaps.indexOf(rootNote);

  //for que chama a escala pelo nome
  for (let i = 0; i < modes.length; i++) {
    if (modes[i][1] == mode || modes[i][0] == mode) {
      scl = modes[i][2];
    };
  };


  sum = 0;
  for (let j = 0; j < scl.length; j++) {
    if (isnumber == true) {
        result[j] = mod(sum + r, gaps.length);     
    } else {
        result[j] = gaps[mod(sum + r, gaps.length)];    
    };
    sum = sum + scl[j];
  };

  return result;
};




//! daqui para baixo são testes ---------------------------------------------------------------------------

function chord(ar, root) {
  let l = ar.length; solution = "none"; color = [""]; bass = [""]; note = [""]; errorCode = 0;
  if (ar.indexOf(root) == -1 ) { errorCode = -1     //* Valor root inserido porém inexistente
  } else {errorCode = 1}  //* Valor root inserido e Existente
  if (root == undefined) {errorCode = 0}; //*  Valor root não inserido

  //*define um array para quantos intervalos de cada tipo existem no acorde
  let gridInterval = quantArray(chordInterval(ar));

  if (l == 1) { 
    note[0] = notesSharp[ar[0]]
  };
  if (l == 2) {
    //comporta a inversão do intervalo mantendo a base.
    if ( ar[0]-ar[1] >= 0 ) {note[0] = notesSharp[ar[1]]}
    //para os seguintes intervalos
    if ( Math.abs( ar[0]-ar[1]) == 0 ) {color[0] = "(pU)"};
    if ( Math.abs( ar[0]-ar[1]) == 1 ) {color[0] = "(m2)"};
    if ( Math.abs( ar[0]-ar[1]) == 2 ) {color[0] = "(M2)"};
    if ( Math.abs( ar[0]-ar[1]) == 3 ) {color[0] = "(m3)"};
    if ( Math.abs( ar[0]-ar[1]) == 4 ) {color[0] = "(M3)"};
    if ( Math.abs( ar[0]-ar[1]) == 5 ) {color[0] = "(p4)"};
    if ( Math.abs( ar[0]-ar[1]) == 6 ) {color[0] = "(Tr)"};
    if ( Math.abs( ar[0]-ar[1]) == 7 ) {color[0] = "(p5)"};
    if ( Math.abs( ar[0]-ar[1]) == 8 ) {color[0] = "(m6)"};
    if ( Math.abs( ar[0]-ar[1]) == 9 ) {color[0] = "(M6)"};
    if ( Math.abs( ar[0]-ar[1]) == 10 ) {color[0] = "(m7)"};
    if ( Math.abs( ar[0]-ar[1]) == 11 ) {color[0] = "(M7)"};
    if ( Math.abs( ar[0]-ar[1]) == 12 ) {color[0] = "(p8)"};
    if ( Math.abs( ar[0]-ar[1]) == 13 ) {color[0] = "(m9)"};
    if ( Math.abs( ar[0]-ar[1]) == 14 ) {color[0] = "(M9)"};
    if ( Math.abs( ar[0]-ar[1]) == 15 ) {color[0] = "(m10)"};
    if ( Math.abs( ar[0]-ar[1]) == 16 ) {color[0] = "(M10)"};
  };
  if (l == 3) { 

    //*Triades Diminutas (independe do Root)
    if (compareArrays(gridInterval,[0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0])) {
      //Define a nota como a nota depois do intervalo de 6st.
      note[0] = notesSharp[noteByInterval(ar, 6, 1)];

      //De toda forma aqui será diminuto.
      color[0] = "dim";

      //Define o baixo se houver inversão. (se a nota for diferente do primeiro elemento.)
      if (note[0] != notesSharp[ar[0]]) { bass[0] = "/"+notesSharp[ar[0]]};
    };

    //*Triades Menores e Maiores  (independe do Root)
    if (compareArrays(gridInterval,[0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0])) {
      //Define a base como a nota depois do intervalo de 5st.
      note[0] = notesSharp[noteByInterval(ar, 5, 1)];

      //Se vier um 3 após o intervalo de 5st é menor, se for um 4 é maior:
      if (intervalByValue(ar,5,1) == 3) { color[0] = "m" } else { color[0] = "M" };

      //Define o baixo se houver inversão. (se a nota for diferente do primeiro elemento.)
      if (note[0] != notesSharp[ar[0]]) { bass[0] = "/"+notesSharp[ar[0]]};
    };

    //*Triades de Quartas Suspensa  (independe do Root)
    if (compareArrays(gridInterval,[1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0])) {
      //Define a nota como a nota depois do intervalo de 6st.
      note[0] = notesSharp[noteByInterval(ar, 0, 1)];

      //De toda forma aqui será diminuto.
      color[0] = "4th+";

      //Define o baixo se houver inversão. (se a nota for diferente do primeiro elemento.)
      if (note[0] != notesSharp[ar[0]]) { bass[0] = "/"+notesSharp[ar[0]]};
    };

    //*Triades de Quintas  (independe do Root)
    if (compareArrays(gridInterval,[0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0])) {
      //Define a nota como a nota depois do intervalo de 6st.
      note[0] = notesSharp[noteByInterval(ar, 2, 1)];

      //De toda forma aqui será diminuto.
      color[0] = "5th";

      //Define o baixo se houver inversão. (se a nota for diferente do primeiro elemento.)
      if (note[0] != notesSharp[ar[0]]) { bass[0] = "/"+notesSharp[ar[0]]};
    };

    //*Triades Sus2 Sus4 e 4ths (dependente do Root)
    if (compareArrays(gridInterval,[0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0])) {
      //Se existir Root note definida pelo usuário:
      if (errorCode == 1) {
        //Define a nota
        note[0] = notesSharp[root];

        //Define a cor:
        if (noteByInterval(ar,2,0) == root) {color[0] = "Sus2"};
        if (noteByInterval(ar,2,-1) == root ) {color[0] = "Sus4"};
        if (noteByInterval(ar,2,+1) == root ) {color[0] = "4th"};

        //Define o Baixo:
        if (note[0] != notesSharp[ar[0]]) { bass[0] = "/"+notesSharp[ar[0]]};

      //Se não existir Root note definida:
      } else if (errorCode == 0) {
        //Define as notas para os possíveis 3 acordes.
        note = ar.map(n=>notesSharp[n]);

        //Define os baixos para os possíveis 3 acordes.
        for (let b = 0; b < ar.length; b++) {
          if (note[b] != notesSharp[ar[0]]) { bass[b] = "/"+notesSharp[ar[0]]} else {bass[b] = ""}; 
        };

        //Define a cor:
        if (compareArrays(chordInterval(ar),[ 5, 2, 5])) {color = ["Sus4", "Sus2", "4th"] };
        if (compareArrays(chordInterval(ar),[ 5, 5, 2])) {color = ["4th", "Sus4", "Sus2"] };
        if (compareArrays(chordInterval(ar),[ 2, 5, 5])) {color = ["Sus2", "4th", "Sus4"] };
      }
    };

    //*Triades Aumentadas (dependente do Root)
    if (compareArrays(gridInterval,[0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0])) {
      
      //Define a cor;
      color = ["Aum","Aum","Aum"];
      
      //Se existir Root note definida pelo usuário:
      if (errorCode == 1) {
        //Define a nota:
        note[0] = notesSharp[root];

        //Define o baixo:
        if (note[0] != notesSharp[ar[0]]) { bass[0] = "/"+notesSharp[ar[0]]};
        //Se não existir Root note definida:
      } else if (errorCode == 0) {
        //Define as notas para os possíveis 3 acordes.
        note = ar.map(n=>notesSharp[n]);

        //Define os baixos para os possíveis 3 acordes.
        for (let b = 0; b < ar.length; b++) {
          if (note[b] != notesSharp[ar[0]]) { bass[b] = "/"+notesSharp[ar[0]]} else {bass[b] = ""}; 
        };
      };
    };
  };
  if (l == 4) {


    //!-----------------------------------------------------------------------  

    //*Tetrades Diminutas Com Sétima e Quinta Bemol (independe do Root)
    if (compareArrays(gridInterval,[0, 1, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0])) {
      //Define a nota como a nota depois do intervalo de 1st.
      note[0] = notesSharp[noteByInterval(ar, 1, 1)];

      //De toda forma aqui será diminuto.
      color[0] = "dim7";

      //Define o baixo se houver inversão. (se a nota for diferente do primeiro elemento.)
      if (note[0] != notesSharp[ar[0]]) { bass[0] = "/"+notesSharp[ar[0]]};
    };

    //*Tetrades de Quartas (independe do Root)
    if (compareArrays(gridInterval,[0, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0])) {
      //Define a nota como a nota depois do intervalo de 3st.
      note[0] = notesSharp[noteByInterval(ar, 3, 1)];

      //De toda forma aqui será em Quartas.
      color[0] = "4th7";

      //Define o baixo se houver inversão. (se a nota for diferente do primeiro elemento.)
      if (note[0] != notesSharp[ar[0]]) { bass[0] = "/"+notesSharp[ar[0]]};
    };

    //*Tetrades de Quartas Suspensas (independe do Root)
    if (compareArrays(gridInterval,[0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0])) {
      //Define a nota como a nota sempre como a primeira ou a definida como root (se houver)
      if (errorCode == 0) {note[0] = notesSharp[ar[0]]
      } else if (errorCode == 1) {note[0] = notesSharp[root]};
 

      //De toda forma aqui será quarta sus.
      color[0] = "4th+7";

      //Define o baixo se houver inversão. (se a nota for diferente do primeiro elemento.)
      if (note[0] != notesSharp[ar[0]]) { bass[0] = "/"+notesSharp[ar[0]]};
    };

    //*Tetrades de Quintas (independe do Root)
    if (compareArrays(gridInterval,[0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 0])) {
      //Define a nota como a nota depois do intervalo de 3st.
      note[0] = notesSharp[noteByInterval(ar, 3, 1)];

      //De toda forma aqui será de quinta.
      color[0] = "5th7";

      //Define o baixo se houver inversão. (se a nota for diferente do primeiro elemento.)
      if (note[0] != notesSharp[ar[0]]) { bass[0] = "/"+notesSharp[ar[0]]};
    };

    //*Tetrades Sus2 e Sus4 Menores com Sétima (independe do Root)
    if (compareArrays(gridInterval,[0, 0, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0])) {

      //Confere se é (Sus2)m7 (depois do intervalo de 5st vem um de 3st) 
      //          ou (Sus4)m7 (depois do intervalo de 5st vem um de 2st)
      if (intervalByValue(ar,5,1) == 3) {
        //Define a nota como a nota antes do intervalo de 5st.
        note[0] = notesSharp[noteByInterval(ar, 5, -1)];

        //Para esse caso a cor é (Sus2)m7
        color[0] = "(Sus2)m7";
      } else if (intervalByValue(ar,5,1) == 2) {
        //Define a nota como a nota no intervalo de 5st.
        note[0] = notesSharp[noteByInterval(ar, 5, 0)];

        //Para esse caso a cor é (Sus4)m7
        color[0] = "(Sus4)m7";
      };

      //Define o baixo se houver inversão. (se a nota for diferente do primeiro elemento.)
      if (note[0] != notesSharp[ar[0]]) { bass[0] = "/"+notesSharp[ar[0]]};
    };

    //*Tetrades Sus2 e Sus4 com Sétima Maior (independe do Root)
    if (compareArrays(gridInterval,[0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0])) {

      //Confere se é (Sus2)7+ (depois do intervalo de 5st vem um de 4st) 
      //          ou (Sus4)7+ (depois do intervalo de 5st vem um de 2st)
      if (intervalByValue(ar,5,1) == 4) {
        //Define a nota como a nota antes do intervalo de 5st.
        note[0] = notesSharp[noteByInterval(ar, 5, -1)];

        //Para esse caso a cor é (Sus2)7+
        color[0] = "(Sus2)7+";
      } else if (intervalByValue(ar,5,1) == 2) {
        //Define a nota como a nota no intervalo de 5st.
        note[0] = notesSharp[noteByInterval(ar, 5, 0)];

        //Para esse caso a cor é (Sus4)7+
        color[0] = "(Sus4)7+";
      };

      //Define o baixo se houver inversão. (se a nota for diferente do primeiro elemento.)
      if (note[0] != notesSharp[ar[0]]) { bass[0] = "/"+notesSharp[ar[0]]};
    };

    //*Tetrades Menor e Maior com Sétima Maior e Aumentada (independe do Root)
    if (compareArrays(gridInterval,[0, 1, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0])) {

      //Confere se é m7+ (depois do intervalo de 1st vem um de 3st) 
      //          ou M7+ (antes do intervalo de 1st vem um de 4st)
      //          ou Aum (antes do intervalo de 1st vem um de 3st)
      if (intervalByValue(ar,1,1) == 3) {
        //Define a nota como a nota seguinte ao intervalo de 1st.
        note[0] = notesSharp[noteByInterval(ar, 1, 1)];

        //Para esse caso a cor é m7+
        color[0] = "m7+";
      } else if (intervalByValue(ar,1,-1) == 4) {
        //Define a nota como a nota seguinte ao intervalo de 1st.
        note[0] = notesSharp[noteByInterval(ar, 1, 1)];

        //Para esse caso a cor é M7+
        color[0] = "M7+";
      } else if (intervalByValue(ar,1,-1 == 3)) {
        //Define a nota como a nota seguinte ao intervalo de 1st.
        note[0] = notesSharp[noteByInterval(ar, 1, 1)];

        //Para esse caso a cor é M7+
        color[0] = "Aum";
      };

      //Define o baixo se houver inversão. (se a nota for diferente do primeiro elemento.)
      if (note[0] != notesSharp[ar[0]]) { bass[0] = "/"+notesSharp[ar[0]]};
    };

    //*Tetrades Menor e Maior com Sétima Maior e Aumentada (dependente do Root)
    if (compareArrays(gridInterval,[0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0])) {
      //Confere se é M7   (os dois intervalos após o de 2st serão [4,3]).
      //          ou dim7 e m6 (os dois intervalos pós o de 2st serão [3,3]).
      //          ou m7 e M6   (os dois intervalos pós o de 2st serão [3,4]).

      //?M7
      if (intervalByValue(ar,2,1) == 4 && intervalByValue(ar,2,2) == 3) {
        //Define a nota como a nota seguinte ao intervalo de 2st.
        note[0] = notesSharp[noteByInterval(ar, 2, 1)];

        //Para esse caso a cor é m7+
        color[0] = "M7";

        //? dim7 e m6:  
        //TODO ----------------------> preciso copiar essa função daqui:
      } else if (intervalByValue(ar,2,1) == 3 && intervalByValue(ar,2,2) == 3) {
        //Se existir um root note válido:
        if (errorCode == 1) {
          //Define a nota
          note[0] = notesSharp[root];  

          //Define a cor:
          if (noteByInterval(ar,2,1) == root) {color[0] = "dim7"
          } else if (noteByInterval(ar,2,2) == root ) {color[0] = "m6"
          } else {
            //Define o errorCode para tratar o baixo corretamente, pois não existe fundamental correta aqui.
            //A root note serve para selecionar um acorde, mas já que não existem acordes suficiêntes para selecionar
            //ele permite que você force o baixo para uma nota especificada. 
            errorCode = 2;
            note[0] = [notesSharp[noteByInterval(ar,2,1)]];
            note[1] = [notesSharp[noteByInterval(ar,2,2)]]; 
            color[0] = "dim7";
            color[1] = "m6";
          }

        //Se nenhum root for selecionado:
        } else if (errorCode == 0) {
          //Define as notas para os possíveis 2 acordes.
          if (noteByInterval(ar,2,1) == ar[0]) {
            note[0] = [notesSharp[noteByInterval(ar,2,1)]];
            note[1] = [notesSharp[noteByInterval(ar,2,2)]]; 
            color[0] = "dim7";
            color[1] = "m6";
          } else {
            note[1] = [notesSharp[noteByInterval(ar,2,1)]];
            note[0] = [notesSharp[noteByInterval(ar,2,2)]];
            color[1] = "dim7";
            color[0] = "m6";
          };
        };

      //?m7 e M6:
      } else if (intervalByValue(ar,2,1) == 3 && intervalByValue(ar,2,2) == 4) {
        //TODO ---------------------------------------- Até aqui.
        // TODO e jogar aqui em baixo como sendo a função responsável pelo m7 e M6..
        // TODO Aqui.... partindo de um else if
        //? infos importantes sobre esses acordes:
        //? iniciando pelo intervalo único:
        //? m7: 2 F3 4 2
        //? M6: 2 3 F4 3
        //? Iniciando pela fundamental:
        //? m7: 3 4 3 u2
        //? M6: 4 3 u2 3
      } ;
      
        //Define o baixo se houver inversão. (se a nota for diferente do primeiro elemento.)
      if (errorCode == 2) {bass = note.map(n => "/"+notesSharp[root]);} else {
        for (let b = 0; b < note.length; b++) {
          if (note[b] != notesSharp[ar[0]]) { bass[b] = "/"+notesSharp[ar[0]]} else {bass[b] = ""}; 
        };
      };

    };// Fim das Tetrades Menores e Maiores com Sétima Maior e Aumentadas.






      

  };//fim if(l = 4);




  //? gridinterval formado pelo acorde teste:
  console.log(gridInterval);
  //!--------------------------------------------------------------------------  
  //*Constrói a solução, um acorde baseado em nota, cor e baixo e confere o erro 001-> quando root não existe:
  if (errorCode > -1) {solution = agrupar(note, color, bass )
  } else {solution = "ER001"};
   //TODO ---------------------------------------------------------------------
  console.log(ar.indexOf(root));
  console.log(errorCode);
  console.log(note);
  console.log(color);
  console.log(bass);
  console.log(ar);
  console.log(noteByInterval(ar,1,1));
  console.log(solution);
  return  solution;
};  // Final do Chord Function


//? ------------------------------------------------------------------------------------------------------
//? Aqui para testes: ------------------------------------------------------------------------------------
let array1 =  [0, 3, 6, 10];
let intervalos = chordInterval(array1);
console.log(intervalos);
console.log(quantDeX(intervalos ,  4));
console.log(quantArray(intervalos));
console.log(noteByInterval(array1,6,1));

console.log(chord(array1, 10 ));
//
//? ------------------------------------------------------------------------------------------------------
//? ------------------------------------------------------------------------------------------------------


/**
//? Aqui seguem os resultados das funções para não esquecer

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
  har[p] = chord(harmonyTest[p]);
};
console.log(har);

 */

/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  ! LISTAGEM DE ERROS:
  *-------------------------------------------------------------
  ER001 -----> Root note do acorde não existe. //?(Função Chord)
*///||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




