/*
 * grunt-webtranslateit
 * https://github.com/anthanh/grunt-webtranslateit
 *
 * Copyright (c) 2015 Anthanh Pham Trinh
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('webtranslateit', 'Automatically retrieve webtranslateit.com files to your project', function() {
    var request = require('request'),
    async = require('async'),
    options = this.options({
      projectToken: 'PUBLIC_KEY',
      langs: [],
      dest: this.data.dest || 'tmp'
    }),
    urlBase = 'https://webtranslateit.com/api/projects/' + options.projectToken;

    if (typeof options.langs === 'string') {
      options.langs = [options.langs];
    }

    if (options.dest.substr(-1) !== '/') {
      options.dest += '/';
    }

    function downloadLocales(cb) {
      request(urlBase + '.json', function(error, response) {
        if (error) {
          return cb(error);
        }
        response.body = JSON.parse(response.body);
        if (response.statusCode !== 200) {
          return cb(response.body.error);
        }

        async.each(response.body.project['project_files'], function(file, cb2){
          var fileName = file.name.replace('./locales/', '');
          var filePath = options.dest + fileName;
          var fileLang = file.locale_code;
          var localeUrl = urlBase + '/files/' + file.id + '/locales/' + fileLang;

          if (options.langs.indexOf(fileLang) === -1) {
            return cb();
          }

          request(localeUrl, function(err, fileResponse) {
            if (err) {
              return cb2(err, fileResponse);
            }

            if (response.statusCode !== 200) {
              fileResponse.body = JSON.parse(fileResponse.body);
              return cb(fileResponse.body.error + ' "' + fileName + '"');
            }

            grunt.file.write(filePath, fileResponse.body);
            grunt.log.ok('File ' + filePath.cyan + ' created.');
            cb2();
          });
        }, cb);
      });
    }

    downloadLocales(this.async());
  });

};
