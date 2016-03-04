#!/usr/bin/env node
/*jshint node: true */
'use strict';

// var fs = require('fs');
var verbose = false;
var path = require('path');
var file = require('./file.js');
var GenerateSchema = require('generate-schema')
var _ = require('underscore');

var decorateProperty = function(schemaProperty, key, obj) {
	// console.log('decorateProperty:', JSON.stringify(schemaProperty, null, ''));
	var decoratedSchemaProperty = schemaProperty;

	if (_.has(schemaProperty, 'type')) {

		if (schemaProperty.type ==='object') {
			decoratedSchemaProperty = decorateObject(schemaProperty);
		} else if (schemaProperty.type ==='array') {
			decoratedSchemaProperty = decorateArray(schemaProperty);
		}
	}
	decoratedSchemaProperty.description = "";
	return decoratedSchemaProperty;
}

var decorateProperties = function(schemaProperties) {
	// console.log('decorateProperties:', JSON.stringify(schemaProperties, null, ''));
	return _.each(schemaProperties, decorateProperty);
}

var decorateObject = function (schema) {
	// console.log('decorateObject:', JSON.stringify(schema, null, {}));
	var decoratedSchema = schema;

	if (_.has(schema, 'properties')) {
		decoratedSchema.properties = decorateProperties((schema.properties));
		decoratedSchema.required = _.keys(schema.properties);
	}
	decoratedSchema.description = "";

	return decoratedSchema;
}

var decorateArray = function (schema) {
	// console.log('decorateArray:', JSON.stringify(schema, null, ''));
	var decoratedSchema = schema;

	if (_.has(schema, 'items')) {
		decoratedSchema.items = decorateProperty((schema.items));
	}
	decoratedSchema.description = "";
	return decoratedSchema;
}

var decorateSchema = function (schema) {
	// console.log('decorateSchema:', JSON.stringify(schema, null, ''));
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

    var input = file.read(config.input);
    var schema = GenerateSchema.json(config.input + ' schema', input);

    // console.log(JSON.stringify(schema, null, '  '));
    var decoratedSchema = decorateSchema(schema);
    console.log(JSON.stringify(decoratedSchema, null, '  '));
};