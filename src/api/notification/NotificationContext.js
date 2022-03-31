"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = require("react");
var uuid_1 = require("uuid");
var useInterval_1 = require("./useInterval");
var INTERVAL = 1000;
var DEFAULT_TIMEOUT = 5000;
var NOTIFICATION;
(function (NOTIFICATION) {
    NOTIFICATION[NOTIFICATION["ALERT"] = 0] = "ALERT";
    NOTIFICATION[NOTIFICATION["ERROR"] = 1] = "ERROR";
    NOTIFICATION[NOTIFICATION["SUCCESS"] = 2] = "SUCCESS";
})(NOTIFICATION = exports.NOTIFICATION || (exports.NOTIFICATION = {}));
var defaultApi = {
    notifications: [],
    setNotification: function (notification) { return null; },
    clearNotification: function (id) { return null; }
};
/**
 * Create Context
 */
exports.NotificationsContext = React.createContext(defaultApi);
/**
 * Custom Notifications Provider
 */
function NotificationsProvider(_a) {
    var children = _a.children;
    var _b = React.useState(defaultApi.notifications), notifications = _b[0], setNotifications = _b[1];
    // Append a new notification (or override existing by id)
    var setNotification = React.useCallback(function (notification) {
        var existing = notifications.find(function (n) { return n.id === notification.id; });
        var nextNotifications = existing
            ? notifications.map(function (n) {
                return n.id === notification.id ? __assign(__assign({}, existing), notification) : n;
            })
            : notifications.concat(__assign({ id: uuid_1.v4(), timestamp: new Date().getTime(), variant: NOTIFICATION.ERROR }, notification));
        setNotifications(nextNotifications);
    }, [notifications, setNotifications]);
    // Clear notification(s) by id, or clear ALL notifications
    var clearNotification = React.useCallback(function (id) {
        if (!id) {
            setNotifications([]);
        }
        else {
            var ids_1 = Array.isArray(id) ? id : [id];
            var nextNotifications = notifications.filter(function (_a) {
                var id = _a.id;
                return !ids_1.includes(id);
            });
            setNotifications(nextNotifications);
        }
    }, [notifications, setNotifications]);
    // Set up interval to auto-expire notifications
    var handleExpireNotifications = React.useCallback(function (currentTime) {
        if (notifications.length) {
            var expiredIds = notifications.reduce(function (acc, n) {
                var isExpired = n.timestamp <= currentTime - (n.timeout || DEFAULT_TIMEOUT);
                return isExpired && n.timeout !== null ? acc.concat(n.id) : acc;
            }, []);
            if (expiredIds.length) {
                clearNotification(expiredIds);
            }
        }
    }, [notifications, clearNotification]);
    useInterval_1["default"](handleExpireNotifications, INTERVAL);
    // Return Provider with Notifications API
    return (React.createElement(exports.NotificationsContext.Provider, { value: {
            notifications: notifications,
            setNotification: setNotification,
            clearNotification: clearNotification
        } }, children));
}
exports.NotificationsProvider = NotificationsProvider;
// Convenience import hook
function useNotifications() {
    return React.useContext(exports.NotificationsContext);
}
exports.useNotifications = useNotifications;
