import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Seats = new Mongo.Collection('seats');

if (Meteor.isServer)
{
  // Publish changes to the WebSocket channel
  Meteor.publish('seats', function seatsPublication() {
    return Seats.find();
  });
}

Meteor.methods({
  'seats.insert'(row, number, reserved, name) {
    check(row, String);
    check(number, Number);
    check(reserved, Boolean);
    check(name, String);
 
    Seats.insert({
      row: row,
      number: number,
      reserved: reserved,
      name: name
    });
  },

  'seats.setReserved'(seatId, reserved, name = '') {
    check(seatId, String);
    check(reserved, Boolean);
    check(name, String);
 
    Seats.update(seatId, {
      $set: {
        reserved: reserved,
        name: name
      }
    });
  },
});
