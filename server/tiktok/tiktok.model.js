const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

/**
 * TikTok Schema
 */
const AwemeSchema = new mongoose.Schema(
  {
    /**
     * TikTok Source API Version
     * To keep up with the API changes in the
     * future
     */
    version: {
      type: Number,
      index: true,
      required: true
    },
    authorId: {
      type: String,
      index: true,
      required: true
    },
    awemeId: {
      type: String,
      index: true,
      unique: true,
      required: true
    },
    musicId: {
      type: String,
      index: true,
      required: true
    },

    /**
     * Store JSON data from TikTok
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

    diggCount: {
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
AwemeSchema.method({});

/**
 * Statics
 */
AwemeSchema.statics = {
  /**
   * Get aweme
   * @param {ObjectId} id - The objectId of aweme.
   * @returns {Promise<Aweme, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then(aweme => {
        if (aweme) {
          return aweme;
        }
        const err = new APIError("No such aweme exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List awemes in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Aweme[]>}
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
 * @typedef Aweme
 */
module.exports = mongoose.model("tiktok.awemes", AwemeSchema);
