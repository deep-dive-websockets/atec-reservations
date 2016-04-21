import { Mongo } from 'meteor/mongo';
 
export const Seats = new Mongo.Collection('seats');

if (Meteor.isServer)
{
  // Publish changes to the WebSocket channel
  Meteor.publish('seats', function seatsPublication() {
    return Seats.find();
  });
}
