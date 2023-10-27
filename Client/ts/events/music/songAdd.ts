export = {
    name: 'songAdd',
    execute(queue, song, client) {
        console.log(`Song ${song} was added to the queue.`)
    },
};