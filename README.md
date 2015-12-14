# grunt-webtranslateit [![Build Status](https://travis-ci.org/anthanh/grunt-webtranslateit.svg?branch=master)](https://travis-ci.org/anthanh/grunt-webtranslateit)

> Automatically retrieve webtranslateit.com files to your project

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-webtranslateit --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-webtranslateit');
```

## The "webtranslateit" task

### Overview
In your project's Gruntfile, add a section named `webtranslateit` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  webtranslateit: {
    options: {
      projectToken: 'PUBLIC_KEY',
      langs: ['en', 'es']
    },
    your_target: {
      dest: 'app/json/locales'
    },
  },
});
```

### Options

#### options.projectToken
Type: `String`
Default value: `'PUBLIC_KEY'`

Your webtranslateit project id.

#### options.langs
Type: `Array` | `String`
Default value: `[]`

Languages to retrieve.

#### options.dest
Type: `String`
Default value: `tmp`

Directory where to put locales files.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2015-12-14   v0.0.2   Removed unused parameter.
* 2015-12-11   v0.0.1   Initial release.
