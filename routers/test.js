const express = require('express')
const router = express.Router()

router.get('/api/tests/01', async (req, res) => {
    res.json({message: 'how are you today?'})
})

module.exports = router