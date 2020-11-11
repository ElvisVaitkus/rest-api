let lietotaji = require('../data/lietotaji')
//const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(lietotaji)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const lietotajs = lietotaji.find((l) => l.id === id)
        resolve(lietotajs)
    })
}

function create(lietotajs) {
    return new Promise((resolve, reject) => {
        const newLietotajs = {id: uuidv4(), ...lietotajs}
        lietotaji.push(newLietotajs)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/lietotaji.json', lietotaji);
        }
        resolve(newLietotajs)
    })
}

function update(id, lietotajs) {
    return new Promise((resolve, reject) => {
        const index = lietotaji.findIndex((l) => l.id === id)
        lietotaji[index] = {id, ...lietotajs}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/lietotaji.json', lietotaji);
        }
        resolve(lietotaji[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        lietotaji = lietotaji.filter((l) => l.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/lietotaji.json', lietotaji);
        }
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}