# pull-timeout2
Abort a [pull-stream](https://pull-stream.github.io/) if the rate of flow drops below the specified threshold. Uses `setTimeout()` under-the-hood.

## example
```js
var pull = require('pull-stream')
var timeout = require('pull-timeout2')
var delay = 500

pull(
  pull.values([1, 2, 3, 4, 5, 6, 7, 8]),
  pull.asyncMap(function (num, next) {
    setTimeout(() => next(null, num), num * 100)
  }),
  timeout(delay),
  pull.log() // 1 2 3 4 5 <end>
)
```
