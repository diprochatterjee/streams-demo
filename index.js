const { writeRowsToFile, readRowsFromFile, getReadableStream, getWritableStream } = require('./lib/fileHandler');
const { pipeline } = require('stream');

const main = (value1, value2) => {
    console.log(`This process is pid ${process.pid}`);
    console.log(`This platform is ${process.platform}`);
    console.log(`The parent process is pid ${process.ppid}`);
    console.log('This release is - ', process.release);
    const startedTimestamp = Date.now();
    console.log('Started processing - ', startedTimestamp);
    writeRowsToFile('sample1.txt', value1 + "\n", 100000, startedTimestamp);
    readRowsFromFile('sample1.txt');
    const writeStreamSample2 = writeRowsToFile('sample2.txt', value2 + "\n", 200000 ,startedTimestamp);
    writeStreamSample2.on('finish', () => {
        const readableStream = getReadableStream('sample2.txt');
        const writeableStream = getWritableStream('sample3.txt');
        readableStream.pipe(writeableStream);
    });

    process.on('SIGINT', () => {
        console.log('SIGINT received, exiting');
        process.exit(1);
    });
    
    // process.on('SIGKILL', () => {
    //     console.warn('SIGKILL received, exiting');
    //     process.exit();
    // });
    
    process.on('SIGABRT', () => {
        console.log('SIGABRT received, exiting');
        process.exit(1);
    });
};

main('Streams', 'signals');