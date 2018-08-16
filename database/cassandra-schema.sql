DROP KEYSPACE IF EXISTS hero;
CREATE KEYSPACE hero WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE hero;

DROP TABLE IF EXISTS hero.users;
CREATE TABLE hero.users (
  id int PRIMARY KEY, 
  user_name text, 
  user_membership_date DATE ,
  user_photo_url text
);

./cassandra-loader -f /Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/usersData.csv -host 127.0.0.1 -schema "hero.users(id, user_name, user_membership_date, user_photo_url)";
-- COPY hero.users (id, user_name, user_membership_date, user_photo_url) FROM '/Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/usersData.csv' with delimiter=',';

-- ./cassandra-loader -f /Users/jordan_bice/documents/hack-reactor/sdc/comments/dataGen/data/cassandra.csv -host 127.0.0.1 -schema "soundofcloud.comments_replies_bySong(song_id, comment_id, reply_id, comment_author, comment_avatar, comment_timestamp, comment_text, reply_author, reply_avatar, reply_timestamp, reply_text)"


DROP TABLE IF EXISTS hero.lists;
CREATE TABLE hero.lists (
  id int PRIMARY KEY,
  list_name text, 
  list_user_id int
);

CREATE INDEX index_list_user_id ON hero.lists (list_user_id);

./cassandra-loader -f /Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/listsData.csv -host 127.0.0.1 -schema "hero.lists(id, list_name, list_user_id)";

-- COPY hero.lists (id, list_name, list_user_id) FROM '/Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/listsData.csv' with delimiter=',';

DROP TABLE IF EXISTS hero.listings;
CREATE TABLE hero.listings (
  id int PRIMARY KEY, 
  listing_name text,
  listing_review_average int,
  listing_review_total int,
  listing_host_name text,
  listing_address text, 
  listing_host_photo_url text,
  listing_description text,
  listing_space_description text, 
  listing_neighborhood_description text
);

./cassandra-loader -f /Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/listingsData.csv -host 127.0.0.1 -schema "hero.listings(id, listing_name, listing_review_average, listing_review_total, listing_host_name, listing_address, listing_host_photo_url, listing_description, listing_space_description, listing_neighborhood_description)";

-- COPY hero.listings (id, listing_name, listing_review_average, listing_review_total, listing_host_name, listing_address, listing_host_photo_url, listing_description, listing_space_description, listing_neighborhood_description) FROM '/Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/listingsData.csv' with delimiter=',';

DROP TABLE IF EXISTS hero.listings_lists;
CREATE TABLE hero.listings_lists (
  listing_id int PRIMARY KEY,
  list_id int 
);

-- CREATE INDEX index_listing_id ON hero.listings_lists (listing_id)
-- CREATE INDEX index_list_id ON hero.listings_lists(list_id)

-- COPY hero.listings_lists (listing_id, list_id) FROM '/Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/listingsListsData.csv' with delimiter=',';

./cassandra-loader -f /Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/listingsListsData.csv -host 127.0.0.1 -schema "hero.listings_lists(listing_id, list_id)";


DROP TABLE IF EXISTS hero.listing_photos;
CREATE TABLE hero.listing_photos (
  id int PRIMARY KEY, 
  photo_description text,
  photo_url text,
  photo_listing_id int
);

CREATE INDEX index_photo_listing_id ON hero.listing_photos(photo_listing_id);

./cassandra-loader -f /Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/photosData.csv -host 127.0.0.1 -schema "hero.listing_photos(id, photo_description, photo_url, photo_listing_id)";

-- COPY hero.listing_photos (id, photo_description, photo_url, photo_listing_id) FROM '/Users/serviolee/hackreactor/sdc/hero-photo-service/data-generator/photosData.csv' with delimiter=',';

-- seed TABLE



