"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "colors", {
  enumerable: true,
  get: function get() {
    return _safe["default"];
  }
});
exports.error = exports.success = void 0;

var _safe = _interopRequireDefault(require("colors/safe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_safe["default"].setTheme({
  success: 'green',
  error: 'red'
});

var success = _safe["default"].success,
    error = _safe["default"].error;
exports.error = error;
exports.success = success;