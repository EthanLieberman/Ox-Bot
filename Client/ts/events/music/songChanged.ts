export = {
    name: 'songChanged',
    execute(queue, newSong, oldSong) {
        console.log(`${newSong} is now playing.`)
    },
};