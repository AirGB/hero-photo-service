# Hero Photo Service for AirGB

Backend of hero gallery module for vacation home rental reservation platform similar to Airbnb

## Related Projects

  - https://github.com/AirGB/reservation-service
  - https://github.com/AirGB/Review-service
  - https://github.com/AirGB/about-service
  - https://github.com/AirGB/JP-Proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

### GET request to the server to retrieve all the photos from a listing 

```sh
curl -X GET http://localhost:3000/api/listings/:listing_id/photos
```

### POST request to the server to add a new photo

```sh
curl - X POST http://localhost:3000/api/listings/:listing_id/photos
```

### UPDATE request to the server to update a photo

```sh
curl -X PUT http://localhost:3000/api/listings/:listing_id/photos/:photo_id
```

### DELETE request to the server delete a photo 

```sh
curl -X DELETE http://localhost:3000/api/listing/:listing_id/:photo_id
```


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
npm run react-dev

within the database directory, run schema.sql then run Populator.js to populate the database.
```



