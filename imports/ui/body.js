/** This file powers most of what happens on the client (browser) */

/** These directives import classes we are going to use */
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Seats } from '../api/seats.js';

/** This imports the content of our page */
import './body.html';

/** Variable to hold changes seen in this session */
Session.setDefault("observedChangesArray", []);

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
  },

  // Returns the changes observed during the current session
  observedChanges() {
    return Session.get("observedChangesArray");
  },

  // Display a text representation of the Seat that changed
  changeEntry() {
    return JSON.stringify(this);
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

Seats.after.update(function(userId, doc, fieldNames, modifier, options) {
  let tempChangesArray = Session.get("observedChangesArray");
  tempChangesArray.push(doc);
  Session.set("observedChangesArray", tempChangesArray);
});
