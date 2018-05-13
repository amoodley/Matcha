const express = require('express');
const router = express.Router();

router.get('/:username', (req, res) => {
    var username = req.params.token;
	res.render('profile/profile', {
		title: username + '\'s profile'
	});
});

module.exports = router;