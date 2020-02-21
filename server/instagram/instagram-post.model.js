const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

/**
 * Instagram Post Schema
 */
const PostSchema = new mongoose.Schema(
  {
    /**
     * Instagram Post Source API Version
     * To keep up with the API changes in the
     * future
     */
    version: {
      type: Number,
      required: true,
      index: true
    },

    isVideo: {
      type: Boolean,
      required: true,
      index: true
    },

    isStory: {
      type: Boolean,
      required: true,
      index: true
    },

    mediaId: {
      type: String,
      required: true,
      index: true
    },

    userId: {
      type: Number,
      required: true,
      index: true
    },

    username: {
      type: String,
      required: true
    },

    filepath: {
      type: String,
      required: true,
      unique: true
    },

    /**
     * Store JSON data from Instagram Post
     */
    children: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },

    /**
     * Video posted or created time
     *
     */
    createTime: {
      type: Number,
      index: true,
      required: true
    },

    isFavourite: {
      type: Boolean,
      default: false,
      index: true
    },

    rotateAngle: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
PostSchema.method({});

/**
 * Statics
 */
PostSchema.statics = {
  /**
   * Get post
   * @param {ObjectId} id - The objectId of post.
   * @returns {Promise<Post, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then(post => {
        if (post) {
          return post;
        }
        const err = new APIError("No such post exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Get post by mediaId
   * @param {ObjectId} mediaId - The mediaId of post.
   * @returns {Promise<Post, APIError>}
   */
  media(mediaId) {
    return this.find({
      mediaId
    })
      .exec()
      .then(post => {
        if (post) {
          return post;
        }
        const err = new APIError("No such post exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List posts in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @param {object} filter - Query to filter for.
   * @param {string} sortBy - Use this key to sort the results.
   * @param {string} sortDir - Direction of sorting 'asc' or 'desc'.
   * @returns {Promise<Post[]>}
   */
  list({
    filter = {},
    skip = 0,
    limit = 50,
    sortBy = "createTime",
    sortDir = "asc"
  } = {}) {
    return this.find(filter)
      .sort([[sortBy, sortDir]])
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Post
 */
module.exports = mongoose.model("instagram.posts", PostSchema);
