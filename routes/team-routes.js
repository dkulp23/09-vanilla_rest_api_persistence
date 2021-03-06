'use strict';

const storage = require(`${__dirname}/../lib/storage.js`);
const Team = require(`${__dirname}/../model/team.js`);
const response = require(`${__dirname}/../lib/response.js`);

module.exports = function(router) {
  router.post('/api/team', function(req, res) {
    try {
      var team = new Team(req.body.name, req.body.city);
      storage.createItem('team', team);
      response.sendJSON(res, 200, team);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
  router.get('/api/team', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('team', req.url.query.id)
      .then (team => {
        response.sendJSON(res, 200, team);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    storage.fectchAllTeams('team')
    .then (teams => {
      response.sendJSON(res, 200, teams);
    })
    .catch( err => {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    });
  });
  router.delete('/api/team', function(req, res) {
    if (req.url.query.id) {
      storage.deleteItem('team', req.url.query.id)
      .then( () => {
        response.sendText(res, 204, 'file deleted');
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
};
