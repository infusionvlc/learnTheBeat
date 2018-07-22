var notes = {
    do_2 : 0,   re_2 : 2 ,  mi_2 : 4,   fa_2 : 5,   sol_2 : 7,   la_2 : 9,   si_2 : 11,
    do_1 : 12,  re0  : 14,  mi_1 : 16,  fa_1 : 17,  sol_1 : 19,  la_1 : 21,  si_1 : 23,
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

var delay = 0; // play one note every quarter second
var velocity = 127;

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
        
        el.parentElement.addEventListener('markerFound', function () {
          if(onScreen == false){
            onScreen = true;
            MIDI.programChange(0, instrument_number);
            MIDI.setVolume(0, 127);
            MIDI.noteOn(0, note_number, velocity, 0);
            MIDI.noteOff(0, note_number, 1);

          }
        });

        el.parentElement.addEventListener('markerLost', function () {
            onScreen = false;
        });


      },

      update: function () {
      }
    });
