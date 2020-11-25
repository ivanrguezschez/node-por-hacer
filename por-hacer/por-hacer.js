const fs = require('fs');

let listadoPorHacer = []

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    // Guardamos las tareas en un archivo JSON
    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error('No se pudo grabar', err);
        }
    });        
};

const cargarDB = () => {
    try {
        // require lee un archivo y al detectar que es JSON lo desserializa a un objeto javascript
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
};

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completada: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
};

const getListado = (completada = true) => {
    cargarDB();

    //return listadoPorHacer;
    
    let nuevoListado = listadoPorHacer.filter( tarea => tarea.completada + '' == completada);
    return nuevoListado;
};

const actualizar = (descripcion, completada = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completada = completada;
        guardarDB();
        return true;
    } else {
        return false;
    }
}


const borrar = (descripcion) => {
    cargarDB();
    /*
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        let arrDeletedItems = listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
    */
    let nuevoListado = listadoPorHacer.filter( tarea => tarea.descripcion !== descripcion);
    if (listadoPorHacer.length == nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}