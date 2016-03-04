#!/usr/bin/env node
/*jshint node: true */
'use strict';

// var fs = require('fs');
var verbose = false;
var fs = require('fs');
var path = require('path');
var file = require('./file.js');

/**
 * TBD.
 * @param  {Object} config   Configuration parameters
 * @param  {bool} verbose    Work in verbose mode if `true`
 */
exports.execute = function(config, mode) {
    verbose = mode;

    var input = file.read(config.input);
    console.log(JSON.stringify(input, null, '  '));
};