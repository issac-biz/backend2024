const express = require('express')
const User = require('../models/user')

const router = new express.Router()

//signup
router.post('/', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).json({user})
    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = router
