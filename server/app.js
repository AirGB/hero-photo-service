const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const Queries = require('../database/Queries.js');
const psql = require('../database/postgresql-queries.js');

const app = express();

app.use((req, res, next) => {
  console.log('Request method: ', req.method);
  next();
});

// access the static files
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.json());

app.get('/listings/:listing_id/photos', (req, res) => {
  const listingId = req.params.listing_id;
  // query the database to get all data from the listing_photos table
  // console.log(listingId)
  psql.getListingPhotos(listingId, (err, results) => {
    if (err) {
      console.log('Server side error in query to get data from the listings_data table', err);
    } else {
      console.log('Server side success in query to get data from the listings_data table');
      // console.log(results.rows);
      res.json(results.rows);
    }
  });
  // res.send(200);
});

app.post('/listings/:listing_id/photos', (req, res) => {
  const listingId = req.params.listing_id;
  const photoDescription = req.body.photo_description;
  const photoUrl = req.body.photo_url;
  psql.addListingPhoto(listingId, photoDescription, photoUrl, (err, results) => {
    if (err) {
      console.log('Server error adding photo', err);
    } else {
      console.log('Server success adding photo');
      res.sendStatus(201);
    }
  })
})

app.delete('/listings/photos/:photo_id', (req, res) => {
  const photoId = req.params.photo_id;
  psql.deleteListingPhoto(photoId, (err, results) => {
    if (err) {
      console.log('Server error deleting photo', err);
    } else {
      console.log('Server success adding photo');
      res.sendStatus(201);
    }
  }) 
})

app.put('/listings/photos/:photo_id', (req, res) => {
  const photoId = req.params.photo_id;
  const photoDescription = req.body.photo_description;
  const photoUrl = req.body.photo_url;
  psql.updateListingPhoto(photoId, photoDescription, photoUrl, (err, results) => {
    if (err) {
      console.log('Server error updating photo', err);
    } else {
      console.log('Server success updating photo');
      res.sendStatus(201);
    }
  })
})

app.get('/users/:user_id/list', (req, res) => {
  const userId = req.params.user_id;
  // query the database to get all data from the lists table
  psql.getLists(userId, (err, results) => {
    if (err) {
      console.log('Server side error in query to get data from the lists table ', err);
    } else {
      console.log('Server side success in query to get data from the lists table ');
      res.json(results.rows);
    }
  });
});


app.post('/users/:user_id/addList', (req, res) => {
  const userId = req.params.user_id;
  const listName = req.body.list_name;
  // querty the database to insert the new list into the lists table
  psql.addList(userId, listName, (err, results) => {
    if (err) {
      console.log('Server side error in query to add list to the lists table ', err);
    } else {
      console.log('Server side success in query to add list to the lists table ', res);
      res.sendStatus(201);
    }
  });
});

app.get('/listings/:listing_id/lists', (req, res) => {
  const listingId = req.params.listing_id;
  // query the database
  psql.getListsOfListing(listingId, (err, results) => {
    if (err) {
      console.log('Server side error in querying listings-lists');
    } else {
      console.log('Server side success in querrying listings_lists');
      res.json(results.rows);
    }
  });
});

app.post('/listings/:listing_id/lists/:list_id', (req, res) => {
  const listingId = req.params.listing_id;
  const listId = req.params.list_id;

  console.log('listingId is ', listingId);
  console.log('listId is ', listId);

  psql.addToFavorite(listingId, listId, (err, results) => {
    if (err) {
      console.log('Server side error in query to add to the listings_lists table ', err);
    } else {
      console.log('Server side success in query to add to the listings_lists table ', results);
      res.sendStatus(201);
    }
  });
});

app.delete('/listings/:listing_id/lists/:list_id', (req, res) => {
  const listingId = req.params.listing_id;
  const listId = req.params.list_id;

  console.log('listingId is ', listingId);
  console.log('listId is ', listId);

  psql.removeFromFavorite(listingId, listId, (err, results) => {
    if (err) {
      console.log('Server side error in query to delete from the listings_lists table ', err);
    } else {
      console.log('Server side success in query to delete from the listings_lists table ', results);
      res.sendStatus(200);
    }
  });
});

app.get('/listings/:listing_id/details', (req, res) => {
  const listingId = req.params.listing_id;

  psql.getListingDetails(listingId, (err, results) => {
    if (err) {
      console.log('Server side error in querying listings');
    } else {
      console.log('Server side success in querrying listings');
      res.json(results.rows);
    }
  });
});

module.exports = app;
