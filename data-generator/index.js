const fs = require ('fs');
const faker = require ('faker');
const readline = require ('linebyline');

// Helper funcitons

const randomNumberGen = (min, max) => {
  return min + Math.round(Math.randome() * (max - min));
}

const appendLeading = (val) => {
  if (val < 10) {
    return `0${val}`;
  } else {
    return `${val}`;
  }
}

const generateUsers = () => {
  console.log('generateUsers');
  let out = fs.createWriteStream('./usersData.csv', {flag: 'a'});
  for(var i = 1; i < 10000001; i++) {
    out.write(`${i}.${faker.internet.userName()}\n`, 'utf-8');
  }
  out.end();
}

generateUsers();