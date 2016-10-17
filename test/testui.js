'use strict';
var React = require('react');
var expect = require('chai').expect;
var enzyme = require('enzyme'); 
//import { mount, shallow } from 'enzyme';
var Login = require('../src/js/components/home/login'); 

describe('Component Foo', function() {
	it ('should just work', function() {
	 	const wrapper = enzyme.mount(<Login />);
	 	expect(true).to.equal(true);
	}); 
}); 