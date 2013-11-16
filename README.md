# rework-classmap

Rework CSS transform which removes unused class rules and optionally can
compress class names.

## Installation

    % npm install rework-classmap

## Usage

    var rework        = require('rework');
    var makeClassmap  = require('rework-classmap');

    var classmap = makeClassmap({
      'SomeClass': true,
      'AnotherClass': true
    });

    var transformed = rework(src).use(classmap).toString();
