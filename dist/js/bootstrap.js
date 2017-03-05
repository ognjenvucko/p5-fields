'use strict';

requirejs.config({
  baseUrl: 'dist/js',
  paths: {
    'p5': 'lib/p5'
  }
});

require(['app/main']);