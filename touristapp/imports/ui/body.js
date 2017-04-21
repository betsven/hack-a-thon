import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Interests } from '../api/interests.js';

import './interest.js';
import './body.html';



Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('interests');
});

  Template.body.helpers({
    interests() {
      const instance = Template.instance();
      if (instance.state.get('hideCompleted')) {
        // If hide completed is checked, filter tasks
        return Interests.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
      }
      // Otherwise, return all of the interests
  return Interests.find({}, { sort: { createdAt: -1 } });
},

incompleteCount() {
  return Interests.find({ checked: { $ne: true } }).count();
},
});

Template.body.events({
  'submit .new-interest'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;


    // Insert a interest into the collection
    Meteor.call('interests.insert', text);


    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
  instance.state.set('hideCompleted', event.target.checked);
},
});
