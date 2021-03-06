scmt
====

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)
[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coveralls][BadgeCoveralls]][Coveralls]

## About

This is a simple 'Schema Manager Tool' to do conversion among several formats, and help to create schemas.

## Installation

Run the install command:

    npm install scmt -g

Check if scmt is properly installed:

    $ scmt -h

	Usage: scmt [options] [command]

	Commands:

	    json2schema [options] <input> Generate from the "input" JSON file a JSON schema
	    json2yaml [options] <input> Convert the "input" JSON file to YAML format
	    yaml2json [options] <input> Convert the "input" YAML file to JSON format
	    validate [options] <input> <schema> Validate the"input" JSON file with the "schema" JSON schema

	Options:

	    -h, --help     output usage information

## Get Help

This project was generated by the
[kickoff](https://github.com/tombenke/kickoff) utility.

[npm-badge]: https://badge.fury.io/js/scmt.svg
[npm-url]: https://badge.fury.io/js/scmt
[travis-badge]: https://api.travis-ci.org/tombenke/scmt.svg
[travis-url]: https://travis-ci.org/tombenke/scmt
[Coveralls]: https://coveralls.io/github/tombenke/scmt?branch=master
[BadgeCoveralls]: https://coveralls.io/repos/github/tombenke/scmt/badge.svg?branch=master

