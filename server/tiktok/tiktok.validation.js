const Joi = require("joi");

module.exports = {
  // POST /api/awemes
  createAweme: {
    body: {
      version: Joi.number().required(),
      authorId: Joi.string().required(),
      awemeId: Joi.string().required(),
      children: Joi.exist(),
      createTime: Joi.number().required(),
      diggCount: Joi.number().required(),
      musicId: Joi.string().required()
    }
  },

  // UPDATE /api/awemes/:awemeId
  updateAweme: {
    body: {
      version: Joi.number().required(),
      authorId: Joi.string().required(),
      awemeId: Joi.string().required(),
      children: Joi.exist(),
      createTime: Joi.number().required(),
      diggCount: Joi.number().required(),
      musicId: Joi.string().required()
    },
    params: {
      awemeId: Joi.string().required()
    }
  },

  // UPDATE /api/awemes/:awemeId/rotate
  rotateAweme: {
    body: {
      rotateAngle: Joi.number().required()
    },
    params: {
      awemeId: Joi.string().required()
    }
  }
};
