var RongCloud = function () {
};

RongCloud.prototype.login = function (arguments, successCallback, failureCallback) {
    return cordova.exec(successCallback, failureCallback, 'RongCloudPlugin', 'login', [arguments]);
};

RongCloud.prototype.openMessageList = function (arguments, successCallback, failureCallback) {
    return cordova.exec(successCallback, failureCallback, 'RongCloudPlugin', 'openMessageList', [arguments]);
};

RongCloud.prototype.singlechat = function (arguments, successCallback, failureCallback) {
    return cordova.exec(successCallback, failureCallback, 'RongCloudPlugin', 'singlechat', [arguments]);
};
RongCloud.prototype.closeMessage = function (arguments, successCallback, failureCallback) {
    return cordova.exec(successCallback, failureCallback, 'RongCloudPlugin', 'closeMessage', [arguments]);
};

 if (!window.plugins) {
    window.plugins = {};
}

if (!window.plugins.rongCloud) {
    window.plugins.rongCloud = new RongCloud();
}
// if (!cordova.plugins) {
//     cordova.plugins = {};
// }
// if (!cordova.plugins.rongCloud) {
//     cordova.plugins.rongCloud = new RongCloud();
// }
module.exports = new RongCloud()

