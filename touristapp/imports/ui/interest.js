import { Template } from 'meteor/templating';

import { Interests } from '../api/interests.js';

import './interest.html';

Template.interest.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Interests.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Interests.remove(this._id);
  },
});
