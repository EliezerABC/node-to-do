import { error } from './config/colors'
import { argv, yargs } from './config/yargs'
import { saveData, readData, createToDo, updateToDo, showToDos, deleteToDo } from './actions/actions'

// Inicializa la data si existe
readData()
  .then()
  .catch(console.error)

const cmd = argv._[0]

switch (cmd) {
  case 'crear':

    createToDo(argv.descripcion)
      .then(saveData)
      .then(console.log)
      .catch(console.error)

    break
  case 'actualizar':

    updateToDo(argv.descripcion, argv.completado)
      .then(saveData)
      .then(console.log)
      .catch(console.error)

    break
  case 'eliminar':

    deleteToDo(argv.descripcion)
      .then(saveData)
      .then(console.log)
      .catch(console.error)

    break
  case 'listar':

    showToDos(argv.completado)
      .then(console.log)
      .catch(console.error)

    break
  default:
    console.error(
      error(
        cmd
          ? '\nComado no reconocido\n'
          : '\nDebes introducir un comando valido\n'
      )
    )
    yargs.showHelp()
    break
}
