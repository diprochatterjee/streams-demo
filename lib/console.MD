## Why does console.log make it slower..much slower?

- Warning: The global console object's methods are neither consistently synchronous like the browser APIs they resemble, nor are they consistently asynchronous like all other Node.js streams.
- https://nodejs.org/api/process.html#process_a_note_on_process_i_o
- A note on process I/O#
process.stdout and process.stderr differ from other Node.js streams in important ways:
They are used internally by console.log() and console.error(), respectively.

- Writes may be synchronous depending on what the stream is connected to and whether the system is Windows or POSIX:

- Files: synchronous on Windows and POSIX
- TTYs (Terminals): asynchronous on Windows, synchronous on POSIX
- Pipes (and sockets): synchronous on Windows, asynchronous on POSIX