
// the call place of console.log
const CALL_POINT = 1
// the call stack of console.log
const CALL_STACK = 2

// defaul is the call place of console.log()
var _logType = CALL_POINT

var original_console_log = console.log;

var winObj = {}

Object.defineProperty(winObj, '__AT_STACK__', {
  get: function () {

    // //atdo way1
    // var old = Error.prepareStackTrace;
    // Error.prepareStackTrace = function (error, stack) {
    //     return stack;
    // };
    // var err = new Error();
    // Error.captureStackTrace(err, arguments.callee.caller.caller);
    // Error.prepareStackTrace = old;

    var err = new Error();
    // Error.captureStackTrace(err, arguments.callee);  
    Error.captureStackTrace(err, arguments.callee.caller.caller);

    // original_console_log(err.stack)
    // original_console_log('----------')

    //from line 1, ignore line 0 of: Error
    var from = 1;

    var errLines = err.stack.split('\n');
    // original_console_log(from, errLines);

    var errLineArr = [];
    for (var i = from; i < errLines.length; i++) {

      /*
       Error
       at Object.<anonymous> (D:\hack\web\AdminLTE-2.3.5\watJs\log.js:98:1)
       at Module._compile (module.js:653:30)
       at Object.Module._extensions..js (module.js:664:10)
       at Module.load (module.js:566:32)
       at tryModuleLoad (module.js:506:12)
       at Function.Module._load (module.js:498:3)
       at Function.Module.runMain (module.js:694:10)
       at startup (bootstrap_node.js:204:16)
       */
      if (errLines[i].indexOf('Module._compile') !== -1
        || errLines[i].indexOf('Generator.next') !== -1) {
        break;
      }

      // original_console_log('====',errLines[i])

      // at Query.connection.query (D:\hack\web\AdminLTE-2.3.5\00\mysqlNode\a.js:36:11)
      var f = errLines[i].indexOf('(')
      // console.log(errLines[i].slice(f + 1, -1))
      errLineArr.push(errLines[i].slice(f + 1, -1).trim());

      // 83->80
      // var b = errLines[i].lastIndexOf(':');
      // var b2 = errLines[i].lastIndexOf(':', b - 1);
      // var lineNum = parseInt(errLines[i].substring(b2 + 1, b));
      // // original_console_log(i, lineNum);
      // if (!isNaN(lineNum) && (lineNum !== 1 || (lineNum === 1 && errLineArr.length === 0))) {
      //   errLineArr.push(lineNum);
      // } 
      
    }

    if (_logType === CALL_POINT) {
      return errLineArr.slice(0, 1);
    }
    else {
      return errLineArr.reverse();
    }
  }
});

Object.defineProperty(winObj, '__AT_LINE02__', {
  get: function () {
    var joinSep = '\n';// \n or ->
    return winObj.__AT_STACK__.join(joinSep);
  }
});

console.log = function () {
  //RangeError: Maximum call stack size exceeded
  // console.log(winObj.__AT_LINE02__);

  original_console_log(winObj.__AT_LINE02__);
  original_console_log.apply(null, arguments);
};

/**
 * output call place or call stack of console.log
 * @param type 
 *  <pre>
 *    CALL_POINT: call place
 *    CALL_STACK: call stack 
 */
function logType(type) {
  _logType = type
}

//test ========================================
// function d() {
//   console.log(3, 1, 2)
// }
//
// d();

module.exports = {
  CALL_POINT,
  CALL_STACK,
  logType,
}

