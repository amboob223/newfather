CREATE DATABASE pop;

CREATE TABLE health(
    id SERIAL PRIMARY KEY, 
    doctorName VARCHAR (255),
    doctorNum INTEGER,
    appointments VARCHAR[],
    feedtimes VARCHAR[],
    diaperCount INTEGER
);

CREATE TABLE wealth(
    id SERIAL PRIMARY KEY,
    cryptoName VARCHAR(255),
    cryptoPrice INTEGER,
    stockName VARCHAR(255),
    stockPrice INTEGER
);

CREATE TABLE shelf(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    birthdate INTEGER,
    pic BYTEA
);

ALTER TABLE health
ALTER COLUMN doctorNum TYPE VARCHAR(255);


ALTER TABLE health
ALTER COLUMN feedtimes TYPE VARCHAR(255) USING feedtimes[1]::VARCHAR;
