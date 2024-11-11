const express = require('express')
const User = require('../models/user')

const router = new express.Router()

//sign up
router.post('/', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).json({name: user.name})
    } catch (error) {
        res.status(400).send(error)
    }

})

//drop out

//login
router.post('/login', async (req, res) => {
    const user = new User(req.body)
    try {
        const user = await User.findByCredential(req.body.name, req.body.password)
        req.session.isLoggedIn = true;
        req.session.name = name;
        res.status(200).json({name: user.name})
    } catch (error) {
        res.status(400).send(error)
    }
})

//logout



module.exports = router
