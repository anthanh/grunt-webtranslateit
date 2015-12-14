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

        function getMasterProjectFileId(cb) {
            request(urlBase + '.json', function(error, response) {
                if (error) {
                    return cb(error);
                }
                response.body = JSON.parse(response.body);
                if (response.statusCode !== 200) {
                    return cb(response.body.error);
                }
                var masterProjectFileId = response.body.project['project_files'][0];
                masterProjectFileId = masterProjectFileId['master_project_file_id'] || masterProjectFileId.id;

                cb(error, masterProjectFileId);
            });
        }

        function dowwloadLocales(masterProjectFileId, cb) {
            if (!masterProjectFileId) {
                return cb('error undefined masterprojectfileid');
            }

            var localeUrl = urlBase + '/files/' + masterProjectFileId + '/locales/';

            var localesUrl = options.langs.map(function(langName) {
                return localeUrl + langName;
            });

            async.map(localesUrl, request, function(err, responses) {

                if (err) {
                    return cb(err, responses);
                }

                responses.map(function(response, index) {
                    response.body = JSON.parse(response.body);

                    if (response.statusCode !== 200) {
                        return cb(response.body.error + ' "' + options.langs[index] + '"');
                    }

                    var file = options.dest + options.langs[index] + '.json',
                        data = JSON.stringify(response.body, null, '  ');
                    grunt.file.write(file, data);
                    grunt.log.writeln('File "' + options.dest + options.langs[index] + '.json' + '" created.');
                });

                cb();
            });

        }

        var done = this.async();
        async.waterfall([getMasterProjectFileId, dowwloadLocales], function(err) {
            if (err) {
                grunt.log.errorlns('Got an error: ', err);
                grunt.fail.fatal(err);
            }
            done();
        });

    });

};
