#!/usr/bin/node

const request = require('request');

const fetchCharacterNames = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) reject(err);
      resolve(JSON.parse(body).characters);
    });
  });
};

const fetchCharacterData = (characterUrl) => {
  return new Promise((resolve, reject) => {
    request(characterUrl, (err, res, body) => {
      if (err) reject(err);
      resolve(JSON.parse(body).name);
    });
  });
};

const main = async () => {
  const movieId = process.argv[2];
  const filmUrl = `https://swapi-api.hbtn.io/api/films/${movieId}`;

  try {
    const characters = await fetchCharacterNames(filmUrl);
    
    for (const character of characters) {
      const name = await fetchCharacterData(character);
      console.log(name);
    }
  } catch (err) {
    console.error('Error:', err);
  }
};

main();

