// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
// test route
// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });

// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

//import routes/api/index.js file and connect it to the router here
router.use('/api', apiRouter);

module.exports = router;