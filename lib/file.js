#!/usr/bin/env node
/*jshint node: true */
'use strict';

// var fs = require('fs');
var verbose = false;
var fs = require('fs');
var path = require('path');

// Load the YAML parser module
var jsyaml = require( 'js-yaml' );

module.exports.read = function(fileName) {
	var content = null;

    try {
        content = jsyaml.load(fs.readFileSync(path.resolve(fileName),'utf-8'));
    } catch (err) {
        console.log(err);
        return err;
    }
    return content;
}
