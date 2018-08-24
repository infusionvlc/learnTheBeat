AFRAME.registerSystem('sound_note', {

    init: function () {
        // Called on scene initialization.
        this.active_notes = [];
        this.instrument = MIDI.GM.byName['accordion'].number;
        this.velocity = 127;
      },

    add_active_note: function (note) {
        this.active_notes.push(note);
        this.active_notes.sort();
        // Check if there is a chord
        if(this.active_notes.length > 2){
            var i;
            // Play every note in the active note array every 1.5 secs
            for(i = 0; i < this.active_notes.length; i++ ){
                setTimeout(sleep, 1500 * (i+1), this, i);
            } 
            // Afer that play the chord
            for(i = 0; i < this.active_notes.length; i++ ){
                setTimeout(sleep, 1500 * (this.active_notes.length + 1), this, i);
            }
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    },

    remove_active_note: function (note) {
        var index = this.active_notes.indexOf(note);
        if (index > -1) {
            this.active_notes.splice(index, 1);
        }

    },

    play_sound: function(note){
        MIDI.programChange(0, this.instrument);
        MIDI.setVolume(0, 127);
        MIDI.noteOn(0, note, this.velocity, 0);
        MIDI.noteOff(0, note, 1);  
    },

});

function sleep(scope, i){
    scope.play_sound(scope.active_notes[i]);
}