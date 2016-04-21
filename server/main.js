import { Meteor } from 'meteor/meteor';

import { Seats } from '../imports/api/seats.js';

Meteor.startup(() => {
  // Seed the Seat collection if it's currently empty
  if (Seats.find().count() === 0) {
    const numberRows = 10;
    const nubmerSeatsPerRow = 10;

    for(let rowNumber = 0; rowNumber < numberRows; rowNumber++)
    {
      // Nested for loop, yeah I know; we can clean this up later
      for(let seatNumber = 0; seatNumber < nubmerSeatsPerRow; seatNumber++)
      {
        Meteor.call('seats.insert',
          String.fromCharCode(65 + rowNumber), // Row Letter
          (seatNumber + 1), // Row Number
          false, // Reserved Status
          '' // Attendee Name
        );
      }
    }
  }
});
