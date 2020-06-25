"use strict";

var _colors = require("./config/colors");

var _yargs = require("./config/yargs");

var _actions = require("./actions/actions");

// Inicializa la data si existe
(0, _actions.readData)().then()["catch"](console.error);
var cmd = _yargs.argv._[0];

switch (cmd) {
  case 'crear':
    (0, _actions.createToDo)(_yargs.argv.descripcion).then(_actions.saveData).then(console.log)["catch"](console.error);
    break;

  case 'actualizar':
    (0, _actions.updateToDo)(_yargs.argv.descripcion, _yargs.argv.completado).then(_actions.saveData).then(console.log)["catch"](console.error);
    break;

  case 'eliminar':
    (0, _actions.deleteToDo)(_yargs.argv.descripcion).then(_actions.saveData).then(console.log)["catch"](console.error);
    break;

  case 'listar':
    (0, _actions.showToDos)(_yargs.argv.completado).then(console.log)["catch"](console.error);
    break;

  default:
    console.error((0, _colors.error)(cmd ? '\nComado no reconocido\n' : '\nDebes introducir un comando valido\n'));

    _yargs.yargs.showHelp();

    break;
}