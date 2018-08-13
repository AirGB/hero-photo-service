CREATE TABLE users (
  id INT PRIMARY KEY,
  user_name TEXT NOT NULL, 
  user_membership_date date NOT NULL,
  user_photo_url TEXT NOT NULL
);



CREATE TABLE lists (
  id INT PRIMARY KEY,
  list_name TEXT NOT NULL,
  list_user_id INT NOT NULL
);



CREATE TABLE listings (
  id INT PRIMARY KEY,
  listing_name TEXT, 
  listing_review_average INT,
  listing_review_total INT,
  listing_host_name TEXT,
  listing_address TEXT, 
  listing_host_photo_url TEXT,
  listing_description TEXT,
  listing_space_description TEXT, 
  listing_neighborhood_description TEXT
);



CREATE TABLE listings_lists (
  listing_id INT NOT NULL, 
  list_id INT NOT NULL
);



CREATE TABLE listing_photos (
  id INT PRIMARY KEY,
  photo_description TEXT,
  photo_url TEXT,
  photo_listing_id INT NOT NULL
);

-- copy csv files into correct table
COPY users (id, user_name, user_membership_date, user_photo_url) FROM '/Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/usersData.csv' DELIMITER ',' CSV;

COPY lists (id, list_name, list_user_id) FROM '/Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/listsData.csv' DELIMITER ',' CSV;

COPY listings (id, listing_name, listing_review_average, listing_review_total, listing_host_name, listing_address, listing_host_photo_url, listing_description, listing_space_description, listing_neighborhood_description) FROM '/Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/listingsData.csv' DELIMITER ',' CSV;

COPY listings (id, listing_name, listing_review_average, listing_review_total, listing_host_name, listing_address, listing_host_photo_url, listing_description, listing_space_description, listing_neighborhood_description) FROM '/Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/listingsData.csv' DELIMITER ',' CSV;


COPY listings_lists (listing_id, list_id) FROM '/Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/listingsListsData.csv' DELIMITER ',' CSV;

COPY listing_photos (id, photo_description, photo_url, photo_listing_id) FROM '/Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/photosData.csv' DELIMITER ',' CSV;





  
  



