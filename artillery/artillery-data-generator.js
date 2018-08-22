const fs = require ('fs');
const faker = require ('faker');
const readline = require ('linebyline');

const randomNumberGen = (min, max) => {
  return min + Math.round(Math.random() * (max - min));
}

const generatePhotoUrl = () => {
    let photoId = randomNumberGen(1, 1000);
    let photoUrl = `https://s3-us-west-2.amazonaws.com/sdc-hero/SDC+Photos/photo${photoId}.jpg`;
    return photoUrl;
}

const createString = (i) => {
  return `${i},${faker.company.catchPhrase()},${generatePhotoUrl()},${randomNumberGen(9000000, 10000000)}\n`
}

let writer = fs.createWriteStream('./photosData.csv');

const createPhotos = function() {
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 9990000) {
        // last time!
        writer.write(createString(i), 'utf-8');
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(createString(i), 'utf-8');
      }
    } while (i > 9990000 && ok);
    if (i > 9990000) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

createPhotos();