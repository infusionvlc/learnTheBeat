var notes = {
    do_2 : 0,   re_2 : 2 ,  mi_2 : 4,   fa_2 : 5,   sol_2 : 7,   la_2 : 9,   si_2 : 11,
    do_1 : 12,  re_1 : 14,  mi_1 : 16,  fa_1 : 17,  sol_1 : 19,  la_1 : 21,  si_1 : 23,
    do0  : 24,  re0  : 26,  mi0  : 28,  fa0  : 29,  sol0  : 31,  la0  : 33,  si0  : 35,
    do1  : 36,  re1  : 38,  mi1  : 40,  fa1  : 41,  sol1  : 43,  la1  : 45,  si1  : 47,
    do2  : 48,  re2  : 50,  mi2  : 52,  fa2  : 53,  sol2  : 55,  la2  : 57,  si2  : 59,
    do3  : 60,  re3  : 62,  mi3  : 64,  fa3  : 65,  sol3  : 67,  la3  : 69,  si3  : 71,
    do4  : 72,  re4  : 74,  mi4  : 76,  fa4  : 77,  sol4  : 79,  la4  : 81,  si4  : 83,
    do5  : 84,  re5  : 86,  mi5  : 88,  fa5  : 89,  sol5  : 91,  la5  : 93,  si5  : 95,
    do6  : 96,  re6  : 98,  mi6  : 100, fa6  : 101, sol6  : 103, la6  : 105, si6  : 107,
    do7  : 108, re7  : 110, mi7  : 112, fa7  : 113, sol7  : 115, la7  : 117, si7  : 119,
    do8  : 120, re8  : 122, mi8  : 124, fa8  : 125, sol8  : 127
}

const chord_type = {
  MIN: "m",
  MAJ: "M",
  DIS: " dis",
  AUM: " aum"
}

function calculateBasicChord(first_note, second_note, third_note){
  var semitone_diff_1 = second_note - first_note;
  var semitone_diff_2 = third_note - first_note;

  var chord_type;

  if(semitone_diff_1 == 3){
    chord_type = "m";
  }else if(semitone_diff_1 == 4){
    chord_type = "M";
  }

  if(typeof chord_type == 'undefined'){
    alert("No third detected.");
    return;
  }

  if(semitone_diff_2 == 7){
    
  }else if(semitone_diff_2 == 6 && chord_type == "m"){
    chord_type = " dis";  
  }else if(semitone_diff_2 == 8 && chord_type == "M"){
    chord_type = " aum";
  }else{
    alert("Chord not exists.");
    return;
  }

  var chord = {
    notes : [first_note, second_note, third_note],
    type  : chord_type,
    name  : chordToString(first_note, chord_type)
  };
  console.log(chord);
  return chord;
}

function noteToString(note_number){
  var module = note_number%12;

  switch(module){
    case 0:  return "Do";
    case 2:  return "Re";
    case 4:  return "Mi";
    case 5:  return "Fa";
    case 7:  return "Sol";
    case 9:  return "La";
    case 11: return "Si";
  }
}

function chordToString(note_number, chord_type){
  var chord_str;
  chord_str = noteToString(note_number);
  chord_str += chord_type;

  return chord_str;
}


var notes_colors = {
  do :  "#FF0000",
  re :  "#FF7F00",
  mi :  "#FFFF00",
  fa :  "#00FF00",
  sol : "#0000FF",
  la :  "#4B0082",
  si :  "#9400D3"
}

var delay = 0; // play one note every quarter second
var velocity = 127;

function shadeColor2(color, percent) {
  var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

AFRAME.registerComponent('sound_note', {
    schema: {
      instrument: {type: 'string', default: 'acoustic_grand_piano'},
      note: {type: 'string', default: 'do4'}
    },

      init: function () {
        var el = this.el;

        var onScreen = false;

        var instrument_name = this.data.instrument;
        var instrument_number = MIDI.GM.byName[instrument_name].number;

        var note_number = notes[this.data.note];
        var color = notes_colors[this.data.note.slice(0, -1)];
        var opacity = parseInt(this.data.note.slice(-1))/10.0;

        el.setAttribute("stl-model","src: #note");
        el.setAttribute("material","color: " + shadeColor2(color, opacity));

        var system = document.querySelector('a-scene').systems['sound_note'];

        el.parentElement.addEventListener('markerFound', function () {
          if(onScreen == false){
            system.add_active_note(note_number);
            onScreen = true;
            MIDI.programChange(0, instrument_number);
            MIDI.setVolume(0, 127);
            MIDI.noteOn(0, note_number, velocity, 0);
            MIDI.noteOff(0, note_number, 1);
          }
        });

        el.parentElement.addEventListener('markerLost', function () {
            onScreen = false;
            system.remove_active_note(note_number);
        });


      },

      update: function () {
      }
    });
