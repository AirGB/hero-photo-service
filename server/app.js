const nr = require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const Queries = require('../database/Queries.js');
const psql = require('../database/postgresql-queries.js');
const responseTime = require('response-time');
const axios = require('axios');
const redis = require('redis');

const app = express();

// create a new redis client and connect to our local redis instance
var client = redis.createClient(6379, '54.191.178.210');

// if an error occurs, print it to the console
client.on('error', function(err) {
  console.log("Error " + err);
});

// app.set('port', (process.env.PORT || 3000));

app.use(responseTime());
// app.use((req, res, next) => {
//   console.log('Request method: ', req.method);
//   next();
// });

// access the static files
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.json());

app.get('/listings/:listing_id/photos', (req, res) => {
  const listingId = req.params.listing_id;

  // query the database to get all data from the listing_photos table
  // console.log(listingId)
  client.get(listingId, (error, result) => {
    if (result) {
      res.json(result.rows);
    } else {
      psql.getListingPhotos(listingId, (err, result) => {
        if (err) {
          console.log('Server side error in query to get data from the listings_data table', err);
          res.status(500);
        } else {
          // console.log('Server side success in query to get data from the listings_data table');
          // console.log(results.rows);
          client.setex(listingId, 180, JSON.stringify(result.rows));
          res.json(result.rows);
        }
      });
    }
  })
  // res.send(200);
});

app.post('/listings/:listing_id/photos', (req, res) => {
  const listingId = req.params.listing_id;
  const photoDescription = req.body.photo_description;
  const photoUrl = req.body.photo_url;
  psql.addListingPhoto(listingId, photoDescription, photoUrl, (err, results) => {
    if (err) {
      console.log('Server error adding photo', err);
      res.status(500);
    } else {
      // console.log('Server success adding photo');
      res.sendStatus(201);
    }
  })
})

app.delete('/listings/:listing_id/photos/:photo_id', (req, res) => {
  const photoId = req.params.photo_id;
  psql.deleteListingPhoto(photoId, (err, results) => {
    if (err) {
      console.log('Server error deleting photo', err);
      res.status(500);
    } else {
      // console.log('Server success adding photo');
      res.sendStatus(201);
    }
  }) 
})

app.put('/listings/:listing_id/photos/:photo_id', (req, res) => {
  const photoId = req.params.photo_id;
  const photoDescription = req.body.photo_description;
  const photoUrl = req.body.photo_url;
  psql.updateListingPhoto(photoId, photoDescription, photoUrl, (err, results) => {
    if (err) {
      console.log('Server error updating photo', err);
      res.status(500);
    } else {
      // console.log('Server success updating photo');
      res.sendStatus(200);
    }
  })
})

app.get('/users/:user_id/list', (req, res) => {
  const userId = req.params.user_id;
  // query the database to get all data from the lists table
  psql.getLists(userId, (err, results) => {
    if (err) {
      console.log('Server side error in query to get data from the lists table ', err);
      res.status(500);
    } else {
      // console.log('Server side success in query to get data from the lists table ');
      res.json(results.rows);
    }
  });
});


app.post('/users/:user_id/lists/new', (req, res) => {
  const userId = req.params.user_id;
  const listName = req.body.list_name;
  // querty the database to insert the new list into the lists table
  psql.addList(userId, listName, (err, results) => {
    if (err) {
      console.log('Server side error in query to add list to the lists table ', err);
      res.status(500);
    } else {
      // console.log('Server side success in query to add list to the lists table ');
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
      res.status(500);
    } else {
      // console.log('Server side success in querrying listings_lists');
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
      res.status(500);
    } else {
      // console.log('Server side success in query to add to the listings_lists table ');
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
      res.status(500);
    } else {
      // console.log('Server side success in query to delete from the listings_lists table ');
      res.sendStatus(200);
    }
  });
});

app.get('/listings/:listing_id/details', (req, res) => {
  const listingId = req.params.listing_id;

  psql.getListingDetails(listingId, (err, results) => {
    if (err) {
      console.log('Server side error in querying listings');
      res.status(500);
    } else {
      // console.log('Server side success in querrying listings');
      res.json(results.rows);
    }
  });
});

module.exports = app;
