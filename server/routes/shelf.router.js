const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  const queryString = `SELECT * FROM "item";`;
  pool.query(queryString)
    .then(response => {
      res.send(response.rows);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const queryString = `
    INSERT INTO "item" ("description", "image_url", "user_id")
    VALUES ($1, $2, $3);
  `;
  console.log('this is the reqbody', req.body);
  console.log(req.user);
  pool.query(queryString, [req.body.description, req.body.image_url, req.user.id])
    .then(response => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:userId/:itemId', (req, res) => {
  // endpoint functionality
  let userID = Number(req.params.userId);
  let itemID = req.params.itemId;
  if (req.user.id !== userID) {
    console.log('user ID attached to item', req.params.userId);
    console.log('user ID who asked for delete', req.user.id);
    console.log('User ID does not match item');
    res.sendStatus(403);
    return;
  }
  const queryString = `DELETE FROM "item" WHERE "id"=$1;`;
  pool.query(queryString, [itemID])
    .then(response => {
      res.sendStatus(204);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })

});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
