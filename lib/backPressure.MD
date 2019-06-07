## Backpressure

- Resistance to natural flow of data in stream
- Due to lack of pressure
- Native support from Node by returning false in write()
- attach listeners to 'drain' event to respect backpressure