import { Template } from 'meteor/templating';
 
import { Rooms } from '../api/rooms.js';
 
import './body.html';
 
Template.body.helpers({
  rooms() {
    return Rooms.find({});
  },
});

Template.body.events({
  // When clicking a room
  'click area'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const roomName = target.hash.substring(1);

    let matchingRoom = Rooms.findOne({
      name: roomName
    });

    if (typeof(matchingRoom) === 'undefined')
    {
      Rooms.insert({
        name: roomName,
        reserved: false
      });

      matchingRoom = Rooms.findOne({
        name: roomName
      });
    }
 
    Rooms.update({ _id: matchingRoom._id }, {
      name: roomName,
      reserved: (!matchingRoom.reserved)
    });
  },
});
