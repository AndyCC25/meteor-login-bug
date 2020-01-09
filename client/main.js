import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { Messages } from '../imports/messages';

import './main.html';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Template.hello.onCreated(function helloOnCreated() {
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Messages.find({}).count();
  },
});

Accounts.onLogin(() => {
  console.log('Logged into the application');
  Messages.insert({
    userId: Meteor.userId(),
    message: 'user logged into the application',
  });
});

Accounts.onLogout(() => {
  console.log('Logout of application');
});

