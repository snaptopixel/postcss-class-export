var postcss = require('postcss');
var parser = require('postcss-selector-parser');

module.exports = postcss.plugin('class-export', function classExport(options) {

  return function(css) {

    var processor = parser();

    options = options || {};

    var classNames = [];

    let filePath = css.source.input.file;

    css.walkRules(function(rule) {
      rule.selectors.forEach(selector => {
          parser(sels => {
            sels.map(sel => {
              sel.nodes.map(node => {
                if (node.type === 'class') {
                  if(classNames.indexOf(node.value) === -1) {
                    classNames.push(node.value);
                  }
                }
              });
            })
          }).process(selector);
      })
    });

    options.export(filePath, classNames);

  }

});
