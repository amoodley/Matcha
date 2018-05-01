var express = require('express')
var router = express.Router()

// define the home page route
router.get('/', (req, res) => {
	res.render('index', {
		title: 'Home',
	});
});

module.exports = router;