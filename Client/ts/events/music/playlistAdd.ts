export = {
    name: 'playlistAdd',
    execute(queue, playlist) {
        console.log(`Playlist ${playlist} with ${playlist.songs.length} was added to the queue.`)
    },
};