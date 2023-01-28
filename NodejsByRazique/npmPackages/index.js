import chalk  from 'chalk';
import validator from 'validator';

// console.log(chalk.blue('Hello world!'));
// console.log(chalk.blue.italic('Hello world!'));
// console.log(chalk.blue.underline('Hello world!'));
// console.log(chalk.blue.inverse('Hello world!'));
// console.log(chalk.green.inverse('Hello world!'));
// console.log(chalk.red.inverse('Hello world!'));

const res = validator.isEmail('foo@bar.com'); //=> true
// const res = validator.isEmail('foobar.com'); //=> true

// console.log(chalk.green.inverse(res));

console.log(res ? chalk.green.inverse(res) : chalk.red.inverse(res));