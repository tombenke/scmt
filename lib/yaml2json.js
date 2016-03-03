#!/usr/bin/env node
/*jshint node: true */
'use strict';

// var fs = require('fs');
var verbose = false;
var fs = require('fs');
var path = require('path');

// Load the YAML parser module
var jsyaml = require( 'js-yaml' );

var readYaml = function(yamFileName) {
	var content = null;

    try {
        content = jsyaml.load(fs.readFileSync(path.resolve(yamFileName),'utf-8'));
    } catch (err) {
        console.log(err);
        return err;
    }
    return content;
}

/**
 * TBD.
 * @param  {Object} config   Configuration parameters
 * @param  {bool} verbose    Work in verbose mode if `true`
 */
exports.execute = function(config, mode) {
    verbose = mode;

    var input = readYaml(config.input);
    console.log(JSON.stringify(input, null, '  '));
};