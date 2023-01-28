// const event = require('events');
// const EventEmitter = new event.EventEmitter();

const { ok } = require('assert');
const EventEmitter = require('events');

const event = new EventEmitter();

// event.on('sayMyName', () => {
//     console.log('your name is vinod');
// });

// event.on('sayMyName', () => {
//     console.log('your name is bahadur');
// });

// event.on('sayMyName', () => {
//     console.log('your name is thapa');
// })

// event.emit('sayMyName');


event.on('checkPage', (sc, msg) => {
  console.log(`status code is ${sc} and the page is ${msg}`);
})

event.emit('checkPage', 200, ok);




