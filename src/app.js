const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handlbars setup for engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Brandon Mrgich'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Brandon Mrgich'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Stop it. Get some help.',
        title: 'Help',
        name: 'Brandon Mrgich'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ err: 'You must provide an address.'})
    }

    geocode(req.query.address, (err, { longitude, latitude, location } = {}) => {
        if (err) return res.send({ err })
        
        weather(latitude, longitude, (err, { temperature, description }) => {
            if (err) return res.send({ err })

            res.send({
                address: req.query.address,
                location,
                description,
                temperature
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'You must provide a search term' })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brandon Mrgich',
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brandon Mrgich',
        error: 'Page not found.'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})