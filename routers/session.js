const express = require('express')

const router = new express.Router()

//
router.get('/', async (req, res) => {
    if (req.session.name === undefined) {
        res.clearCookie('connect.sid')
        res.status(200).json({loggedin: false})
    } else {
        res.status(200).json({loggedin: true})
    }
})

module.exports = router
