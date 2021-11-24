const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')

const app = express()

const bitcoin = []

app.get('/', (req,res) => {
    res.json('Welcome to my Crypto API')
})

app.get('/price', (req,res) => {
    axios.get('https://crypto.com/price')
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("Bitcoin")', html).each(function () {
            const title =  $(this).text()
            const url = $(this).attr('href')
            bitcoin.push({
                title,
                url
            })
        })
        res.json(bitcoin)
    }).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`server running on Port ${PORT}`))