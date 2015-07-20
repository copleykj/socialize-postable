/**
 * Get a the feed object for a user containing functions relevant
 * to a users news feed
 *
 * @returns {Object} The feed object
 */
User.prototype.feed = function () {
    var self = this;
    return {
        addPost: function (body) {
            new Post({body:body}).save();
        }
    };
};
