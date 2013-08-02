var webpage = require('webpage');
var fs = require('fs');
var md5 = require('./md5.js');

// read urls from file
//var urlList = fs.read("urls.txt");
if (phantom.args.length <= 0) {
    console.log('Usage: phantomjs rasterizes.js [FILE]');
    phantom.exit(1);
}

// HTMLコンテンツを読み込む
// コマンドライン起動前提なので同期I/Oで
//console.log(phantom.args[0]);
var urlList = fs.read(phantom.args[0], 'utf8');

//console.log(urlList);
var urlArray = urlList.split("\n");
//console.log(urlArray);

var Pile = function() {
  this.pile = [];
  this.concurrency = 0;
  this.done = null;
  this.max_concurrency = 10;
};

Pile.prototype = {
  add: function (callback) {
    this.pile.push(callback);
  },
  run: function (done,max_concurrency) {
    this.done = done || this.done;
    this.max_concurrency = max_concurrency||this.max_concurrency;
    var target = this.pile.length;
    var that = this;
    var next = function() {
      that.concurrency--;
      target--;
      if(target === 0){
        that.done();
      } else {
        that.run();
      }
    };
    while(this.concurrency<this.max_concurrency && this.pile.length > 0) {
      this.concurrency++;
      var callback = this.pile.shift();
      callback(next);
    }
  }
};

var pilex = new Pile();

for(var i = 0; i < urlArray.length; i++) {
  pilex.add(make_handler(i));
}
pilex.run(function () {
  console.log("fetch done.");
  finish();
},10);


function finish() {
    phantom.exit();
}

function make_handler(num) {
  return function (next) {
    console.log("fetching : "+urlArray[num]);
    var page = webpage.create();
    page.viewportSize = {width:960};
    page.paperSize = {format:"A4",orientation:"portrait",margin:"1cm"};
    page.open(urlArray[num], function (status) {
      if (status !== 'success') {
        console.log('Unable to load the address! : '+urlArray[num]);
page.close();
        next();
      } else {
        window.setTimeout(function () {
          page.render(md5.digest_s(urlArray[num])+".pdf");
          console.log("done : "+num+"["+md5.digest_s(urlArray[num])+"]");
		page.close();
          next(); 
        },200);
      }
    });
  }
}


