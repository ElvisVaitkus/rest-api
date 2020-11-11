const http = require('http')
const { getLietotaji, getLietotajs, createLietotajs, updateLietotajs, deleteLietotajs } = require('./controllers/lietotajsController')

const app = http.createApp((req, res) => {
    if(req.url === '/api/lietotaji' && req.method === 'GET') {
        getlietotaji(req, res)
    } else if(req.url.match(/\/api\/lietotaji\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getLietotajs(req, res, id)
    } else if(req.url === '/api/lietotaji' && req.method === 'POST') {
        createLietotajs(req, res)
    } else if(req.url.match(/\/api\/lietotaji\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateLietotajs(req, res, id)
    } else if(req.url.match(/\/api\/lietotaji\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteLietotajs(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }
})

const PORT =  process.env.PORT || 5000

app.listen(PORT, () => console.log(`App running on port ${PORT}`))

module.exports = app;
