import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';
import { Peer } from '../node_modules/simple-peer';

import './main.html';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });

// var Peer = require('simple-peer');

Template.hello.onCreated(
	function helloOnCreated() {
		
		this.p = new Peer({ initiator: location.hash === '#1', trickle: false });
		 
		this.p.on('error', function (err) { console.log('error', err); });
		 
		this.p.on('signal', function (data) {
		  console.log('SIGNAL', JSON.stringify(data));
		  document.querySelector('#outgoing').textContent = JSON.stringify(data);
		});
		 
		// document.querySelector('form').addEventListener('submit', function (ev) {
		//   ev.preventDefault();
		//   console.log('Submit .... ');
		//   p.signal(JSON.parse(document.querySelector('#incoming').value));
		// });
		 
		this.p.on('connect', function () {
		  console.log('CONNECT');
		  this.p.send('whatever' + Math.random());
		});
		 
		this.p.on('data', function (data) {
		  console.log('data: ' + data);
		});
	}
);

Template.hello.events({
	'click button'(event, instance) {
		ev.preventDefault();
		console.log('Submit .... ');
		this.p.signal(JSON.parse(document.querySelector('#incoming').value));
	}
});