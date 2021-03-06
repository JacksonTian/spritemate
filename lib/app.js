var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var PNG = require('pngjs').PNG;
var linked = require('linked');
var Pool = require('pool_stream');

var md5 = function (buffers) {
  var shasum = crypto.createHash('md5');
  for (var i = 0; i < buffers.length; i++) {
    shasum.update(buffers[i]);
  }
  return shasum.digest('hex');
};

module.exports = function (images, output, callback) {
  var app = linked();
  app.use(function () {
    this.images = [];
    this.styles = {};
  });

  var readPNG = function (file) {
    app.use(function (next) {
      var ctx = this;
      fs.readFile(file, function (err, data) {
        if (err) {
          throw err;
        }
        var png = new PNG();
        png.parse(data, function () {
          next();
        });
        ctx.images.push(png);
      });
    });
  };

  for (var i = 0; i < images.length; i++) {
    readPNG(images[i]);
  }

  app.use(function () {
    var height = this.images.reduce(function (prev, current) {
      return prev + current.height;
    }, 0);

    var width = this.images.reduce(function (prev, current) {
      return Math.max(prev, current.width);
    }, 0);
    this.out = new PNG({width: width, height: height});
  });

  app.use(function (next) {
    var ctx = this;
    var height = 0;
    for (var i = 0; i < this.images.length; i++) {
      var png = this.images[i];
      png.bitblt(this.out, 0, 0, png.width, png.height, 0, height);
      
      // add css output
      this.styles[images[i]] = {
        width: png.width + 'px',
        height: png.height + 'px',
        'background-position': '0 ' + (height > 0 ? ('-' + height + 'px') : '0')
      };
      
      // apply css height to next sprite
      height += png.height;
    }
    var pool = new Pool();
    this.out.pack().pipe(pool);
    pool.on('finish', function () {
      ctx.pool = pool;
      ctx.md5 = md5(pool.buffers);
      next();
    });
  });

  // generate the sprite file with hash
  app.use(function () {
    var extname = path.extname(output);
    var basename = path.basename(output, extname);
    var finalName = path.join(path.dirname(output), basename + '_' + this.md5.substring(0, 10) + extname);
    var out = fs.createWriteStream(finalName);
    this.pool.pipe(out);
    callback(null, finalName, this.styles);
  });
  // start execute.
  app();
};
