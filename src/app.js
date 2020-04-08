const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')


const app = express()
const port = process.env.PORT || 3000
//use views to set up express
const viewsPath = path.join(__dirname, "../templates/views")
const publicDirectoryPath = path.join(__dirname, '../public')
const patialPaths = path.join(__dirname, "../templates/partials")


//set up the hbs view engines
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(patialPaths)

//express set up the static path to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sandeep'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sandeep'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sandeep'
    })
})

app.get('/weather', (req, res) => {
    console.log(res.query)
    if (!req.query.address) {
        return res.send({
            error: "address needs to be mentioned."
        })
    }

    geocode(req.query.address, (error, { latitude, longitude } = {}) => {

        if (error) {
            return res.send({ error })
        }

        res.send( {
            latitude: latitude,
            longitude: longitude
        })
    })

    // res.send({
    //     location: 'Bangalore',
    //     temperature: '20',
    //     querystring: req.query.address
    // })
})


app.get('/products', (req, res) => {

    if (!req.query.searchterm) {
        return res.send({
            error: "No search term mentioned. please mention it."
        })
    }
    console.log(req.query)
    res.send({
        product: []
    })


})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'help article not found'
    })

})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'generic 404 not found'
    })
})



app.listen(port, () => {
    console.log('server is up and running at ' + port)
})