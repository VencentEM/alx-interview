#!/usr/bin/node

const request = require('request');

const fetchCharacterNames = async (url) => {
  try {
    const res = await new Promise((resolve, reject) => {
      request(url, (err, res, body) => {
        if (err) reject(err);
        resolve(JSON.parse(body));
      });
    });
    return res.characters;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const fetchCharacterData = async (characterUrl) => {
  try {
    const res = await new Promise((resolve, reject) => {
      request(characterUrl, (err, res, body) => {
        if (err) reject(err);
        resolve(JSON.parse(body).name);
      });
    });
    return res;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const main = async () => {
  try {
    const movieId = process.argv[2];
    const filmUrl = `https://swapi-api.hbtn.io/api/films/${movieId}`;
    const characters = await fetchCharacterNames(filmUrl);

    for (const character of characters) {
      const name = await fetchCharacterData(character);
      console.log(name);
    }
  } catch (err) {
    console.error('Error fetching data: ', err);
  }
};

main();

