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
// math modulo
function mod(x, m) {
  return ((x % m) + m) % m;
};

function rotate( array , times ){
  while( times-- ){
  var temp = array.shift();
   array.push( temp )
   }
  }




// Define a escala através da fundamental e do modo. Gaps podem ser # ou b. number ativa o modo numérico.
function scale(rootNote, mode, gaps, number) {
  var r,
    scl = [],
    sum,
    result = [];

    //ajusta os gaps
    if (gaps == "b") { gaps = notesFlat; } else {
        if (gaps == "#") { gaps = notesSharp; } else { 
            if (notesSharp.indexOf(rootNote) > -1) {
                gaps = notesSharp;} else { 
                    if (notesFlat.indexOf(rootNote) > -1) {
                        gaps = notesFlat;} else {
                            gaps = [0, 0, 0, 0, 0, 0, 0];
                            }
                        }
            }
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
    if (number == true) {
        result[j] = mod(sum + r, gaps.length);     
    } else {
        result[j] = gaps[mod(sum + r, gaps.length)];    
    };
    sum = sum + scl[j];
  };

  return result;
};

function chord(fromScale, size) {
  var harm=[];

  harm[0]=fromScale;
  harm[1]=fromScale;

  rotate(harm[0],)



  return harm ;
};


 let teste = scale("C", "I", "b", 1);

console.log(chord(teste,2));




