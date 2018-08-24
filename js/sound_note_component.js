var notes = {
    do_2 : 0,  reb_2 : 1,  re_2 : 2 ,  mib_2 : 3,  mi_2 : 4,   fa_2 : 5,  solb_2 : 6,  sol_2 : 7,  lab_2 : 8,  la_2 : 9,  sib_2 : 10,  si_2 : 11,
    do_1 : 12, reb_1 : 13,  re_1 : 14,  mib_1 : 15, mi_1 : 16,  fa_1 : 17,  solb_1 : 18,  sol_1 : 19,  lab_1 : 20,  la_1 : 21,  sib_1 : 22,  si_1 : 23,
    do0  : 24,  reb0 : 25,  re0  : 26,  mib0 : 27,  mi0  : 28,  fa0  : 29,  solb0 : 30,  sol0  : 31,  lab0 : 32,  la0  : 33,  sib0 : 34,  si0  : 35,
    do1  : 36,  reb1 : 37,  re1  : 38,  mib1 : 39,  mi1  : 40,  fa1  : 41,  solb1 : 42,  sol1  : 43,  lab1 : 44,  la1  : 45,  sib1 : 46,  si1  : 47,
    do2  : 48,  reb2 : 49,  re2  : 50,  mib2 : 51,  mi2  : 52,  fa2  : 53,  solb2 : 54,  sol2  : 55,  lab2 : 56,  la2  : 57,  sib2 : 58,  si2  : 59,
    do3  : 60,  reb3 : 61,  re3  : 62,  mib3 : 63,  mi3  : 64,  fa3  : 65,  solb3 : 66,  sol3  : 67,  lab3 : 68,  la3  : 69,  sib3 : 70,  si3  : 71,
    do4  : 72,  reb4 : 71,  re4  : 74,  mib4 : 75,  mi4  : 76,  fa4  : 77,  solb4 : 78,  sol4  : 79,  lab4 : 80,  la4  : 81,  sib4 : 82,  si4  : 83,
    do5  : 84,  reb5 : 85,  re5  : 86,  mib5 : 87,  mi5  : 88,  fa5  : 89,  solb5 : 90,  sol5  : 91,  lab5 : 92,  la5  : 93,  sib5 : 94,  si5  : 95,
    do6  : 96,  reb6 : 97,  re6  : 98,  mib6 : 99,  mi6  : 100, fa6  : 101, solb6 : 102,  sol6  : 103, lab6 : 104,  la6  : 105, sib6 : 106,  si6  : 107,
    do7  : 108, reb7 : 109,  re7  : 110,  mib7 : 111,  mi7  : 112, fa7  : 113, solb7 : 114,  sol7  : 115, lab7 : 116,  la7  : 117, sib7 : 118,  si7  : 119,
    do8  : 120, reb8 : 121,  re8  : 122,  mib8 : 123,  mi8  : 124, fa8  : 125, solb8 : 126,  sol8  : 127
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
  reb : "#FF0F00",
  re :  "#FF7F00",
  mib : "#FFF700",
  mi :  "#FFFF00",
  fa :  "#00FF00",
  solb :"#000F00",
  sol : "#0000FF",
  lab : "#0000F7",
  la :  "#4B0082",
  sib : "#94007F",
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
