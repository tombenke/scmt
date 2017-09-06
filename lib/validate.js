#!/usr/bin/env node
/*jshint node: true */
'use strict';

// var fs = require('fs');
var verbose = false;
var fs = require('fs');
var path = require('path');

// Load the YAML parser module
var jsyaml = require( 'js-yaml' );

// Load the JSON schema validator module and create a validator object
var JaySchema = require('jayschema');
var js = new JaySchema();
var _ = require('underscore');

/**
 * Load the named JSON schema
 * @param  {String} schemaFileName The name of the schema file
 * @return {Object}                The loaded schema
 */
var loadSchema = function(fullSchemaFileName) {
    // var scfPath = fullSchemaFileName.split('/');
    // var schemaFileName = scfPath[scfPath.length-1];
    var mainSchema = null;

    // First, register() the main schemas you plan to use.
    try {
        mainSchema = jsyaml.load(fs.readFileSync(path.resolve(fullSchemaFileName),'utf-8'));
        var missingSchemas = js.register(mainSchema);

        // Next, load the missing sub-schemas recursively
        missingSchemas.forEach(function(missingSchema) {
            loadSchema(missingSchema);
        });

        // console.log('loadSchema(%s): %s', fullSchemaFileName, JSON.stringify(mainSchema, null, '  '));
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    return mainSchema;
};

/**
 * Validate the 'content' object with the JSON schema from 'schemaFileName' file
 * @param  {Object} content        The object to validate
 * @param  {String} schemaFileName The name of the schema file
 * @return {Array}                 The list of errors ([] in case there was no error)
 */
var validate = function(content, schemaFileName) {
    var schema = loadSchema(schemaFileName);

    if (schema === null) {
        process.exit(1);
        // return [{
        //     Error: "Schema could not be loaded."
        // }];
    } else {
        // console.log('validate: ', JSON.stringify(content, null, '  '));
        return js.validate(content, schema);
    }
};


/**
 * TBD.
 * @param  {Object} config   Configuration parameters
 * @param  {bool} verbose    Work in verbose mode if `true`
 */
exports.execute = function(config, mode) {
    verbose = mode;

    var input = require(path.resolve(config.input));
    var result = validate(input, config.schema);
    if (result.length > 0) {
        console.log('\nValidation error:');
        _.map(result, function(err) {
            console.log('\n', JSON.stringify(err, null, '  '));
        })
    } else {
    	console.log('Successful validation.', result);
    }
};