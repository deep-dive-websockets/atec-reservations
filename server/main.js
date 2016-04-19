import { Meteor } from 'meteor/meteor';

import { Seats } from '../imports/api/seats.js';

Meteor.startup(() => {
  //
});

if (Seats.find().count() === 0) {
  const numberRows = 10;
  const nubmerSeatsPerRow = 10;

  for(let rowNumber = 0; rowNumber < numberRows; rowNumber++)
  {
    // Nested for loop, yeah I know; we can clean this up later
    for(let seatNumber = 0; seatNumber < nubmerSeatsPerRow; seatNumber++)
    {
      const rowLetter = String.fromCharCode(65 + rowNumber);

      Seats.insert({
        "row": rowLetter,
        "number": (seatNumber + 1),
        "reserved": false
      });
    }
  }
}
