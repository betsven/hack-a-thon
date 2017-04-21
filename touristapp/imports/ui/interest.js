import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import './interest.html';

Template.interest.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.interest.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('interests.setChecked', this._id, !this.checked);

  },
  'click .delete'() {
    Meteor.call('interests.remove', this._id);
  },

  'click .toggle-private'() {
   Meteor.call('interests.setPrivate', this._id, !this.private);
 },
});
