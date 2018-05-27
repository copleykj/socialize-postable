/* eslint-disable import/no-unresolved */
import { CommentsCollection } from 'meteor/socialize:commentable';
import { LikesCollection } from 'meteor/socialize:likeable';
/* eslint-enable import/no-unresolved */

import { Post, PostableModel, PostsCollection } from '../common/common.js';

PostsCollection.allow({
    update(userId, post) {
        return userId && post.canUpdate();
    },
    remove(userId, post) {
        return userId && post.canRemove();
    },
});


PostsCollection.after.remove(function afterRemove(userId, post) {
    // clean up any comments or likes that were linked to the deleted post
    CommentsCollection.remove({ linkedObjectId: post._id });
    LikesCollection.remove({ linkedObjectId: post._id });
});

export { Post, PostableModel, PostsCollection };
