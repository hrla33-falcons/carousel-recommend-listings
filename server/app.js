const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3000;
const Listing = require('../db').Listing;

// Seed database
require('../db/seed').seed();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
// TODO: Add necessary middleware
// TODO: Refactor request
app.get('/:id', (req, res) => {
  let listingID = req.params.id;
  Listing.find({listingID: listingID}, (err, listing) => {
    if (err) {
      return res.status(404).end();
    }
    res.status(200).send(listing);
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
