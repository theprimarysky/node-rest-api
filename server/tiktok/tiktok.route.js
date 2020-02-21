const express = require("express");
const validate = require("express-validation");
const tiktokParamValidation = require("./tiktok.validation");
const tiktokCtrl = require("./tiktok.controller");

const router = express.Router(); // eslint-disable-line new-cap

router
  .route("/")
  /** GET /api/awemes - Get list of awemes */
  .get(tiktokCtrl.list)

  /** POST /api/awemes - Create new aweme */
  .post(validate(tiktokParamValidation.createAweme), tiktokCtrl.create);

router
  .route("/:awemeId")
  /** GET /api/awemes/:awemeId - Get aweme */
  .get(tiktokCtrl.get)

  /** PUT /api/awemes/:awemeId - Update aweme */
  .put(validate(tiktokParamValidation.updateAweme), tiktokCtrl.update)

  /** DELETE /api/awemes/:awemeId - Delete aweme */
  .delete(tiktokCtrl.remove);

router
  .route("/:awemeId/rotate")
  /** PUT /api/awemes/:awemeId/rotate - Update aweme.rotateAngle */
  .put(validate(tiktokParamValidation.rotateAweme), tiktokCtrl.rotate);

router
  .route("/:awemeId/favourite")
  /** PUT /api/awemes/:awemeId - Update aweme.isFavourite to true */
  .put(tiktokCtrl.favourite)

  /** PUT /api/awemes/:awemeId - Update aweme.isFavourite to false */
  .delete(tiktokCtrl.favourite);

/** Load aweme when API with awemeId route parameter is hit */
router.param("awemeId", tiktokCtrl.load);

module.exports = router;
