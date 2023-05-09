const router = require('express').Router()
const {User, Messages, Matches} = require('../../models')

router.post('/', async (req, res) => {
    try{ 
        const messageData = await Messages.create({
            text: req.body.text,
            user1Id: req.session.id,
            user2Id: req.body.user2Id
        })

        if (!messageData) {
            res.status(400).json({message: 'Please try again'})
        }

        res.status(200).json({message: 'Message sent'})
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/', async (req, res) => {
    try{
        const messageData = await Messages.findAll({where: {
            user1Id: req.session.id,
            user2Id: req.body.user2Id
        }})

        res.status(200).json(messageData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// if extra time, make the unmatch feature below:
// ================
// router.delete('/unmatch')



module.exports = router