"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showToDos = exports.deleteToDo = exports.updateToDo = exports.createToDo = exports.readData = exports.saveData = void 0;

var _fs = _interopRequireDefault(require("fs"));

require("@babel/polyfill");

var _yargs = require("../config/yargs");

var _colors = require("../config/colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Ruta de la y carpeta de la data
var dataFolder = './data';
var dataPath = './data/data.json'; // las tareas inician vacias y almacenaran objetos

var toDos = []; // Lista de mensajes de error/exito

var errorMsgs = {
  save: 'Error inesperado',
  create: (0, _colors.error)('Ya existe una tarea con esa descripcion'),
  update: [(0, _colors.error)('No existe una tarea con esa descripcion'), (0, _colors.error)('La tarea ya estaba marcada como completa'), (0, _colors.error)('La tarea ya estaba marcada como incompleta')],
  "delete": (0, _colors.error)('No existe una tarea con esa descripcion'),
  show: [(0, _colors.error)('No hay tareas para mostrar'), (0, _colors.error)('No hay tareas para mostrar')]
};
var successMsgs = {
  create: (0, _colors.success)('Tarea creada con exito'),
  update: (0, _colors.success)('Tarea actualizada con exito'),
  "delete": (0, _colors.success)('Tarea eliminada con exito')
}; // Funciones para leer y guardar la data

var readData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              data = JSON.parse(_fs["default"].readFileSync(dataPath));
            } catch (_unused) {
              data = [];
            }

            toDos = data;
            return _context.abrupt("return", toDos);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function readData() {
    return _ref.apply(this, arguments);
  };
}();

exports.readData = readData;

var saveData = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(successMsg) {
    var data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = JSON.stringify(toDos); // Se crea el directorio

            _fs["default"].mkdir(dataFolder, null, function (err) {
              if (err) {
                if (err.code !== 'EEXIST') {
                  throw errorMsgs.save;
                }
              }
            }); // Se crea el fichero con la data


            _fs["default"].writeFile(dataPath, data, function (err) {
              if (err) {
                throw errorMsgs.save;
              }
            });

            return _context2.abrupt("return", successMsg);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function saveData(_x) {
    return _ref2.apply(this, arguments);
  };
}(); // Funciones para crear, actualizar, eliminar y listar las tareas


exports.saveData = saveData;

var createToDo = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(description) {
    var toDo, toDoExist;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            toDo = {
              description: description,
              completed: false
            };
            toDoExist = !!toDos.find(function (toDo) {
              return toDo.description === description;
            });

            if (!toDoExist) {
              _context3.next = 6;
              break;
            }

            throw errorMsgs.create;

          case 6:
            toDos.push(toDo);
            return _context3.abrupt("return", successMsgs.create);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createToDo(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createToDo = createToDo;

var updateToDo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(description, completed) {
    var toDo;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            completed = Boolean(completed);
            toDo = toDos.find(function (toDo) {
              return toDo.description === description;
            });

            if (toDo) {
              _context4.next = 6;
              break;
            }

            throw errorMsgs.update[0];

          case 6:
            if (!(completed && toDo.completed === completed)) {
              _context4.next = 10;
              break;
            }

            throw errorMsgs.update[1];

          case 10:
            if (!(!completed && toDo.completed === completed)) {
              _context4.next = 12;
              break;
            }

            throw errorMsgs.update[2];

          case 12:
            // Se elimina la tarea para luego reemplazarla
            toDos = toDos.filter(function (toDo) {
              return toDo.description !== description;
            }); // Se inserta la nueva tarea

            toDos.push(_objectSpread(_objectSpread({}, toDo), {}, {
              completed: completed
            }));
            return _context4.abrupt("return", successMsgs.update);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateToDo(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateToDo = updateToDo;

var deleteToDo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(description) {
    var origToDo;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            origToDo = toDos.find(function (toDo) {
              return toDo.description === description;
            });

            if (origToDo) {
              _context5.next = 3;
              break;
            }

            throw errorMsgs["delete"];

          case 3:
            toDos = toDos.filter(function (toDo) {
              return toDo.description !== origToDo.description;
            });
            return _context5.abrupt("return", successMsgs["delete"]);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteToDo(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteToDo = deleteToDo;

var showToDos = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(showCompleteds) {
    var data, toDosToShow, separator, i;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            data = '';
            toDosToShow = toDos;
            separator = '='.repeat(_yargs.terminalWidth);

            if (showCompleteds === 'true') {
              showCompleteds = true;
            } else if (showCompleteds === 'false') {
              showCompleteds = false;
            } else if (showCompleteds !== undefined) {
              showCompleteds = Boolean(showCompleteds);
            }

            _context6.t0 = showCompleteds;
            _context6.next = _context6.t0 === undefined ? 7 : _context6.t0 === true ? 8 : _context6.t0 === false ? 10 : 12;
            break;

          case 7:
            return _context6.abrupt("break", 12);

          case 8:
            toDosToShow = toDosToShow.filter(function (toDo) {
              return toDo.completed === true;
            });
            return _context6.abrupt("break", 12);

          case 10:
            toDosToShow = toDosToShow.filter(function (toDo) {
              return toDo.completed === false;
            });
            return _context6.abrupt("break", 12);

          case 12:
            if (toDosToShow[0]) {
              _context6.next = 14;
              break;
            }

            throw errorMsgs.show[0];

          case 14:
            for (i = 0; i < toDosToShow.length; i++) {
              data += "\n".concat(separator, "\n");
              data += "  ".concat((0, _colors.success)('Tarea #' + (i + 1)), "\n");
              data += "  Descripcion: ".concat(toDosToShow[i].description, "\n");
              data += "  Status: ".concat(toDosToShow[i].completed ? (0, _colors.success)('Completa') : (0, _colors.error)('Incompleta'), "\n");
            }

            data += "\n".concat(separator);
            return _context6.abrupt("return", data);

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function showToDos(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.showToDos = showToDos;