const router = require('express').Router()
const { User } = require('../../models')
const AuthUser = require('../../utils/auth.js')

router.post('/login', async (req, res) => {
    try{ 
        const userData = await User.findOne({ where: { email: req.body.email}})

        if (!userData) {
            res.status(400).json({ mesage: 'Invalid email or password' })
            return
        }

        const validPassword = await userData.checkPassword(req.body.password)

        if (!validPassword) {
            res.status(400).json({ message: 'Invalid email or password' })
            return
        }

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true

        })
        res.status(200).json({ message: 'Logged in' })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body)

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true;
        })

        res.status(200).json({ message: 'Account created' })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/logout', AuthUser, (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => res.status(204).end())
    } else {
        res.status(404).end();
    }
})

router.put('/edit', AuthUser, async (req, res) => {
    try {
        const userData = await User.update(req.body, {where: {id: req.session.id}})

        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/delete', AuthUser, async (req, res) => {
    try {
        User.destroy({where: {id: req.session.user_id}})
       
        res.status(204).end();
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router