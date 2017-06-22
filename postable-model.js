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
     * @param   {Number}       limit     The maximum number of records to return
     * @param   {Number}       skip      The number of records to skip
     * @param   {String}       sortBy    The field on which to sort
     * @param   {Number}       sortOrder The order in which to sort. 1 for ascending and -1 for descending
     * @returns {Mongo.Cursor} A cursor that returns post instances
     */
    posts(limit, skip, sortBy, sortOrder) {
        const options = {};

        if (limit) {
            options.limit = limit;
        }

        if (skip) {
            options.skip = skip;
        }

        if (sortBy && sortOrder) {
            options.sort = {};
            options.sort[sortBy] = sortOrder;
        }

        return PostsCollection.find(this.getLinkObject(), options);
    }
};
