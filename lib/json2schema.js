#!/usr/bin/env node
/*jshint node: true */
'use strict';

// var fs = require('fs');
var verbose = false;
var path = require('path');
var GenerateSchema = require('generate-schema')
var _ = require('underscore');

var decorateProperty = function(schemaProperty, key, obj) {
	// console.log('decorateProperty: ', schemaProperty, key, obj);

	if (_.has(schemaProperty, 'type') && schemaProperty.type ==='object') {
		schemaProperty = decorateObject(schemaProperty);
	}
	schemaProperty.description = "";

	return schemaProperty;
}

var decorateProperties = function(schemaProperties) {
	// console.log('decorateProperties:', schemaProperties);
	return _.each(schemaProperties, decorateProperty);
}

var decorateObject = function (schema) {
	var decoratedSchema = schema;

	if (_.has(schema, 'properties')) {
		decoratedSchema.properties = decorateProperties((schema.properties));
		decoratedSchema.required = _.keys(schema.properties);
	}
	decoratedSchema.description = "";

	return decoratedSchema;
}

var decorateArray = function (schema) {
	var decoratedSchema = schema;

	if (_.has(schema, 'properties')) {
		decoratedSchema.items = decorateProperties((schema.properties));
		// decoratedSchema.required = _.keys(schema.properties);
	}
	decoratedSchema.description = "";
	return decoratedSchema;
}

var decorateSchema = function (schema) {
	var decoratedSchema = schema;

	if (_.has(schema, 'type') ) {
		if (schema.type ==='object') {
			decoratedSchema = decorateObject(schema);
		} else if (schema.type ==='array') {
			decoratedSchema = decorateArray(schema);
		}
	}
	return decoratedSchema;
}

/**
 * TBD.
 * @param  {Object} config   Configuration parameters
 * @param  {bool} verbose    Work in verbose mode if `true`
 */
exports.execute = function(config, mode) {
    verbose = mode;

    var input = require(path.resolve(config.input));
    var schema = GenerateSchema.json('Schema Name', input);

    // console.log(JSON.stringify(schema, null, '  '));
    var decoratedSchema = decorateSchema(schema);
    console.log(JSON.stringify(decoratedSchema, null, '  '));
};