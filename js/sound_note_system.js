AFRAME.registerSystem('sound_note', {

    init: function () {
        // Called on scene initialization.
        this.active_notes = [];
      },

    add_active_note: function (note) {
        this.active_notes.push(note);
        this.active_notes.sort();
        console.log("Note added");
        console.log(this.active_notes);
    },

    remove_active_note: function (note) {
        var index = this.active_notes.indexOf(note);
        if (index > -1) {
            this.active_notes.splice(index, 1);
            console.log("Note removed");
            console.log(this.active_notes);
        }

    }

});