const request = require("request");
const Twit = require("twit");
// Uncomment these lines if running locally (see readme for more details)
// const config = require('./config.js');
// process.env = config;

// Words arrays
const verbs = [
  "pixelify",
  "rasterize",
  "vectorize",
  "optimize",
  "package",
  "minify",
  "unminify",
  "uglify",
  "prettify",
  "componentize",
  "inject",
  "transpile",
  "unit test",
  "curry",
  "lint",
  "unit test",
  "concatenate",
  "compile",
  "cache",
  "embed",
  "templatize",
  "audit",
  "prototype",
  "modularize",
  "debug",
  "import",
  "export",
  "polyfill",
  "normalize",
  "shrink",
  "awesomize",
  "randomize",
  "slugify"
];
const targets = [
  "images",
  "PNG",
  "JPG",
  "SVG",
  "javascript",
  "CSS",
  "HTML",
  "assets",
  "scripts",
  "web components",
  "dependencies",
  "node modules",
  "jQuery plugins",
  "databases",
  "fonts",
  "sass files",
  "iframes",
  "JSON files",
  "XML files",
  "favicons",
  "landing pages",
  "markup",
  "regular expressions",
  "sitemaps",
  "inline styles",
  "React components",
  "CSS modules",
  "emojis",
  "PWA",
  "GIFs",
  "videos",
  "RSS feeds",
  "SPA"
];
const tools = [
  "IIFE",
  "Ajax",
  "AMD",
  "async/await",
  "the Canvas API",
  "anonymous functions",
  "constructor functions",
  "ES6",
  "ES7",
  "ES8",
  "ES9",
  "the Chrome devtools",
  "the Internet Explorer devtools",
  "Firebug",
  "the web animations API",
  "WebGL",
  "promises",
  "Grunt",
  "Gulp",
  "Babel",
  "Webpack",
  "Yeoman",
  "ESLint",
  "JSLint",
  "HTTPS",
  "markdown",
  "Macromedia Flash",
  "a REST API",
  "JSON",
  "XML",
  "a regex",
  "the DOM",
  "service workers",
  "Electron",
  "JSX",
  "the Fetch API",
  "test-driven development",
  "Docker"
];
const libs = [
  "React",
  "AngularJS",
  "Backbone.js",
  "Vanilla JS",
  "Typescript",
  "RequireJS",
  "jQuery",
  "Redux",
  "Vue",
  "three.js",
  "Yarn",
  "Node.js",
  "Twitter Bootstrap",
  "Moment.js",
  "D3.js",
  "Underscore.js",
  "MooTools",
  "Express",
  "Socket.IO",
  "QUnit",
  "Ember.js",
  "Polymer",
  "Meteor",
  "Mocha",
  "Jasmine",
  "React native",
  "Lodash",
  "GraphQL",
  "Jekyll",
  "Browserify",
  "Flow",
  "PhantomJS",
  "Chrome Headless",
  "Puppeteer",
  "Preact",
  "TravisCI",
  "Jenkins",
  "Prettier",
  "axios",
  "jQueryUI",
  "postal.js",
  "Jest"
];

const libsAndTools = tools.concat(libs);

// Utils
const randomItem = array => array[Math.floor(Math.random() * array.length)];

const getNounsURL =
  "http://api.wordnik.com/v4/words.json/randomWord?" +
  "minCorpusCount=1000&minDictionaryCount=10&" +
  "excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&" +
  "hasDictionaryDef=true&includePartOfSpeech=noun&limit=2&maxLength=12&" +
  `api_key=${process.env.wordnik_token}`;

const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});

// Build and post the tweet
const tweet = () => {
  request.get({ url: getNounsURL }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Build the tweet
      const randomWord = JSON.parse(body).word;
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

      T.post("statuses/update", { status: tweetContent }, (err, data, resp) => {
        if (err) {
          console.log("error: ", err);
        } else {
          console.log("response: ", resp);
        }
      });
    }
  });
};

tweet();

setInterval(() => {
  try {
    tweet();
  } catch (e) {
    console.log(e);
  }
}, 1000 * 60 * 60 * 3); // tweets every 3 hours
