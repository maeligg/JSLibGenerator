/* eslint-disable linebreak-style */
const Twit = require('twit');
const express = require('express');
const request = require('request');
const Filter = require('bad-words'),
      filter = new Filter();
require('dotenv').config();

const app = express()
app.use(express.static('public'));

const T = new Twit({
	consumer_key: process.env.consumer_key,
	consumer_secret: process.env.consumer_secret,
	access_token: process.env.access_token,
	access_token_secret: process.env.access_token_secret
});

// Words arrays
const verbs = [
  'pixelify',
  'rasterize',
  'vectorize',
  'optimize',
  'package',
  'minify',
  'unminify',
  'uglify',
  'prettify',
  'componentize',
  'inject',
  'transpile',
  'unit test',
  'curry',
  'lint',
  'unit test',
  'concatenate',
  'compile',
  'cache',
  'embed',
  'templatize',
  'audit',
  'prototype',
  'modularize',
  'debug',
  'import',
  'export',
  'polyfill',
  'normalize',
  'shrink',
  'awesomize',
  'randomize',
  'slugify'
];
const targets = [
  'images',
  'PNG',
  'JPG',
  'SVG',
  'javascript',
  'CSS',
  'HTML',
  'assets',
  'scripts',
  'web components',
  'dependencies',
  'node modules',
  'jQuery plugins',
  'databases',
  'fonts',
  'sass files',
  'iframes',
  'JSON files',
  'XML files',
  'favicons',
  'landing pages',
  'markup',
  'regular expressions',
  'sitemaps',
  'inline styles',
  'React components',
  'CSS modules',
  'emojis',
  'PWA',
  'GIFs',
  'videos',
  'RSS feeds',
  'SPA'
];
const tools = [
  'IIFE',
  'Ajax',
  'AMD',
  'async/await',
  'the Canvas API',
  'anonymous functions',
  'constructor functions',
  'ES6',
  'ES7',
  'ES8',
  'ES9',
  'the Chrome devtools',
  'the Internet Explorer devtools',
  'Firebug',
  'the web animations API',
  'WebGL',
  'promises',
  'Grunt',
  'Gulp',
  'Babel',
  'Webpack',
  'Yeoman',
  'ESLint',
  'JSLint',
  'HTTPS',
  'markdown',
  'Macromedia Flash',
  'a REST API',
  'JSON',
  'XML',
  'a regex',
  'the DOM',
  'service workers',
  'Electron',
  'JSX',
  'the Fetch API',
  'test-driven development',
  'Docker'
];
const libs = [
  'React',
  'AngularJS',
  'Backbone.js',
  'Vanilla JS',
  'Typescript',
  'RequireJS',
  'jQuery',
  'Redux',
  'Vue',
  'three.js',
  'Yarn',
  'Node.js',
  'Twitter Bootstrap',
  'Moment.js',
  'D3.js',
  'Underscore.js',
  'MooTools',
  'Express',
  'Socket.IO',
  'QUnit',
  'Ember.js',
  'Polymer',
  'Meteor',
  'Mocha',
  'Jasmine',
  'React native',
  'Lodash',
  'GraphQL',
  'Jekyll',
  'Browserify',
  'Flow',
  'PhantomJS',
  'Chrome Headless',
  'Puppeteer',
  'Preact',
  'TravisCI',
  'Jenkins',
  'Prettier',
  'axios',
  'jQueryUI',
  'postal.js',
  'Jest'
];

const libsAndTools = tools.concat(libs);

// Utils
const randomItem = array => array[Math.floor(Math.random() * array.length)];

const getNounsURL = `http://api.wordnik.com/v4/words.json/randomWord?minCorpusCount=1000&minDictionaryCount=10&excludePartOfSpeech=proper-noun,proper-noun-plural,suffix,family-name,idiom,affix&hasDictionaryDef=true&includePartOfSpeech=noun&limit=2&maxLength=12&api_key=${process.env.wordnik_token}`;

request.get({ url: getNounsURL }, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    // Build the tweet
    const randomWord = JSON.parse(body).word;
    const isProfane = filter.isProfane(randomWord);
    if (isProfane) return;
    const randomWordCapitalized =
      randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
    const syntaxType = Math.floor(Math.random() * 3);
    const syntaxA = `${randomWordCapitalized}JS : like ${randomItem(
      libs
    )}, but for ${randomItem(targets)}`;
    const syntaxB = `${randomWordCapitalized}JS : ${randomItem(
      verbs
    )} your ${randomItem(targets)} using ${randomItem(libsAndTools)}`;
    const tweetContent = syntaxType === 0 ? syntaxA : syntaxB; // 1 in 3 chances to use syntaxA

    T.post('statuses/update', { status: tweetContent }, (err, data, resp) => {
      if (err) {
        console.log('error: ', err);
      } else {
        console.log('response: ', resp);
      }
    });

  } else {
    console.log('error: ', error)
  }
});

const listener = app.listen(process.env.PORT, function () {
  console.log(`your bot is running on port ${listener.address().port}`);
});
