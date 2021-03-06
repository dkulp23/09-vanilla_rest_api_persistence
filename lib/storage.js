'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!item) return Promise.reject(new Error('expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('schema expected'));
  if (!id) return Promise.reject(new Error('id expected'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( data => {
    try {
      let foundItem = JSON.parse(data);
      return foundItem;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch( err => Promise.reject(err));
};

exports.deleteItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('schema expected'));
  if (!id) return Promise.reject(new Error('id expected'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then()
  .catch( err => Promise.reject(err));
};

exports.fetchAllTeams = function(schemaName) {
  if(!schemaName) return Promise.reject(new Error('schema expected'));

  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
  .then( teams => {
    try {
      let teamNames = teams.join(', ');
      return teamNames;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch( err => Promise.reject(err));
};
