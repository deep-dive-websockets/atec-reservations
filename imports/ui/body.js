/** This file powers most of what happens on the client (browser) **/

/** These directives import classes we are going to use **/
import { Template } from 'meteor/templating';
import { Rooms } from '../api/rooms.js';

/** This imports the content of our page **/
import './body.html';

/**
  * Helpers are used in the content of the
  * page to do things like provide data
  */
Template.body.helpers({

  // Returns all rooms and their statuses from the database
  rooms() {
    return Rooms.find({});
  },
});

/**
  * Helpers are used in the content of the
  * page to do things like provide data
  */
Template.body.events({

  // Fires when a room (<area>) on the map is clicked
  'click area'(event) {

    // Prevent the browser from navigating anywhere
    event.preventDefault();

    // Get the name of the room that was clicked
    const roomName = event.target.hash.substring(1);

    // Check if this room already exists in the database
    let matchingRoom = Rooms.findOne({
      name: roomName
    });

    // If the room doesn't exist yet, create it
    if (typeof(matchingRoom) === 'undefined')
    {
      Rooms.insert({
        name: roomName,
        reserved: false
      });

      // Point the room variable to our newly created room
      matchingRoom = Rooms.findOne({
        name: roomName
      });
    }

    // Toggle the room's reservation status in the database
    Rooms.update({ _id: matchingRoom._id }, {
      name: roomName,
      reserved: (!matchingRoom.reserved)
    });
  },
});
