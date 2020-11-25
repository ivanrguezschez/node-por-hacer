//$node app crear --descripcion "Descripcion de la tarea"
//$node app listar
//$node app actualizar --descripcion "Descripcion de la tarea" --completado true
//$node app borrar --descripcion "Descripcion de la tarea"

const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};
const completada = {
    alias: 'c',
    default: true,
    desc: 'Marca como completada o pendiente la tarea'
};

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {descripcion}) 
    .command('listar', 'Mostrar todas las tareas por hacer', {completada})
    .command('actualizar', 'Actualiza el estado completado de una tarea', {descripcion, completada}) 
    .command('borrar', 'Borra una tarea por hacer', {descripcion}) 
    .help() 
    .argv;

module.exports = {
    argv
}