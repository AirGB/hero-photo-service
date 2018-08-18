const db = require ('./postgresql-index.js');

const getListingPhotos = (listingId, whenGotten) => {
  // console.log('database getlistingPhotos', listingId);
  const theQuery = `SELECT * FROM listing_photos WHERE photo_listing_id = ${listingId}`;
  db.query(theQuery, (err, res) => {
    if (err) {
      console.log('Database side error in retrieving data from the listing_photos table ', err);
      whenGotten(err);
    } else {
      console.log('Database side success in retriving data from the listing_photos table ', err);
      whenGotten(null, res);
    }
  });
};

// getListingPhotos(2, (err, res) =>{}); // testing

const addListingPhoto = (listingId, photoDescription, photoUrl, whenGotten) => {
  const query = `INSERT INTO listing_photos (photo_description, photo_url, photo_listing_id) VALUES ('${photoDescription}', '${photoUrl}', ${listingId})`;
  db.query (query, (err, res) => {
    if (err) {
      console.log('Database error adding photo', err);
    } else {
      console.log('Database success adding photo');
      whenGotten(null, res);
    }
  }) 
}

// addListingPhoto(10000000, 'sunset villa', 'www.test.com', (err, res) => {}); // testing

const getLists = (userId, whenGotten) => {
  const theQuery = `SELECT * FROM lists WHERE list_user_id = ${userId}`;
  db.query(theQuery, (err, res) => {
    if (err) {
      console.log('Database side error in retrieving data from the lists table ', err);
      whenGotten(err);
    } else {
      console.log('Database side success in retrieving data from the lists table ', res);
      whenGotten(null, res);
    }
  });
};

// getLists(4, (err, res) => {});
const addList = (userId, listName, whenDone) => {
  const theQuery = `INSERT INTO lists (list_name, list_user_id) VALUES ('${listName}', ${userId})`;
  db.query(theQuery, (err, res) => {
    if (err) {
      console.log('Database side error in inserting into the lists table');
      whenDone(err);
    } else {
      console.log('Database side success in inserting into the lists table');
      whenDone(null, res);
    }
  });
};

// addList(4, 'Ya know it', (err, res) => {});
const getListsOfListing = (listingId, whenGotten) => {
  const theQuery = `SELECT * FROM listings_lists WHERE listing_id = ${listingId}`;
  db.query(theQuery, (err, res) => {
    if (err) {
      console.log('Database side error in retrieving data from the listings_lists table ', err);
      whenGotten(err);
    } else {
      console.log('Databas side success in retrieving data from the listings_lists table ', res);
      whenGotten(null, res);
    }
  });
};

// getListsOfListing(90, (err, res) => {});

const addToFavorite = (listingId, listId, whenDone) => {
  const theQuery = `INSERT INTO listings_lists (listing_id, list_id) VALUES (${listingId}, ${listId})`;
  db.query(theQuery, (err, res) => {
    if (err) {
      console.log('Database side error in adding data to the listings_lists table ', err);
      whenDone(err);
    } else {
      console.log('Database side success in adding data to the listings_lists table ', res);
      whenDone(null, res);
    }
  });
};

// addToFavorite(100,100, ()=> {});

const removeFromFavorite = (listingId, listId, whenDone) => {
  const theQuery = `DELETE FROM listings_lists WHERE listing_id = ${listingId} AND list_id = ${listId}`;
  db.query(theQuery, (err, res) => {
    if (err) {
      console.log('Database side error in deleting data from the listings_lists table ', err);
      whenDone(err);
    } else {
      console.log('Database side success in deleting data from the listings_lists table ', res);
      whenDone(null, res);
    }
  });
};

// removeFromFavorite(100, 100, () => {});

const getListingDetails = (listingId, whenGotten) => {
  const theQuery = `SELECT * FROM listings WHERE id = ${listingId}`;
  db.query(theQuery, (err, res) => {
    if (err) {
      console.log('Database side error in retrieving data from the listings table ', err);
      whenGotten(err);
    } else {
      console.log('Databas side success in retrieving data from the listings table ', res);
      whenGotten(null, res);
    }
  });
};

// getListingDetails(13, () => {});

module.exports = {
  getListingPhotos,
  addListingPhoto,
  getLists,
  addList,
  getListsOfListing,
  addToFavorite,
  removeFromFavorite,
  getListingDetails,
};