const express = require('express')
const path = require('path')
const PORT = 5000

express()
    .set('view engine', 'ejs')
    .get('/', (_, res) => res.render('index'))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
