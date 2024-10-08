const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');

//import check function and handleValidationError function for validating signup
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//delete a spot img
router.delete('/:id', requireAuth, async(req, res, next) => {

  const { id: imgId } = req.params;
  const { user } = req;
  const deleteImg = await SpotImage.findByPk(imgId);

  if (!deleteImg) {
    return res.status(404).json({
      "message": "Spot Image couldn't be found"
    })
  };

  const spot = await Spot.findByPk(deleteImg.spotId);

  if (spot && spot.ownerId !== user.id) {
    return res.status(403).json({
      "message": "Forbidden"
    })
  };

  await deleteImg.destroy();

  return res.json({
    "message": "Successfully deleted"
  })
})


module.exports = router;