spritemate
==========

Sprite Mate

## Installation
```
$ npm install spritemate -g
```

## Usage

```
$ spritemate example/icon1over.png example/icon2over.png -o example/output.png
```

Result:

![](https://raw.github.com/JacksonTian/spritemate/master/example/icon1over.png) + ![](https://raw.github.com/JacksonTian/spritemate/master/example/icon2over.png) = ![](https://raw.github.com/JacksonTian/spritemate/master/example/output_0570030f9f.png)

## Scripting

```
var mate = require('spritemate');

var images = ['/path/to/image1.png', '/path/to/image2.png'];
var output = '/path/to/output.png';

mate(images, output, function (err, finalName) {
  console.log('generate sprite at: ' + path.relative(path.resolve('.'), finalName));
});
```
## License
The MIT License
