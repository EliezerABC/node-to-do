"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "yargs", {
  enumerable: true,
  get: function get() {
    return _yargs["default"];
  }
});
exports.terminalWidth = exports.argv = void 0;

var _yargs = _interopRequireDefault(require("yargs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var terminalWidth = _yargs["default"].terminalWidth();

exports.terminalWidth = terminalWidth;
var descripcion = {
  alias: 'descripcion',
  demandOption: true,
  desc: 'Descripcion de la tarea'
};
var completado = {
  alias: 'completado',
  demandOption: true,
  "default": true,
  desc: 'Marca como completada o no la tarea'
};

var argv = _yargs["default"].command('crear', 'Crea una nueva tarea', {
  d: descripcion
}).command('actualizar', 'Actualiza una tarea', {
  d: _objectSpread(_objectSpread({}, descripcion), {}, {
    desc: 'Descripcion de la tarea a actualizar'
  }),
  c: completado
}).command('eliminar', 'Elimina una tarea', {
  d: _objectSpread(_objectSpread({}, descripcion), {}, {
    desc: 'Descripcion de la tarea que se va a eliminar'
  })
}).command('listar', 'muestra todas las tareas', {
  c: _objectSpread(_objectSpread({}, completado), {}, {
    demandOption: false,
    "default": undefined,
    desc: 'Filtra las tareas a mostrar dependiendo de si estan completas o no'
  })
}).string('descripcion').help().argv;

exports.argv = argv;