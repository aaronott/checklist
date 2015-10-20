export var sections = function() {

  var walk    = require('walk');
  var sections  = [];
  var files   = [];
  var listElement = document.createElement("ul");

  // console.log("Here1");
  // Walker options
  var walker  = walk.walk(__dirname + '/content', { followLinks: false });

  walker.on('file', function(root, stat, next) {
      // Add this file to the list of files
      //files.push(root + "/" + stat.name);
      var path = root.split('/');

      var topic = stat.name;
      var section = path.pop();

      if( Object.prototype.toString.call( sections[section] ) !== '[object Array]' ) {
//        console.log(section + " is not an array");
        sections[section] = [];
//        console.log(sections);
      }

      sections[section].push(topic);
      sections[section][topic] = [root + "/" + stat.name]
      //topics.push(topic);

      next();
  });

  walker.on('end', function() {
      //var sidebar = document.getElementById('sidebar');
      //var main_section = document.getElementById('main');
      //var listElement = document.createElement("ul");

      //sidebar.appendChild(listElement);
      var x = null;
      var y = null;

      for (var k in sections) {

        var listItem = document.createElement("li");
        var item = k.split("_");
        item.shift();

        listItem.innerHTML = item.join(" ");

        var listElement2 = document.createElement("ul");

        for (var l in sections[k]) {
          var listItem2 = document.createElement("li");

          var anchor = document.createElement("a");

          var item = l.split(".");
          var item = item[0].split("_");
          item.shift();
          if (item.length === 0) { continue; }

          anchor.href = sections[k][l];
          //anchor.href = '#';
          anchor.innerHTML = item.join(" ");
          anchor.className = "js-internal-link";

          // console.log(anchor);
          //listItem2.innerHTML = item.join(" ");
          listItem2.appendChild(anchor);
          listElement2.appendChild(listItem2);
          //console.log(listItem2);
        }
        listItem.appendChild(listElement2);

        // for some reason this is needed to get things in the right order.
        if (x) {
          listElement.insertBefore(listItem, x);
        }
        else {
          listElement.appendChild(listItem);
        }
        x = listItem;
      }
      return listElement;
  });

  //return 'sideBar';
  return listElement;
};
