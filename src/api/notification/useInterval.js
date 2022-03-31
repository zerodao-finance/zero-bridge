"use strict";
exports.__esModule = true;
var React = require("react");
function useInterval(callback, timeout) {
    var savedCallback = React.useRef(callback);
    var handler = React.useCallback(function () { return savedCallback.current(new Date().getTime()); }, []);
    // Store latest callback
    React.useEffect(function () {
        savedCallback.current = callback;
    }, [callback]);
    // Set up/teardown the interval
    React.useEffect(function () {
        if (timeout) {
            var id_1 = window.setInterval(handler, timeout);
            return function () { return window.clearInterval(id_1); };
        }
    }, [handler, timeout]);
}
exports["default"] = useInterval;
