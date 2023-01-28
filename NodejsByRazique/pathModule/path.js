const path = require('path');

console.log(path.dirname('/home/lenovo/Desktop/Nodejs/pathModule/path.js'));
console.log(path.extname('/home/lenovo/Desktop/Nodejs/pathModule/path.js'));
console.log(path.basename('/home/lenovo/Desktop/Nodejs/pathModule/path.js'));

console.log(path.parse('/home/lenovo/Desktop/Nodejs/pathModule/path.js'));

const myPath = path.parse('/home/lenovo/Desktop/Nodejs/pathModule/path.js');

console.log(myPath.name);
console.log(myPath.root);