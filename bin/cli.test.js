#!/usr/bin/env node
/*jshint node: true */
'use strict';

var path = require('path');
var exec = require('child_process').exec;
var app = path.resolve('bin/cli.js');
var should = require('should');

var checkCmdExecution = function(argsStr, checkSuccess, expectedOut, done) {
    exec(app + ' ' + argsStr, function(error, stdout, stderr) {
        if (checkSuccess) {
            if (error === null) {
              	if (expectedOut) {
      	            var outRegExp = new RegExp(expectedOut);

      	            if (stdout.match(outRegExp)) {
      	                done();
      	            }
              	} else {
              		  done();
              	}
            }
        } else {
            if (error !== null) {
                error.code.should.eql(1);
                if (expectedOut) {
                    var outRegExp = new RegExp(expectedOut);
                    if (stderr.match(outRegExp)) {
                        done();
                    }
                } else {
                    done();
                }
            }
        }
    });
};

describe('Test scmt', function() {
    it('Shows the general help', function(done) {
  	    checkCmdExecution('-h', true, '.*Usage: scmt.*', done);
    })

    it('Shows the json2schema help', function(done) {
  	    checkCmdExecution('json2schema -h', true, '.*Usage: json2schema.*', done);
    })

    it('Shows the json2yaml help', function(done) {
        checkCmdExecution('json2yaml -h', true, '.*Usage: json2yaml.*', done);
    })

    it('Shows the yaml2json help', function(done) {
        checkCmdExecution('yaml2json -h', true, '.*Usage: yaml2json.*', done);
    })

    it('Shows the validate help', function(done) {
        checkCmdExecution('validate -h', true, '.*Usage: validate.*', done);
    })

    it('Detects unknown option', function(done) {
        checkCmdExecution(' -x', false, '.*error: unknown option.*', done);
    })

   	it('Converts json2schema', function(done) {
        checkCmdExecution('json2schema ' + path.resolve('test/array.json'), true, null, done);
   	})

   	it('Converts json2yaml', function(done) {
        checkCmdExecution('json2yaml ' + path.resolve('test/array.json'), true, null, done);
   	})

   	it('Converts yaml2json', function(done) {
        checkCmdExecution('yaml2json ' + path.resolve('test/array.json'), true, null, done);
   	})

    it('Validate json with schema', function(done) {
        checkCmdExecution('validate ' + path.resolve('test/array.json') + ' ' + path.resolve('test/array-schema.json'), true, null, done);
    })

   	it('Validate json with wrong schema name', function(done) {
        checkCmdExecution('validate ' + path.resolve('test/array.json') + ' ' + path.resolve('wrong-schema-name'), false, null, done);
   	})
});