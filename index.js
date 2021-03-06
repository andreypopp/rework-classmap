"use strict";

var toString = Object.prototype.toString;

function isString(obj) {
  return toString.call(obj) === '[object String]'
}

function classNames(s) {
  var names = s.match(/\.[a-zA-Z0-9_\-]+/g)
  return names ? names.map(function(n) { return n.slice(1); }) : [];
}

function compressWith(map, s) {
  return s.replace(/\.[a-zA-Z0-9_\-]+/g, function(m, c) {
    m = m.slice(1);
    return '.' + (map[m] && isString(map[m]) ? map[m] : m);
  });
}

module.exports = function(map) {
  function visit(node) {
    var rmRules = [];

    node.rules.forEach(function(rule, rIdx) {
      if (rule.rules) {
        visit(rule)
      } else if (rule.selectors) {
        var rmSelectors = [];

        rule.selectors.forEach(function(s, sIdx) {
          var names = classNames(s);
          if (names.length > 0 && !names.every(function(n) { return map[n]; }))
            rmSelectors.push(sIdx);
        });

        rmSelectors.reverse();
        rmSelectors.forEach(function(idx) {
          rule.selectors.splice(idx, 1);
        })

        rule.selectors = rule.selectors.map(compressWith.bind(null, map));

        if (rule.selectors.length === 0) {
          rmRules.push(rIdx);
        }
      }
    });

    rmRules.reverse();
    rmRules.forEach(function(idx) {
      node.rules.splice(idx, 1);
    });
  }
  return function(style, ctx) {
    visit(style);
  }
}
