// On the server, this sets up a MongoDB collection called activities; on the client, this creates a cache connected to the server collection.
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Interests = new Mongo.Collection('interests');

if (Meteor.isServer) {
  // Only publish interests that are public or belong to the current user
  Meteor.publish('interests', function interestsPublication() {
    return Interests.find({
  $or: [
    { private: { $ne: true } },
    { owner: this.userId },
  ],
});
  });
}

Meteor.methods({
  'interests.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a interest
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Interests.insert({
  text,
  createdAt: new Date(),
  owner: Meteor.userId(),
  username: Meteor.user().username,
});
},
'interests.remove'(interestId) {
check(interestId, String);

const interest = Interests.findOne(interestId);
if (interest.private && interest.owner !== Meteor.userId()) {
  // If the interest is private, make sure only the owner can delete it
  throw new Meteor.Error('not-authorized');
}

Interests.remove(interestId);
},
'interests.setChecked'(interestId, setChecked) {
check(interestId, String);
check(setChecked, Boolean);

const interest = Interests.findOne(interestId);
if (interest.private && interest.owner !== Meteor.userId()) {
  // If the interest is private, make sure only the owner can check it off
  throw new Meteor.Error('not-authorized');
}

Interests.update(interestId, { $set: { checked: setChecked } });
},
'interests.setPrivate'(interestId, setToPrivate) {
  check(interestId, String);
  check(setToPrivate, Boolean);

  const interest = Interests.findOne(interestId);

  // Make sure only the interest owner can make a interest private
  if (interest.owner !== Meteor.userId()) {
    throw new Meteor.Error('not-authorized');
  }

  Interests.update(interestId, { $set: { private: setToPrivate } });
},
});
