const fs = require('fs');

const writeRowsToFile = (outputFilePath, value, limit, startTimestamp) => {
    const writestream = fs.createWriteStream(outputFilePath);
    writestream.cork();
    for(let i = 0; i < limit; i++) {
        const isDraining = writestream.write(value);
        if(!isDraining) {
            writestream.once('drain', () => {
                console.log('Stream is draining again.');
            });
        }
    }
    process.nextTick(() => writestream.uncork());
    return writestream.end('This is the end\n', () => {
        const stoppedTimestamp = Date.now();
        console.log('Time taken to write lines to a file = ', stoppedTimestamp - startTimestamp);
    });
};

const readRowsFromFile = async (inputFilePath) => {
    const readstream = fs.createReadStream(inputFilePath, {
        encoding: 'utf8',  // null -> buffers, 'utf8' -> strings with that encoding
        highWaterMark: 1024 // maximum size of each chunk (buffer or string)
    });
    for await (const chunk of readstream) {
        //console.log(`Read: ${chunk}`);
    }
    console.log('EOF');
} 

const getReadableStream = (filepath) => fs.createReadStream(filepath, {
    encoding: 'utf8',  // null -> buffers, 'utf8' -> strings with that encoding
    highWaterMark: 1024 // maximum size of each chunk (buffer or string)
});

const getWritableStream = (filepath) => fs.createWriteStream(filepath, {
    encoding: 'utf8',  // null -> buffers, 'utf8' -> strings with that encoding
    highWaterMark: 1024 // maximum size of each chunk (buffer or string)
});

module.exports = {
    writeRowsToFile,
    readRowsFromFile,
    getReadableStream,
    getWritableStream
};