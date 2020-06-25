import yargs from 'yargs'

const terminalWidth = yargs.terminalWidth()

const descripcion = {
  alias: 'descripcion',
  demandOption: true,
  desc: 'Descripcion de la tarea'
}

const completado = {
  alias: 'completado',
  demandOption: true,
  default: true,
  desc: 'Marca como completada o no la tarea'
}

const argv = yargs
  .command('crear', 'Crea una nueva tarea', {
    d: descripcion
  })
  .command('actualizar', 'Actualiza una tarea', {
    d: {
      ...descripcion,
      desc: 'Descripcion de la tarea a actualizar'
    },
    c: completado
  })
  .command('eliminar', 'Elimina una tarea', {
    d: {
      ...descripcion,
      desc: 'Descripcion de la tarea que se va a eliminar'
    }
  })
  .command('listar', 'muestra todas las tareas', {
    c: {
      ...completado,
      demandOption: false,
      default: undefined,
      desc: 'Filtra las tareas a mostrar dependiendo de si estan completas o no'
    }
  })
  .string('descripcion')
  .help()
  .argv

export { argv, terminalWidth, yargs }
