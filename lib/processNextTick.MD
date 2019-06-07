# Process.nextTick()

- The process.nextTick() method adds the callback to the "next tick queue". Once the current turn of the event loop turn runs to completion, all callbacks currently in the next tick queue will be called.

- This is not a simple alias to setTimeout(fn, 0). It is much more efficient. It runs before any additional I/O events (including timers) fire in subsequent ticks of the event loop.

- the nextTickQueue will be processed after the current operation is completed, regardless of the current phase of the event loop. Here, an operation is defined as a transition from the underlying C/C++ handler, and handling the JavaScript that needs to be executed.