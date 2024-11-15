const express = require('express')
const User = require('../models/user')

const router = new express.Router()

//sign up
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).json({name: user.name})
    } catch (error) {
        if (error.code == 11000) {
            res.status(400).json({message: `${req.body.name} and/or ${req.body.email} is already registered`})
        } else {
            if (/password.*length/.test(error.message)) {
                res.status(400).json({message: "password length must be longer than 6"})
            } else if (/name.*length/.test(error.message)) {
                res.status(400).json({message: "name length must be longer than 2"})
            } else {
                res.status(400).json({message: error.message})
            }
            
        }
    }
})

//inactivate
router.delete('/', async(req, res) => {
    if (req.session.name === undefined) {
        res.status(400).json({message: 'not logged in'})
    } else {
        let user = null
        const name = req.session.name
        try {
            user = await User.findOne({name})
        } catch (error) {
            res.status(404).json({message: error.message})
            return
        }
        try {
            await User.deleteOne({ _id: user._id })
        } catch (error) {
            res.status(500).json({message: error.message})
        }
        res.clearCookie('connect.sid')
        req.session.name = user.name;
        req.session.destroy((err) => {
            if (err) {
                res.status(200).json({name, message: err.message})
            } else {
                res.status(200).json({name})
            }
        })
    
    }
})

//login
router.post('/login', async (req, res) => {
    const user = new User(req.body)
    try {
        const user = await User.findByCredential(req.body.name, req.body.password)
        req.session.isLoggedIn = true;
        req.session.name = user.name;
        res.status(200).json({name: user.name})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//logout
router.get('/logout', async (req, res) => {
    res.clearCookie('connect.sid')
    if (req.session.name === undefined) {
        res.status(400).json({message: 'not logged in'})
    } else {
        name = req.session.name
        // Destroy session
        req.session.destroy((err) => {
            if (err) {
                res.status(200).json({name, message: err.message})
            } else {
                res.status(200).json({name})
            }
        })
    }
})

module.exports = router
