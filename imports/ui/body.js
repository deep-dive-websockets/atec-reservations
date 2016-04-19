/** This file powers most of what happens on the client (browser) **/

/** These directives import classes we are going to use **/
import { Template } from 'meteor/templating';
import { Seats } from '../api/seats.js';

/** This imports the content of our page **/
import './body.html';

/**
  * Helpers are used in the content of the
  * page to do things like provide data
  */
Template.body.helpers({

  // Returns all seats and their statuses from the database
  seats() {
    return Seats.find({});
  },

  // Determines the appropriate class to use for the seat button
  seatClass() {
    let cssClass = "vacant";

    if (this.reserved)
    {
      cssClass = "reserved";
    }

    return cssClass;
  }
});

/**
  * Helpers are used in the content of the
  * page to do things like provide data
  */
Template.body.events({

  // Fires when a seat (<button>) on the map is clicked
  'click button'(event) {

    // Prevent the browser from navigating anywhere
    event.preventDefault();

    // Get instance of the Seat in the database
    let selectedSeat = Seats.findOne({ _id: this._id });

    // Toggle the seat's reservation status in the database
    Seats.update({ _id: selectedSeat._id }, {
      row: selectedSeat.row,
      number: selectedSeat.number,
      reserved: (!selectedSeat.reserved)
    });
  },
});
