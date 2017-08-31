/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { LinkParent } from 'meteor/socialize:linkable-model';
/* eslint-enable import/no-unresolved */

import { Post, PostsCollection } from './post-model';

/**
 * PostableModel - A mixin to provide postable behavior to models
 */
export const PostableModel = Base => class extends Base { //eslint-disable-line
    constructor(document) {
        super(document);
        if (!(this instanceof LinkParent)) {
            throw new Meteor.Error('MustExtendParentLink', 'LikeableModel must extend LinkParent from socialize:linkable-model');
        }
    }
    addPost(body) {
        new Post({
            body,
            ...this.getLinkObject(),
        }).save();
    }

    /**
     * Get the posts for a model that is able to be commented on
     * @param  {Object} [options={}] Mongo style options object which is passed to Collection.find()
     * @returns {Mongo.Cursor} A cursor that returns post instances
     */
    posts(options = {}) {
        return PostsCollection.find(this.getLinkObject(), options);
    }
};
