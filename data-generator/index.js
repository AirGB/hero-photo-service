const fs = require ('fs');
const faker = require ('faker');
const readline = require ('linebyline');

// Helper funcitons

const randomNumberGen = (min, max) => {
  return min + Math.round(Math.random() * (max - min));
}

const appendLeading = (val) => {
  if (val < 10) {
    return `0${val}`;
  } else {
    return `${val}`;
  }
}

// helper function to produce random photo
const generatePhotoUrl = () => {
    let photoId = randomNumberGen(1, 1001);
    let photoUrl = `https://s3-us-west-2.amazonaws.com/sdc-hero/SDC+Photos/photo${photoId}.jpg`;
    return photoUrl;
}

// took over 1 hour and had to terminate it
// const generatePhotos = () => {
//   console.log('generatePhotos');
//   let out = fs.createWriteStream('./photosData.csv');
  
//   for (var i = 1; i < 30000001; i++) {
//     out.write(`${i},${faker.company.catchPhrase()},${generatePhotoUrl()},${randomNumberGen(1, 10000001)}\n`, 'utf-8');
//   }
//   out.end();
// }

// helper function
const createString = (i) => {
  return `${i},${faker.company.catchPhrase()},${generatePhotoUrl()},${randomNumberGen(1, 10000001)}\n`
}

// set stream equal to writer
let writer = fs.createWriteStream('./photosData.csv');

const createPhotos = function() {
  let i = 30000001;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 1) {
        // last time!
        writer.write(createString(i), 'utf-8');
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(createString(i), 'utf-8');
      }
    } while (i > 1 && ok);
    if (i > 1) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

const generateProperties = () => {
  console.log('generateProperties');
  let cities = ["Ad lanto", "Agoura Hills", "Alameda", "Albany", "Alhambra", "Aliso Viejo", "Alturas", "Amador City", "American Canyon", "Anaheim", "Anderson", "Angels Camp", "Antioch", "Apple Valley", "Arcadia", "Arcata", "Arroyo Grande", "Artesia", "Arvin", "Atascadero", "Atherton", "Atwater", "Auburn", "Avalon", "Avenal", "Azusa", "Bakersfield", "Baldwin Park", "Banning", "Barstow", "Beaumont", "Bell", "Bell Gardens", "Bellflower", "Belmont", "Belvedere", "Benicia", "Berkeley", "Beverly Hills", "Big Bear Lake", "Biggs", "Bishop", "Blue Lake", "Blythe", "Bradbury", "Brawley", "Brea", "Brentwood", "Brisbane", "Buellton", "Buena Park", "Burbank", "Burlingame", "Calabasas", "Calexico", "California City", "Calimesa", "Calipatria", "Calistoga", "Camarillo", "Campbell", "Canyon Lake", "Capitola", "Carlsbad", "Carmel-by-the-Sea", "Carpinteria", "Carson", "Cathedral City", "Ceres", "Cerritos", "Chico", "Chino", "Chino Hills", "Chowchilla", "Chula Vista", "Citrus Heights", "Claremont", "Clayton", "Clearlake", "Cloverdale", "Clovis", "Coachella", "Coalinga", "Colfax", "Colma", "Colton", "Colusa", "Commerce", "Compton", "Concord", "Corcoran", "Corning", "Corona", "Coronado", "Corte Madera", "Costa Mesa", "Cotati", "Covina", "Crescent City", "Cudahy", "Culver City", "Cupertino", "Cypress", "Daly City", "Dana Point", "Danville", "Davis", "Del Mar", "Del Rey Oaks", "Delano", "Desert Hot Springs", "Diamond Bar", "Dinuba", "Dixon", "Dorris", "Dos Palos", "Downey", "Duarte", "Dublin", "Dunsmuir", "East Palo Alto", "Eastvale", "El Cajon", "El Centro", "El Cerrito", "El Monte", "El Segundo", "Elk Grove", "Emeryville", "Encinitas", "Escalon", "Escondido", "Etna", "Eureka", "Exeter", "Fairfax", "Fairfield", "Farmersville", "Ferndale", "Fillmore", "Firebaugh", "Folsom", "Fontana", "Fort Bragg", "Fort Jones", "Fortuna", "Foster City", "Fountain Valley", "Fowler", "Fremont", "Fresno", "Fullerton", "Galt", "Garden Grove", "Gardena", "Gilroy", "Glendale", "Glendora", "Goleta", "Gonzales", "Grand Terrace", "Grass Valley", "Greenfield", "Gridley", "Grover Beach", "Guadalupe", "Gustine", "Half Moon Bay", "Hanford", "Hawaiian Gardens", "Hawthorne", "Hayward", "Healdsburg", "Hemet", "Hercules", "Hermosa Beach", "Hesperia", "Hidden Hills", "Highland", "Hillsborough", "Hollister", "Holtville", "Hughson", "Huntington Beach", "Huntington Park", "Huron", "Imperial", "Imperial Beach", "Indian Wells", "Indio", "Industry", "Inglewood", "Ione", "Irvine", "Irwindale", "Isleton", "Jackson", "Jurupa Valley", "Kerman", "King City", "Kingsburg", "La Cañada Flintridge", "La Habra", "La Habra Heights", "La Mesa", "La Mirada", "La Palma", "La Puente", "La Quinta", "La Verne", "Lafayette", "Laguna Beach", "Laguna Hills", "Laguna Niguel", "Laguna Woods", "Lake Elsinore", "Lake Forest", "Lakeport", "Lakewood", "Lancaster", "Larkspur", "Lathrop", "Lawndale", "Lemon Grove", "Lemoore", "Lincoln", "Lindsay", "Live Oak", "Livermore", "Livingston", "Lodi", "Loma Linda", "Lomita", "Lompoc", "Long Beach", "Loomis", "Los Alamitos", "Los Altos", "Los Altos Hills", "Los Angeles", "Los Banos", "Los Gatos", "Loyalton", "Lynwood", "Madera", "Malibu", "Mammoth Lakes", "Manhattan Beach", "Manteca", "Maricopa", "Marina", "Martinez", "Marysville", "Maywood", "McFarland", "Mendota", "Menifee", "Menlo Park", "Merced", "Mill Valley", "Millbrae", "Milpitas", "Mission Viejo", "Modesto", "Monrovia", "Montague", "Montclair", "Monte Sereno", "Montebello", "Monterey", "Monterey Park", "Moorpark", "Moraga", "Moreno Valley", "Morgan Hill", "Morro Bay", "Mount Shasta", "Mountain View", "Murrieta", "Napa", "National City", "Needles", "Nevada City", "Newark", "Newman", "Newport Beach", "Norco", "Norwalk", "Novato", "Oakdale", "Oakland", "Oakley", "Oceanside", "Ojai", "Ontario", "Orange", "Orange Cove", "Orinda", "Orland", "Oroville", "Oxnard", "Pacific Grove", "Pacifica", "Palm Desert", "Palm Springs", "Palmdale", "Palo Alto", "Palos Verdes Estates", "Paradise", "Paramount", "Parlier", "Pasadena", "Paso Robles", "Patterson", "Perris", "Petaluma", "Pico Rivera", "Piedmont", "Pinole", "Pismo Beach", "Pittsburg", "Placentia", "Placerville", "Pleasant Hill", "Pleasanton", "Plymouth", "Point Arena", "Pomona", "Port Hueneme", "Porterville", "Portola", "Portola Valley", "Poway", "Rancho Cordova", "Rancho Cucamonga", "Rancho Mirage", "Rancho Palos Verdes", "Rancho Santa Margarita", "Red Bluff", "Redding", "Redlands", "Redondo Beach", "Redwood City", "Reedley", "Rialto", "Richmond", "Ridgecrest", "Rio Dell", "Rio Vista", "Ripon", "Riverbank", "Riverside", "Rocklin", "Rohnert Park", "Rolling Hills", "Rolling Hills Estates", "Rosemead", "Roseville", "Ross", "Sacramento", "St. Helena", "Salinas", "San Anselmo", "San Bernardino", "San Bruno", "San Carlos", "San Clemente", "San Diego", "San Dimas", "San Fernando", "San Francisco", "San Gabriel", "San Jacinto", "San Joaquin", "San Jose", "San Juan Bautista", "San Juan Capistrano", "San Leandro", "San Luis Obispo", "San Marcos", "San Marino", "San Mateo", "San Pablo", "San Rafael", "San Ramon", "Sand City", "Sanger", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Fe Springs", "Santa Maria", "Santa Monica", "Santa Paula", "Santa Rosa", "Santee", "Saratoga", "Sausalito"];
  var adjectives = ["cosy", "rustic", "vintage", "traditional", "contemporary", "breath-taking", "charming", "elegant", "luxurious", "picturesque", "minimalistic", "modern", "brand-new", "classic", "cute", "magnificent", "huge", "downtown", "single family", "residential"]
  var nouns =  ["historic landmark", "home", "home warranty", "homeowners insurance", "homestead", "house", "house boat", "property", "ranch", 'house']
  var emotions =  ["a blessing", "a daily joy", "a dream boat", "a dream come true", "a goddess", "a heart throb", "a loving friend", "a real-life fantasy", "accepting", "adorable", "adventurous", "affectionate", "agreeable", "alluring", "always there for me", "amazing", "an angel", "angelic", "artistic", "attentive", "attractive", "awe-inspiring", "beautiful", "beloved", "bewitching", "blessed", "brave", "breathtaking", "bright", "brilliant", "candid", "captivating", "careful", "caring", "charming", "cheeky", "cheerful", "classy", "clever", "committed", "compassionate", "complex", "confident", "considerate", "courageous", "crafty", "creative", "cuddly", "cultured", "curious", "curvy", "cute", "daring", "darling", "dazzling", "dedicated", "delicate", "delightful", "dependable", "disciplined", "down-to-earth", "dreamy", "dynamic", "easy-going", "easy-to-love", "lovable", "loved", "lovely", "loving", "loyal", "luminous", "luscious", "magical", "magnetic", "mature", "mesmerizing", "mischievous", "motivated", "musical", "my baby doll", "my beloved", "my best friend", "my confidante", "my dearest", "my dream girl", "my dream guy", "my everything", "my fantasy", "my favorite person", "my happiness", "my honey", "my joy in life", "my life partner", "my longtime crush", "my main man", "my main squeeze", "my other half", "my partner in crime", "my playmate", "my pride and joy", "my sanity", "my soul mate", "my strength", "my sunshine", "mysterious", "narcotic", "naughty", "no drama", "nurturing", "one-of-a-kind", "open-minded", "opinionated", "passionate", "patient", "perceptive", "perfect", "personable", "petite", "playful", "poetic", "positive", "precious", "pretty", "principled", "provocative"];
  // let out = fs.createWriteStream('./')
  let out = fs.createWriteStream('./propertiesData.csv');
  // fs.writeFile('properties.csv',"listing name \n", (err)=> {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  let strIn = 'in'
  let counter = 1;
  for (var i = 0; i < emotions.length; i++) {
    for (var j = 0; j < adjectives.length; j++) {
      for (var k = 0; k < nouns.length; k++) {
        for (var l = 0; l < cities.length; l++) {
          // const sequence = emotions[i] + " " + adjectives[j] + " " + nouns[k] + " in " + cities[l] + "\n";
          out.write(`${counter},${emotions[i]} ${adjectives[j]} ${nouns[k]} ${strIn} ${cities[l]}\n`, 'utf-8');
          counter ++;
          // fs.appendFileSync('listingNames.csv', sequence, (err)=> {
          //   if (err) {
          //     console.log(err);
          //   }
          // });
        }
      }
    }
  }
  if (i % 1000000 === 0) {
    console.log('completed: ', i);
  }
}

const generateListings = () => {
  console.log('generateListings');
  const rl = readline('./propertiesData.csv', {
    retainBuffer: true
  });
  let out = fs.createWriteStream('./listingsData.csv');
  rl.on('line', (line) => {
    const lineStr = line.toString();
    const lineSplit = lineStr.split(',');
    out.write(`${lineSplit[0]},${lineSplit[1]},${randomNumberGen(1,5)},${faker.lorem.sentence()},${faker.name.firstName()} ${faker.name.lastName()}\,${faker.address.streetName()}\, ${faker.address.city()}\, ${faker.address.state()},${faker.image.avatar()},${faker.lorem.sentence()}\n`,'utf-8');
  });
}

// test to see if generateListings has the correct info
const testGenerateListings = () => {
  console.log('testGenerateListings');
  let out = fs.createWriteStream('./testList.csv');
  for (var i = 1; i < 101; i++) {
    out.write(`${i},${randomNumberGen(1,5)},${faker.lorem.sentence()},${faker.name.firstName()} ${faker.name.lastName()}\,${faker.address.streetName()}\, ${faker.address.city()}\, ${faker.address.state()},${faker.image.avatar()},${faker.lorem.sentence()}\n`, 'utf-8');
  }
  out.end();
}

const generateListingsLists = () => {
  console.log('generateListingsLists');
  let out = fs.createWriteStream('./listingsListsData.csv');
  for (var i = 1; i < 10000001; i++) {
    out.write(`${i},${i}\n`, 'utf-8');
  }
  out.end();
}

const generateLists = () => {
  console.log('generateLists');
  let out = fs.createWriteStream('./listsData.csv');
  for (var i = 1; i < 10000001; i++) {
    out.write(`${i},${faker.name.jobTitle()},${randomNumberGen(1,100000001)}\n`, 'utf-8');
  }
  out.end();
}

const generateUsers = () => {
  console.log('generateUsers');
  let out = fs.createWriteStream('./usersData.csv');
  for (var i = 1; i < 10000001; i++) {
    out.write(`${i},${faker.internet.userName()},${faker.date.past()},${faker.image.avatar()}\n`,'utf-8');
  }
  out.end();
}

// time node --max-old-space-size=8192 index.js


// generateProperties();
// generatePhotos();
// createPhotos();
// testGenerateListings();
// generateListings();
// generateListingsLists();
// generateLists();
// generateUsers();
