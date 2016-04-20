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
    return Seats.find();
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
    // Return changes with newest at the front of the array
    return Session.get("observedChangesArray").reverse();
  },

  // Display a text representation of the Seat that changed
  changeEntry() {
    let changedDocJSON = JSON.stringify(this);

    changedDocJSON = changedDocJSON.replace(/{/g, '{\n\t');
    changedDocJSON = changedDocJSON.replace(/,/g, ',\n\t');
    changedDocJSON = changedDocJSON.replace(/:/g, ': ');
    changedDocJSON = changedDocJSON.replace(/}/g, '\n}');

    return changedDocJSON;
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

    // Toggle the seat's reservation status in the database
    Seats.update({ _id: this._id }, {
      row: this.row,
      number: this.number,
      reserved: (!this.reserved)
    });
  },
});

/**
  * When a change is detected, push it to the UI
  * by setting the Session variable used by the
  * observedChanges() template helper above
  */
Seats.find().observeChanges({
  changed: function (id, fields) {
    let changesArray = Session.get("observedChangesArray");
    let changedSeat = Seats.findOne({ _id: id });

    delete changedSeat._id;
    changesArray.push(changedSeat);
    Session.set("observedChangesArray", changesArray);
  }
});
