"use strict";

var assert = require('assert');
var rework = require('rework');
var makeClassmap = require('./index');

describe('rework-classmap', function() {

  it('works', function() {
    var classmap = makeClassmap({
      'A': true,
      'B': 'D'
    });

    var src = [
      '.A {font-size: 12px;}',
      '.B {font-size: 12px;}',
      '.C {font-size: 12px;}',
      '.A, .B {font-size: 12px;}',
      '.A, .C {font-size: 12px;}',
      '.C, .B {font-size: 12px;}',
      '@media screen { .A {font-size: 12px;} }',
      '@media screen { .C {font-size: 12px;} }',
      '@media screen { .A, .C {font-size: 12px;} }',
      'body {font-size: 12px;}'
    ].join('\n');

    var assertion = [
      '.A {',
      '  font-size: 12px;',
      '}',
      '',
      '.D {',
      '  font-size: 12px;',
      '}',
      '',
      '.A,',
      '.D {',
      '  font-size: 12px;',
      '}',
      '',
      '.A {',
      '  font-size: 12px;',
      '}',
      '',
      '.D {',
      '  font-size: 12px;',
      '}',
      '',
      '@media screen {',
      '  .A {',
      '    font-size: 12px;',
      '  }',
      '}',
      '',
      '@media screen {',
      '',
      '}',
      '',
      '@media screen {',
      '  .A {',
      '    font-size: 12px;',
      '  }',
      '}',
      '',
      'body {',
      '  font-size: 12px;',
      '}'
    ].join('\n');

    var result = rework(src).use(classmap).toString()
    assert.equal(assertion, result);
  });

});
