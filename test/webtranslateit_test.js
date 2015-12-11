'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.webtranslateit = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  example: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/example/es.json');
    var expected = grunt.file.read('test/expected/es.json');
    test.equal(actual, expected, 'should be equals');

    
    actual = grunt.file.read('tmp/example/en.json');
    expected = grunt.file.read('test/expected/en.json');

    test.equal(actual, expected, 'should be equals');

    test.done();
  },
  single: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/single/es.json');
    var expected = grunt.file.read('test/expected/es.json');
    test.equal(actual, expected, '"es.json" is generated as expected');

    
    actual = grunt.file.exists('tmp/single/en.json');
    test.equal(actual, false, '"en.json" is not generated');

    test.done();
  }
};
