Feed = BaseModel.extend();

Feed.methods({
    addPost: function (body) {
        new Post({body:body}).save();
    }
});
/**
 * Get a the feed object for a user containing functions relevant
 * to a users news feed
 *
 * @returns {Object} The feed object
 */
User.prototype.feed = function () {
    var feed = new Feed();
    feed.userId = this._id;
    return feed;
};
