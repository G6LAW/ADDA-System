//!-CONSTANTES:--------------------------------------------------------------------

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

//!-FUNÇOES DE APOIO---------------------------------------------------------------
// math modulo x = valor inserido. m = limíte do módudo.
function mod(x, m) {
  return ((x % m) + m) % m;
};

  // função de transposição de linhas e colunas array 2D
function transpose(matrix) {
  return matrix.reduce((prev, next) => next.map((item, i) =>
    (prev[i] || []).concat(next[i])
  ), []);
};

// Conta o número de ocorrencias de um elemento no array
function quantDeX(arr, value){
  return arr.filter(x => x==value).length;
};

// Compara Arrays e responde em boolean.
function compareArrays(a,b) {
  if (a.length == b.length) {
  for (let i = 0; i < a.length; i++) {
    r = false;
    if (a[i] !== b[i]) { break } else {r = true };   
  }};
  return r;
};

// Array de quantidades de X, quantidades de notas de 0 a 12 por elementos do array.
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

function rotate( array , times ){
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

  let timecliped = mod(times,array.length)
  let tmp = array.slice();
  let left = tmp.splice(0,timecliped);
  tmp.push(left);
  return tmp.flat();
};

//Agrupa um array de forma diferente do concat e afins..
function agrupar(A, B, C) {
  let D = [];
  for (let i = 0; i < A.length; i++) {
    D[i] = A[i]+B[i]+C[i];
  };
  return D;
};

//Transforma um intervalo em semitons em frequência. F0 pode ser 1Hz, 440hz etc.
function stToFreq(semitons,f0) {
  if (f0 == null) {f0 = 1};
  return f0 * Math.pow(2,(semitons/12));
};


//Transforma uma frequência em um intervalo de semitons. F0 pode ser 1Hz, 440hz etc.
function freqToSt(frequência,f0) {
  if (f0 == null) {f0 = 1};
  return 12 * Math.log(frequência/f0)/Math.log(2);
};



//!-FUNÇOES MUSICAIS----------------------------------------------------------------------------------

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
    harm[j] = rotate(fromScale,jump*j);
  };
  let harmt = transpose(harm);
  return harmt;
};

function chord(ar, root) {
  /** //?? INFORMAÇÕES SOBRE A FUNÇÃO: ER001 -----> Root note do acorde não existe. //?(Função Chord) ////////////////////////////////////////////////////////
  * Criado em: 19/04/2022
  * ?-----------------------------------------------------------------------------------------------------
  * ? Função: ER001 -----> Root note do acorde não existe. //?(Função Chord).
  * ? Descrição: Nomeia acordes de acordo com sequência numérica de notas.
  * ? @ar: Array unidimensional de notas (nota, intervalo ou acorde).
  * ? @root: Base de preferência para o acorde (Tônica do acorde, desconsiderando inversões).
  * ? ----------------------------------------------------------------------------------------------------
  * * EX: ar -> [0 , 4, 7]; root -> 0 ==> CM. 
  * * O @root só é utilizado para escolher entre dois ou mais acordes, 
  * * apontando a base deles. Não é utilizado para fazer inversão dos acordes.
  */ /////////////////////////////////////////////////////////////////////////////////////////////////////
let l = ar.length; solution = "none"; color = [""]; bass = [""]; note = [""]; errorCode = 0;


//*conferência de erros:
if (ar.indexOf(root) == -1 ) { errorCode = -1     //* Valor root inserido porém inexistente
} else {errorCode = 1}  //* Valor root inserido e Existente
if (root == undefined) {errorCode = 0}; //*  Valor root não inserido
for (let q = 0; q < ar.length; q++) {  //* Se existir algum valor quebrado no array
  if (ar[q] == null) {
    errorCode = -3;
    break;
  };
  if ( ar[q] < [0] || ar[q] > 11) {
    errorCode = -4;
    break;
};

};

//*Se não houverem erros graves executa o código:
if (errorCode >= 0) {
  //*define um array para quantos intervalos de cada tipo existem no acorde
  let gridInterval = quantArray(chordInterval(ar));

  //* Para cada tamanho de acorde usa um procedimento:
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
  if (l >= 3){
    //?Confere os diversos casos de conjuntos de notas maiores que 3 elementos através
    //?do número de tipos de intervalos presentes na composição do acorde.
    //* Construção das Notas e Cores:
    switch (gridInterval.toString()) {
      default:  //*comando de erro caso não exista acorde catalogado.
          errorCode = -2;
        break;

      //* TRIADES ---------------------------------------------------------------------
      case "0,0,0,2,0,0,1,0,0,0,0,0":   //*Triades Diminutas (independe do Root)
        //Define a nota como a nota depois do intervalo de 6st.
        note[0] = notesSharp[noteByInterval(ar, 6, 1)];

        //De toda forma aqui será diminuto.
        color[0] = "dim";
        break;

      case "0,0,0,1,1,1,0,0,0,0,0,0":  //*Triades Menores e Maiores  (independe do Root)
        //Define a base como a nota depois do intervalo de 5st.
        note[0] = notesSharp[noteByInterval(ar, 5, 1)];

        //Se vier um 3 após o intervalo de 5st é menor, se for um 4 é maior:
        if (intervalByValue(ar,5,1) == 3) { color[0] = "m" } else { color[0] = "M" };
        break;

      case "1,0,0,0,0,0,2,0,0,0,0,0":  //*Triades de Quartas Suspensa  (independe do Root)
        //Define a nota como a nota depois do intervalo de 6st.
        note[0] = notesSharp[noteByInterval(ar, 0, 1)];

        //De toda forma aqui será diminuto.
        color[0] = "4th+";  
        break;
    
      case "0,0,1,0,0,0,0,2,0,0,0,0":  //*Triades de Quintas  (independe do Root)
        //Define a nota como a nota depois do intervalo de 6st.
        note[0] = notesSharp[noteByInterval(ar, 2, 1)];

        //De toda forma aqui será diminuto.
        color[0] = "5th";
        break;

      case "0,0,1,0,0,2,0,0,0,0,0,0":  //*Triades Sus2 Sus4 e 4ths (dependente do Root)
        //Se existir Root note definida pelo usuário:
        if (errorCode == 1) {
          //Define a nota
          note[0] = notesSharp[root];

          //Define a cor:
          if (noteByInterval(ar,2,0) == root) {color[0] = "Sus2"};
          if (noteByInterval(ar,2,-1) == root ) {color[0] = "Sus4"};
          if (noteByInterval(ar,2,+1) == root ) {color[0] = "4th"};



        //Se não existir Root note definida:
        } else if (errorCode == 0) {
          //Define as notas para os possíveis 3 acordes.
          note = ar.map(n=>notesSharp[n]);

          //Define a cor:
          if (compareArrays(chordInterval(ar),[ 5, 2, 5])) {color = ["Sus4", "Sus2", "4th"] };
          if (compareArrays(chordInterval(ar),[ 5, 5, 2])) {color = ["4th", "Sus4", "Sus2"] };
          if (compareArrays(chordInterval(ar),[ 2, 5, 5])) {color = ["Sus2", "4th", "Sus4"] };
        }
        break;

      case "0,0,0,0,3,0,0,0,0,0,0,0":  //*Triades Aumentadas (dependente do Root)
        //Define a cor;
        color = ["Aum","Aum","Aum"];
              
        //Se existir Root note definida pelo usuário:
        if (errorCode == 1) {
          //Define a nota:
          note[0] = notesSharp[root];

          //Se não existir Root note definida:
        } else if (errorCode == 0) {
          //Define as notas para os possíveis 3 acordes.
          note = ar.map(n=>notesSharp[n]);
        };
        break;
    
      //* TETRADES --------------------------------------------------------------------
      case "0,0,0,4,0,0,0,0,0,0,0,0":  //*Tetrades Diminutas Com Sétima (Depende do Root)    
        //Define a nota como a nota depois do intervalo de 1st.
        //Se existir um root note válido:
        if (errorCode == 1) {
          //Define a nota
          note[0] = notesSharp[root]; 

          //Se não existir um root note válido
        } else if (errorCode == 0) {
          note = ar.map(n=>notesSharp[n]);
        };
        //De toda forma aqui será diminuto.
        color = ["dim7", "dim7", "dim7", "dim7"];
        break;

      case "0,0,0,0,0,0,4,0,0,0,0,0":  //*Tetrades de Quartas Suspensas (independe do Root)
        //Define a nota como a nota sempre como a primeira ou a definida como root (se houver)
        if (errorCode == 0) {note[0] = notesSharp[ar[0]]
        } else if (errorCode == 1) {note[0] = notesSharp[root]};

        //De toda forma aqui será quarta sus.
        color[0] = "4th+7";
        break;

      case "0,0,2,0,2,0,0,0,0,0,0,0":  //*Tetrades aumentadas. (independe do Root)
        //Define a nota conferindo se o intervalo da frente é um 4 ou 2.
        if (intervalByValue(ar,4,1) == 4){
          note[0] = notesSharp[noteByInterval(ar,4,0)]
        } else if (intervalByValue(ar,4,1) == 2) {
          note[0] = notesSharp[noteByInterval(ar,4,-1)]
        };

        //Para esse caso a cor é Aum sempre.
        color[0] = "7Aum";
        break;
      
      case "0,0,0,1,0,3,0,0,0,0,0,0":  //*Tetrades de Quartas (independe do Root)
        //Define a nota como a nota depois do intervalo de 3st.
        note[0] = notesSharp[noteByInterval(ar, 3, 1)];

        //De toda forma aqui será em Quartas.
        color[0] = "4th7";
        break;

      case "0,0,0,1,0,0,0,3,0,0,0,0":  //*Tetrades de Quintas (independe do Root)
        //Define a nota como a nota depois do intervalo de 3st.
        note[0] = notesSharp[noteByInterval(ar, 3, 1)];

        //De toda forma aqui será de quinta.
        color[0] = "5th7";
        break;

      case "0,1,0,1,2,0,0,0,0,0,0,0":  //*Tetrades Menor e Maior com Sétima Maior(independe do Root)
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
        };
        break;

      case "0,0,1,2,1,0,0,0,0,0,0,0":  //*Tetrades m7(b-5) m6 m7 M6 M7(dependente do Root)
        //Confere se é M7   (os dois intervalos após o de 2st serão [4,3]).
        //          ou dim7(b-5) e m6 (os dois intervalos pós o de 2st serão [3,3]).
        //          ou m7 e M6   (os dois intervalos pós o de 2st serão [3,4]).

        //?M7   (independente do root)
        if (intervalByValue(ar,2,1) == 4 && intervalByValue(ar,2,2) == 3) {
          //Define a nota como a nota seguinte ao intervalo de 2st.
          note[0] = notesSharp[noteByInterval(ar, 2, 1)];

          //Para esse caso a cor é m7+
          color[0] = "M7";

          //? dim7(b-5) e m6:   (dependente do root)
        } else if (intervalByValue(ar,2,1) == 3 && intervalByValue(ar,2,2) == 3) {
          //Se existir um root note válido:
          if (errorCode == 1) {
            //Define a nota
            note[0] = notesSharp[root];  

            //Define a cor:
            if (noteByInterval(ar,2,1) == root) {color[0] = "m7(b-5)"
            } else if (noteByInterval(ar,2,2) == root ) {color[0] = "m6"
            } else {
              errorCode = -1;
            }

          //Se nenhum root for selecionado:
          } else if (errorCode == 0) {
            //Define as notas para os possíveis 2 acordes.
            if (noteByInterval(ar,2,1) == ar[0]) {
              note[0] = [notesSharp[noteByInterval(ar,2,1)]];
              note[1] = [notesSharp[noteByInterval(ar,2,2)]]; 
              color[0] = "m7(b-5)";
              color[1] = "m6";
            } else {
              note[1] = [notesSharp[noteByInterval(ar,2,1)]];
              note[0] = [notesSharp[noteByInterval(ar,2,2)]];
              color[1] = "m7(b-5)";
              color[0] = "m6";
            };
          };

        //?m7 e M6: (dependente do root)
        } else if (intervalByValue(ar,2,1) == 3 && intervalByValue(ar,2,2) == 4) {
          //Se existir um root note válido:
          if (errorCode == 1) {
            //Define a nota
            note[0] = notesSharp[root];  

            //Define a cor:
            if (noteByInterval(ar,2,1) == root) {color[0] = "m7"
            } else if (noteByInterval(ar,2,2) == root ) {color[0] = "M6"
            } else {
              errorCode = -1;
            }

          //Se nenhum root for selecionado:
          } else if (errorCode == 0) {
            //Define as notas para os possíveis 2 acordes.
            if (noteByInterval(ar,2,1) == ar[0]) {
              note[0] = [notesSharp[noteByInterval(ar,2,1)]];
              note[1] = [notesSharp[noteByInterval(ar,2,2)]]; 
              color[0] = "m7";
              color[1] = "M6";
            } else {
              note[1] = [notesSharp[noteByInterval(ar,2,1)]];
              note[0] = [notesSharp[noteByInterval(ar,2,2)]];
              color[1] = "m7";
              color[0] = "M6";
            };
          };
        } ;
        break;
      
      case "0,0,2,1,0,1,0,0,0,0,0,0":  //*Tetrades Sus2 e Sus4 Menores com Sétima (independe do Root)
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
        break;

      case "0,1,1,0,1,1,0,0,0,0,0,0":  //*Tetrades Sus2 e Sus4 com Sétima Maior (independe do Root)
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
        break;

      //* PENTADES --------------------------------------------------------------------     
      case "0,0,2,0,3,0,0,0,0,0,0,0": //* Pentades com 9ª aumentada (independe do Root)
        //Define a nota conferindo se o intervalo da frente é um 4 ou 2.
        if (intervalByValue(ar,4,1) == 4){
          note[0] = notesSharp[noteByInterval(ar,4,0)]
        } else if (intervalByValue(ar,4,1) == 2 && intervalByValue(ar,4,-1) == 4) {
          note[0] = notesSharp[noteByInterval(ar,4,-1)]
        } else if (intervalByValue(ar,4,1) == 2 && intervalByValue(ar,4,-1) == 2) {
          note[0] = notesSharp[noteByInterval(ar,4,2)]
        };

        //Para esse caso a cor é Aum sempre.
        color[0] = "9Aum";
        break;

      case "0,0,0,0,1,4,0,0,0,0,0,0": //* Pentades de Quartas (independe do Root)
        //Define a nota como a nota depois do intervalo de 3st.
        note[0] = notesSharp[noteByInterval(ar, 4, 1)];

        //De toda forma aqui será em Quartas.
        color[0] = "4th9";
        break;
      
      case "1,0,0,0,0,0,4,0,0,0,0,0": //* Pentades de Quartas Suspensas (independe do Root)
        //Define a nota como a nota sempre como a primeira ou a definida como root (se houver)
        if (errorCode == 0) {note[0] = notesSharp[ar[0]]
        } else if (errorCode == 1) {note[0] = notesSharp[root]};

        //De toda forma aqui será quarta sus.
        color[0] = "4th+9";
        break;
      
      case "0,0,0,0,1,0,0,4,0,0,0,0": //* Pentades de Quintas (independe do Root)
        //Define a nota como a nota depois do intervalo de 3st.
        note[0] = notesSharp[noteByInterval(ar, 4, 1)];

        //De toda forma aqui será de quinta.
        color[0] = "5th9";       
        break;

      case "0,0,1,2,2,0,0,0,0,0,0,0": //* Pentades m9(b-5); m9; m9(7+); M9; M+9 (independe do Root)
        // Define a nota como a próxima ao intervalo de 2st:
        note[0] = notesSharp[noteByInterval(ar,2,1)];

        //Para a cor:
        // Confere se é m9(b-5), se não confere se é m9 ou m9(7+), se não confere se é M9 ou M+9.
        if (intervalByValue(ar,2,1) == 3){ 
          //para o m9(b-5):
          if (intervalByValue(ar,2,2) == 3) { 
            color[0] = "m9(b-5)";
          } else if (intervalByValue(ar,2,3) == 3) {
            color[0] = "m9";
          } else if (intervalByValue(ar,2,3) == 4) {
            color[0] = "m9(7+)";
          };
        } else if (intervalByValue(ar,2,1) == 4 ) {
          if (intervalByValue(ar,2,3) == 3) {
            color[0] = "M9";
          } else if (intervalByValue(ar,2,3) == 4) {
            color[0] = "M+9";
          };
        }
        break;
      
      case "0,0,1,3,0,1,0,0,0,0,0,0": //* Pentades diminutas com Sétima e Nona(independe do Root)
        //Define a nota como a nota depois do intervalo de 2st.
        note[0] = notesSharp[noteByInterval(ar, 2, 1)];

        //De toda forma aqui será em Fixo.
        color[0] = "dim7(add9)";       
        break;
      
      case "0,1,1,1,2,0,0,0,0,0,0,0": //* Pentades Com Sétima menor, Quinta e Nona Bemois  (independe do Root)
        //Define a nota como a nota depois do intervalo de 1st.
        note[0] = notesSharp[noteByInterval(ar, 1, 1)];

        //De toda forma aqui será em Fixo.
        color[0] = "7(-9-5)";
        break;
      
      case "0,0,1,1,2,1,0,0,0,0,0,0": //* Pentades Com Sétima menor, Quinta e Nona Sustenidas (independe do Root)
                //Define a nota como a nota depois do intervalo de 3st.
        note[0] = notesSharp[noteByInterval(ar, 3, 1)];

        //De toda forma aqui será em Fixo.
        color[0] = "7(+9+5)";
        break;

      case "0,0,2,1,1,1,0,0,0,0,0,0": //* Pentades Menores e Maiores com Sexta e Nona  (independe do Root)
          //Define a nota a partir do intervalo de 5st mais 2 de fase.
          note[0] = notesSharp[noteByInterval(ar,5,2)];

          //Define a cor se a nota duas posições depois do 5 for um 3 ou 4
          if (intervalByValue(ar,5,2) == 3){ color[0] = "m(6/9)";
        } else if (intervalByValue(ar,5,2) == 4) { color[0] = "M(6/9)"};
        break;
    
      //* HEXADES --------------------------------------------------------------------
      case "0,0,0,4,0,2,0,0,0,0,0,0": //* Hexades Diminutas add Décima Primeira e Nona (independe do Root)
        //define a nota comparando a posição do semitom 5.
        if (intervalByValue(ar, 5, 2) == 5) { note[0] = notesSharp[noteByInterval(ar,5,-3)]
        } else if (intervalByValue(ar, 5, 2) == 3) { note[0] = notesSharp[noteByInterval(ar,5,1)]};

        //Define a cor:
        color[0] = "dim7(add11/9)"
        break;

      case "0,0,1,0,4,0,1,0,0,0,0,0": //* Hexades Maiores com Nona, Décima Primeira e Quinta Sustenidas (independe do Root)
        //Define a nota como a nota depois do intervalo de 6st.
        note[0] = notesSharp[noteByInterval(ar, 6, 1)];

        //De toda forma aqui será em Fixo.
        color[0] = "M9(+11/+5)";
        break;

      case "0,0,0,2,3,0,1,0,0,0,0,0": //* Hexades M9(+11) e M+9(+11) (Independe do Root)
        //Define a nota como a nota seguinte ao intervalo de 6st.
        note[0] = notesSharp[noteByInterval(ar, 6, 1)];

        //Define a cor de acordo com o valor duplamente anterior ao intervalo de 6st. (se for 4 é M9(+11), se for 3 é M+9(+11))
        if (intervalByValue(ar,6,-2) == 4) { color[0] = "M9(+11)"
        } else if (intervalByValue(ar,6,-2) == 3) { color[0] = "M+9(+11)"};
        break;

      case "0,0,0,3,2,1,0,0,0,0,0,0": //* Hexades m11(b-5); m11 e m11(7+) (Independe do Root)
        // Define a nota como a próxima ao intervalo de 5st:
        note[0] = notesSharp[noteByInterval(ar,5,1)];

        //Para a cor:
        // Confere se é m11(b-5), se não confere se é m11 ou m11(7+).
        if (intervalByValue(ar,5,-2) == 4){ 
          if (intervalByValue(ar,5,2) == 3) { 
            color[0] = "m11(b-5)";
          } else if (intervalByValue(ar,5,2) == 4) {
            color[0] = "m11"
            };
          } else if (intervalByValue(ar,5,-2) == 3 ) {
            color[0] = "m11(7+)";
            };
        break;

      case "0,0,1,2,1,2,0,0,0,0,0,0": //* Hexades Menor com Sexta, Nona e Décima Primeira (Independe do Root)
        //Define a nota como a nota duplamente anterior ao intervalo de 2st.
        note[0] = notesSharp[noteByInterval(ar, 2, -2)];

        //Define a cor do acorde:
        color[0] = "m6/9(+11)";
        break;

      case "0,0,3,1,1,1,0,0,0,0,0,0": //* Hexaades 7alt (Independe do Root)
        //Define a nota como a nota posterior ao intervalo de 3st.
        note[0] = notesSharp[noteByInterval(ar, 3, 1)];

        //De toda forma aqui será em Quartas.
        color[0] = "7alt";
        break;

      case "0,0,1,1,2,1,1,0,0,0,0,0": //* Hexades M6/9(+11) e M7(-9/-5) (Independe do Root)
        //Define a nota como a nota seguinte ao intervalo de 6st.
        note[0] = notesSharp[noteByInterval(ar, 6, 1)];

        //Define a cor de acordo com o valor anterior ao intervalo de 6st. (se for 4 é M6/9(+11), se for 5 é M7(-9/-5))
        if (intervalByValue(ar,6,-1) == 5) { color[0] = "M7(-9/-5)"
        } else if (intervalByValue(ar,6,-1) == 4) { color[0] = "M6/9(+11)"
        } else if (intervalByValue(ar,6,-1) == 3) { color[0] = "M7(+11/+9/+5)"};
        break;
    
      //* HEPTADES --------------------------------------------------------------------
      case "0,0,0,4,3,0,0,0,0,0,0,0": //* Heptades m13(-5); m13; m13(7+); M13(+11) e M+13(+11) (depende do Root)
        //Rotaciona o Array e confere se existe um match. 
        let choice = 0; tmp = chordInterval(ar); tmpnte = ar;
        for (let r = 0; r < ar.length; r++) {
          //*Se a primeira opção for verdadeira m13(-5) (Independe do Root)
          if (compareArrays(tmp,[3,3,4,4,3,4,3])) { 
            //já define a nota aqui, referênte ao número de rotações.
            note[0] = notesSharp[ar[r]];
            //E a cor, fixa.
            color[0] = "m13(-5)"
            break;
          };

          //*Se a segunda opção for verdadeira temos m13 ou M+13(+11) (Depende do Root)
          if (compareArrays(tmp,[3,4,3,4,3,4,3])) { 

            // Executa caso tenha root note válido:
            if (errorCode == 1) {
              //Subconfere se a root note é válida
              if (root == tmpnte[0] ) {
                //Define a nota:
                note[0] = notesSharp[ar[r]];

                //Define a cor:
                color[0] = "m13"
              } else if ( root == tmpnte[1]) {
                //Define a nota:
                note[0] = notesSharp[ar[mod(ar.length,r+1)]];

                //Define a cor:
                color[0] = "M+13(+11)"
                
                //Estabelece o erro de root note errado.
              } else {errorCode = -1};
            }else if (errorCode == 0) {
              //Define a nota:
              note[0] = notesSharp[ar[r]];
              note[1] = notesSharp[ar[mod(ar.length,r+1)]];

              //Define a Cor;
              color[0] = "m13";
              color[1] = "M+13(+11)";
            };
            break;
          };
          //*Se a terceira opção for verdadeira temos m13(7+) ou M13(+11) (Depende do Root)
          if (compareArrays(tmp,[3,4,4,3,3,4,3])) { 

            // Executa caso tenha root note válido:
            if (errorCode == 1) {
              //Subconfere se a root note é válida
              if (root == tmpnte[0] ) {
                //Define a nota:
                note[0] = notesSharp[ar[r]];

                //Define a cor:
                color[0] = "m13(7+)"
              } else if ( root == tmpnte[5]) {
                //Define a nota:
                note[0] = notesSharp[ar[mod(ar.length,r+5)]];

                //Define a cor:
                color[0] = "M13(+11)"
                
                //Estabelece o erro de root note errado.
              } else {errorCode = -1};
            }else if (errorCode == 0) {
              //Define a nota:
              note[0] = notesSharp[ar[r]];
              note[1] = notesSharp[ar[mod(ar.length,r+5)]];

              //Define a Cor;
              color[0] = "m13(7+)";
              color[1] = "M13(+11)";
            };
            break;
          };

          //*Rotaciona arrays temporários
          tmp = rotate(tmp,1);
          tmpnte = rotate(tmpnte,1);
        };

      
      break;
      
      case "0,0,1,2,4,0,0,0,0,0,0,0": //* Heptades M13(+5/-5) (Independe do Root)
      //Define a nota como a nota duplamente anterior ao intervalo de 2st.
        note[0] = notesSharp[noteByInterval(ar, 2, -2)];

        //De toda forma aqui será em Quartas.
        color[0] = "M13(+5/-5)";
        break;

      case "0,0,1,3,2,1,0,0,0,0,0,0": //* Heptades M13(+11/+9/+5) e M13(-9/-5) (Independe do Root)
        //Define a partir do intervalo de 2st se é M13(+11/+9/+5) ou M13(-9/-5)
        if (intervalByValue(ar,2,1) == 5) {
          //Define a nota como duas antes do intervalo de 2st
          note[0] = notesSharp[noteByInterval(ar, 2, -2)];

          //Define a cor
          color[0] = "M13(+11/+9/+5)"

        } else if (intervalByValue(ar,2,1) == 4) {
          //Define a nota como uma antes do intervalo de 2st
          note[0] = notesSharp[noteByInterval(ar, 2, -1)];

          //Define a cor
          color[0] = "M13(-9/-5)"
        };
        break;

      case "0,0,3,1,1,1,1,0,0,0,0,0": //* Heptades M9alt (Independe do Root)
        //Define a nota como a nota posterior ao intervalo de 6st.
        note[0] = notesSharp[noteByInterval(ar, 6, 1)];

        //De toda forma aqui será em Quartas.
        color[0] = "M9alt";
        break;

      //* OCTADES --------------------------------------------------------------------
      case "0,0,3,3,1,1,0,0,0,0,0,0": //* Nonades M13alt (Independe do Root)
        //Define a nota como a nota três vezes anterior ao intervalo de 5st.
        note[0] = notesSharp[noteByInterval(ar, 5, -3)];

        //De toda forma aqui será em Quartas.
        color[0] = "M13alt";
        break;

      };//final do Switch

    //* Construção dos baixos:
    //Define o baixo se houver inversão. (se a nota for diferente do primeiro elemento.)
    for (let b = 0; b < note.length; b++) {
      if (note[b] != notesSharp[ar[0]]) { bass[b] = "/"+notesSharp[ar[0]]} else {bass[b] = ""}; 
    };
  };
};
//!--------------------------------------------------------------------------  
//*Constrói a solução, um acorde baseado em nota, cor e baixo e confere o erro 001-> quando root não existe:
    switch (errorCode) {
      default:
        solution = agrupar(note, color, bass );
        break;
      case -1:  //? Root note não existe para a composição dada.
        solution = "ER001"
        break;
      case -2:  //? Acorde não catalogado.
        solution = "ER002"
        break;  
      case -3:  //? Array inconsistente.
        solution = "ER003"
        break;  
      case -4:  //? Array com valor fora dos limites (-1<x<12).
        solution = "ER004"
        break;  
    };
return  solution;
};


//! daqui para baixo são testes ---------------------------------------------------------------------------



//? ------------------------------------------------------------------------------------------------------
//? Aqui para testes: ------------------------------------------------------------------------------------
 let array1 =  [4,6];
 let baixo = null;
let intervalos = chordInterval(array1);
console.log(intervalos);
console.log(quantDeX(intervalos ,  4));
console.log(quantArray(intervalos));
console.log(noteByInterval(array1,6,1));

console.log(chord(array1, baixo )); 
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

let consult = []; consult2 = []; consultn = [];
for (let i = 0; i < 12; i++) {
  for (let l = 0; l < 12; l++) {  
    consult[l] = mod(l*7,12);
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