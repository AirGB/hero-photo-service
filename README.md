# Hero Photo Service for AirGB

> Project description

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

> Some usage instructions

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

## GET request to the server to retrieve all the photos from a listing 

curl -X GET http://localhost:3000/api/listings/:listing_id/photos

## POST request to the server to add a new photo

curl - X POST http://localhost:3000/api/listings/:listing_id/photos/new

## UPDATE request to the server to update a photo

curl -X PUT http://localhost:3000/api/listings/:listing_id/photos/update

## DELETE request to the server delete a photo 

curl -X DELETE http://localhost:3000/api/listing/:listing_id/delete


