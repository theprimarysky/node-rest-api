const Joi = require("joi");

module.exports = {
  // POST /api/i/posts
  createPost: {
    body: {
      version: Joi.number().required(),
      isVideo: Joi.boolean().required(),
      isStory: Joi.boolean().required(),
      mediaId: Joi.string().required(),
      userId: Joi.number().required(),
      username: Joi.string().required(),
      filepath: Joi.string().required(),
      createTime: Joi.number().required()
    }
  },

  // UPDATE /api/i/posts/:postId
  // UPDATE /api/i/posts/:userId/:mediaId
  updatePost: {
    body: {
      version: Joi.number().required(),
      isVideo: Joi.boolean().required(),
      isStory: Joi.boolean().required(),
      mediaId: Joi.string().required(),
      userId: Joi.number().required(),
      username: Joi.string().required(),
      filepath: Joi.string().required(),
      createTime: Joi.number().required()
    },
    params: {
      postId: Joi.string().required()
    }
  },

  // UPDATE /api/i/posts/:postId/rotate
  rotatePost: {
    body: {
      rotateAngle: Joi.number().required()
    },
    params: {
      postId: Joi.string().required()
    }
  }
};
