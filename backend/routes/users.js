const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');


// get profile
router.get('/me', auth, async (req, res) => {
try {
const user = await User.findById(req.user.id).select('-passwordHash');
if (!user) return res.status(404).json({ msg: 'User not found' });
const posts = await Post.find({ user: user.id }).sort({ createdAt: -1 });
res.json({ user, posts });
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


// update profile
router.put('/', auth, async (req, res) => {
try {
const { name, bio } = req.body;
const user = await User.findById(req.user.id);
if (!user) return res.status(404).json({ msg: 'User not found' });
if (name) user.name = name;
if (bio !== undefined) user.bio = bio;
await user.save();
res.json({ id: user.id, name: user.name, email: user.email, bio: user.bio });
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


module.exports = router;