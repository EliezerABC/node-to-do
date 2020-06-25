import fs from 'fs'
import '@babel/polyfill'
import { terminalWidth } from '../config/yargs'
import { success as successColor, error as errorColor } from '../config/colors'

// Ruta de la y carpeta de la data
const dataFolder = './data'
const dataPath = './data/data.json'

// las tareas inician vacias y almacenaran objetos
let toDos = []

// Lista de mensajes de error/exito
const errorMsgs = {
  save: 'Error inesperado',
  create: errorColor('Ya existe una tarea con esa descripcion'),
  update: [
    errorColor('No existe una tarea con esa descripcion'),
    errorColor('La tarea ya estaba marcada como completa'),
    errorColor('La tarea ya estaba marcada como incompleta')
  ],
  delete: errorColor('No existe una tarea con esa descripcion'),
  show: [
    errorColor('No hay tareas para mostrar'),
    errorColor('No hay tareas para mostrar')
  ]
}

const successMsgs = {
  create: successColor('Tarea creada con exito'),
  update: successColor('Tarea actualizada con exito'),
  delete: successColor('Tarea eliminada con exito')
}

// Funciones para leer y guardar la data
const readData = async () => {
  let data
  try {
    data = JSON.parse(fs.readFileSync(dataPath))
  } catch {
    data = []
  }
  toDos = data
  return toDos
}

const saveData = async successMsg => {
  const data = JSON.stringify(toDos)

  // Se crea el directorio
  fs.mkdir(dataFolder, null, (err) => {
    if (err) {
      if (err.code !== 'EEXIST') {
        throw errorMsgs.save
      }
    }
  })
  // Se crea el fichero con la data
  fs.writeFile(dataPath, data, err => {
    if (err) {
      throw errorMsgs.save
    }
  })

  return successMsg
}

// Funciones para crear, actualizar, eliminar y listar las tareas
const createToDo = async description => {
  const toDo = {
    description,
    completed: false
  }
  const toDoExist = !!toDos.find(toDo => toDo.description === description)

  if (toDoExist) {
    throw errorMsgs.create
  } else {
    toDos.push(toDo)
    return successMsgs.create
  }
}

const updateToDo = async (description, completed) => {
  completed = Boolean(completed)
  const toDo = toDos.find(toDo => toDo.description === description)

  if (!toDo) {
    throw errorMsgs.update[0]
  } else if (completed && (toDo.completed === completed)) {
    throw errorMsgs.update[1]
  } else if (!completed && (toDo.completed === completed)) {
    throw errorMsgs.update[2]
  }
  // Se elimina la tarea para luego reemplazarla
  toDos = toDos.filter(toDo => toDo.description !== description)

  // Se inserta la nueva tarea
  toDos.push({
    ...toDo,
    completed: completed
  })

  return successMsgs.update
}

const deleteToDo = async description => {
  const origToDo = toDos.find(toDo => toDo.description === description)

  if (!origToDo) {
    throw errorMsgs.delete
  }
  toDos = toDos.filter(toDo => toDo.description !== origToDo.description)

  return successMsgs.delete
}

const showToDos = async showCompleteds => {
  let data = ''
  let toDosToShow = toDos
  const separator = '='.repeat(terminalWidth)

  if (showCompleteds === 'true') {
    showCompleteds = true
  } else if (showCompleteds === 'false') {
    showCompleteds = false
  } else if (showCompleteds !== undefined) {
    showCompleteds = Boolean(showCompleteds)
  }

  switch (showCompleteds) {
    case undefined:
      break
    case true:
      toDosToShow = toDosToShow.filter(toDo => toDo.completed === true)
      break
    case false:
      toDosToShow = toDosToShow.filter(toDo => toDo.completed === false)
      break
  }

  if (!toDosToShow[0]) {
    throw errorMsgs.show[0]
  }

  for (let i = 0; i < toDosToShow.length; i++) {
    data += `\n${separator}\n`
    data += `  ${successColor('Tarea #' + (i + 1))}\n`
    data += `  Descripcion: ${toDosToShow[i].description}\n`
    data += `  Status: ${toDosToShow[i].completed ? successColor('Completa') : errorColor('Incompleta')}\n`
  }
  data += `\n${separator}`
  return data
}

export { saveData, readData, createToDo, updateToDo, deleteToDo, showToDos }
