const express = require('express')

const router = express.Router();

const locationStroage = {
    location: []
}

router.post('/add-location', (req, res, next) => {
    locationStroage.location.push({
        id: Math.random(),
        address: req.body.address,
        coords: {}
    })
})


router.get('/location', (req, res, next) => {
    res.send('Hello thong.')
})

module.exports = router