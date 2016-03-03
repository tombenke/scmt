#!/usr/bin/env node
/*jshint node: true */
'use strict';

// var fs = require('fs');
var verbose = false;
var path = require('path');

// Load the YAML parser module
var jsyaml = require( 'js-yaml' );

/**
 * TBD.
 * @param  {Object} config   Configuration parameters
 * @param  {bool} verbose    Work in verbose mode if `true`
 */
exports.execute = function(config, mode) {
    verbose = mode;

    var input = require(path.resolve(config.input));
    console.log(jsyaml.safeDump(input));
};