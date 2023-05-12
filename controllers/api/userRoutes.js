// Import required modules
const router = require('express').Router()
const { User } = require('../../models')
const AuthUser = require('../../utils/auth.js')

// Route to log in a user
router.post('/login', async (req, res) => {
    try{ 
        // Find user data based on email
        const userData = await User.findOne({ where: { email: req.body.email}})

        // If user data doesn't exist, respond with an error message
        if (!userData) {
            res.status(400).json({ mesage: 'Invalid email or password' })
            return
        }
        // Check if the password provided is valid
        const validPassword = await userData.checkPassword(req.body.password)
        
        // Get the user data as plain object
        const user = userData.get({plain: true})
        
        // If password is invalid, respond with an error message
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid email or password' })
            return
        }
        // Save user session data
        req.session.save(() => {
            req.session.user_id = user.id
            req.session.logged_in = true

            res.status(200).json({ message: 'Logged in' })
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// Route to sign up a user
router.post('/signup', async (req, res) => {
    try {
        // Create a new user based on the request body
        const userData = await User.create(req.body)

        // Get the user data as plain object
        const user = userData.get({plain: true})

        // Save user session data
        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true;

            res.status(200).json({ message: 'Account created' })
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// Route to log out a user
router.post('/logout', AuthUser, (req, res) => {
    // If user is logged in, destroy their session data
    if (req.session.logged_in) {
        req.session.destroy(() => res.status(204).end())
    } else {
        res.status(404).end();
    }
})

// Route to edit user info
router.put('/edit', async (req, res) => {
    try {
        // Update user info based on the request body and session user ID
        const userData = await User.update({
            userName: req.body.userName,
            email: req.body.email,
            bio: req.body.bio,
            age: req.body.age,
            training_goals: req.body.training_goals
        }, 
        {
            where: {id: req.session.user_id}
        })
        // Respond with success message
        res.status(200).json({message: 'user info successfully updated'})
    } catch (err) {
        res.status(500).json(err)
    }
})

// Route to delete a user
router.delete('/delete', AuthUser, async (req, res) => {
    try {
        // Delete user based on session user ID
        User.destroy({where: {id: req.session.user_id}})
       
        // Respond with success message
        res.status(204).end();
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router