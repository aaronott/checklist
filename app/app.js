// Here is the starting point for code of your own application.
// All stuff below is just to show you how it works. You can delete all of it.

// Modules which you authored in this project are intended to be
// imported through new ES6 syntax.
import { greet } from './hello_world/hello_world';
import { sections } from './src/sections';

// Node.js modules and those from npm
// are required the same way as always.
var os = require('os');
var jetpack = require('fs-jetpack');
var remote = require('remote');
var app = remote.require('app');

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
var manifest = jetpack.read('package.json', 'json');
console.log(manifest);

// window.env contains data from config/env_XXX.json file.
var envName = window.env.name;
var basepath = app.getAppPath();
var apppath  = app.getPath('appData') + "/" + app.getName();
var sessionPath = apppath + "/session";
app.setPath('appData', sessionPath);

console.log(sessionPath)

// Config the application paths. __dirname starts from the directory of app.html
window.env.content_directory = __dirname + "/content";
// window.env.content_directory = __dirname + "/content/input";
// window.env.template_directory = __dirname + "/content/output";
window.env.screenshot_directory = app.getPath('appData') + "/screen";
window.env.database_file = app.getPath('appData') + '/datafile';
window.env.temporary_directory = '/tmp/pchck';
window.env.default_extension = 'pchck';

// now that we have all that set, we need to add the content directory to the
// current session directory to allow us to load from a saved file and use the
// same location.

fs.stat(sessionPath, function (err, stats){
  if (err) {
    fs.mkdirSync(sessionPath);
    var ncp = require('ncp').ncp;

    ncp.limit = 16;
    //ncp(source, destination, function (err) {
    // ncp(window.env.database_file, window.env.temporary_directory, function (err) {

    ncp(window.env.content_directory, app.getPath('appData') + "/content", function (err) {
     if (err) {
       return console.error(err);
     }
    });

  }
  else {
    console.log('session already exists. we can just continue.');
  }
  console.log(stats);
});

console.log("basepath: " + basepath);
// console.log("apppath: " + apppath);


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('greet').innerHTML = greet();
    document.getElementById('platform-info').innerHTML = os.platform();
    document.getElementById('env-name').innerHTML = envName;

    var directory = app.getPath('appData') + "/content/input";
    var contentSections = sections(directory);
    // console.log(contentSections);
    document.getElementById('content-menu').appendChild(contentSections);
});

// create our own events here
var containerLoadEvent = document.createEvent('Event');
containerLoadEvent.initEvent('containerLoad', true, true);
window['containerLoadEvent'] = containerLoadEvent;


// var remote = require('remote');
// var Menu = remote.require('menu');
// var MenuItem = remote.require('menu-item');
//
// var menu = new Menu();
// menu.append(new MenuItem({ label: 'MenuItem1', click: function() { console.log('item 1 clicked'); } }));
// menu.append(new MenuItem({ type: 'separator' }));
// menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));
//
// window.addEventListener('contextmenu', function (e) {
//   e.preventDefault();
//   menu.popup(remote.getCurrentWindow());
// }, false);
