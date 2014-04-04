spritemate
==========

Sprite Mate

## Installation
```bash
$ npm install spritemate -g
```

## Usage

```bash
$ spritemate example/icon1over.png example/icon2over.png -o example/output.png
```

Result:

![](https://raw.github.com/JacksonTian/spritemate/master/example/icon1over.png) + ![](https://raw.github.com/JacksonTian/spritemate/master/example/icon2over.png) = ![](https://raw.github.com/JacksonTian/spritemate/master/example/output_0570030f9f.png)

And styles:

```
following is styles:

example/icon1over.png

{
  width: 16px;
  height: 26px;
  background-position: 0 0;
}

example/icon2over.png

{
  width: 16px;
  height: 26px;
  background-position: 0 26px;
}
```

## Scripting

```js
var mate = require('spritemate');

var images = ['/path/to/image1.png', '/path/to/image2.png'];
var output = '/path/to/output.png';

mate(images, output, function (err, finalName, styles) {
  console.log('generate sprite at: ' + path.relative(path.resolve('.'), finalName).green);
  console.log('');
  console.log('following is styles:');
  for (var file in styles) {
    console.log('');
    console.log(path.relative(path.resolve('.'), file));
    console.log('');
    console.log(format(styles[file]).yellow);
  }
});
```
## License
The MIT License
