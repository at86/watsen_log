
# watsen_log

Output call place or call stack of console.log()

With this output in ide can click jump to the code.

## CALL_POINT 

This is the default option, will output call poin up the real log content.

```js
var watLog = require('watsen_log')

function cs() {
  console.log('hello world')
}
cs()
```

output :

```
D:\code\watvue\cs\cs\demo.js:4:11
hello world
```

## CALL_STACK 

This is the default option, will output call stack up the real log content.

```js
var watLog = require('watsen_log')
watLog.logType(watLog.CODE_STACK)

function cs() {
  console.log('hello world')
}
cs()
```

output :

```
D:\code\watvue\cs\cs\demo.js:7:1
D:\code\watvue\cs\cs\demo.js:5:11
hello world
```



