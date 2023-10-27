"use strict";
module.exports = {
    name: 'songChanged',
    execute(queue, newSong, oldSong) {
        console.log(`${newSong} is now playing.`);
    },
};
//# sourceMappingURL=songChanged.js.map