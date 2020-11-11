const Lietotajs = require('../models/lietotajsModel')

const { getPostData } = require('../utils')

// @desc    Gets All Lietotaji
// @route   GET /api/lietotaji
async function getLietotaji(req, res) {
    try {
        const lietotaji = await Lietotajs.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(lietotaji))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single Lietotajs
// @route   GET /api/lietotajs/:id
async function getLietotajs(req, res, id) {
    try {
        const lietotajs = await Lietotajs.findById(id)

        if(!lietotajs) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Lietotajs Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(lietotajs))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a Lietotajs
// @route   POST /api/lietotaji
async function createLietotajs(req, res) {
    try {
        const body = await getPostData(req)

        const { name, surname, age } = JSON.parse(body)

        const lietotajs = {
            name,
            surname,
            age
        }

        const newLietotajs = await Lietotajs.create(lietotajs)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newLietotajs))  

    } catch (error) {
        console.log(error)
    }
}

// @desc    Update a Lietotajs
// @route   PUT /api/lietotaji/:id
async function updateLietotajs(req, res, id) {
    try {
        const lietotajs = await Lietotajs.findById(id)

        if(!lietotajs) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Lietotajs Not Found' }))
        } else {
            const body = await getPostData(req)

            const { name, surname, age } = JSON.parse(body)

            const lietotajsData = {
                name: name || lietotajs.name,
                surname: surname || lietotajs.surname,
                age: age || lietotajs.age
            }

            const updLietotajs = await Lietotajs.update(id, lietotajsData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updLietotajs)) 
        }
 

    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete Lietotajs
// @route   DELETE /api/lietotajs/:id
async function deleteLietotajs(req, res, id) {
    try {
        const lietotajs = await Lietotajs.findById(id)

        if(!lietotajs) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Lietotajs Not Found' }))
        } else {
            await Lietotajs.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Lietotajs ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getLietotaji,
    getLietotajs,
    createLietotajs,
    updateLietotajs,
    deleteLietotajs
}