AFRAME.registerComponent('sound_note', {
    schema: {
      instrument: {type: 'string', default: 'acoustic_grand_piano'}
    },

      init: function () {
        var el = this.el;

        var onScreen = false;

        var instrument_name = this.data.instrument;

        var instrument_number = MIDI.GM.byName[instrument_name].number;


        el.parentElement.addEventListener('markerFound', function () {
          if(onScreen == false){
            onScreen = true;
            MIDI.programChange(0, instrument_number);
            MIDI.setVolume(0, 127);
            MIDI.noteOn(0, do4, velocity, 0);
            MIDI.noteOff(0, do4, 1);

          }
        });

      el.parentElement.addEventListener('markerLost', function () {
        onScreen = false;
      });


      },

      update: function () {
      }
    });
