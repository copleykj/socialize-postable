/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { LikeableModel } from 'meteor/socialize:likeable';
import { CommentableModel } from 'meteor/socialize:commentable';
import { LinkableModel, LinkParent } from 'meteor/socialize:linkable-model';
import { ServerTime } from 'meteor/socialize:server-time';
/* eslint-enable import/no-unresolved */

import PostConstruct from './post-model.js';
import PostableConstruct from './postable-model.js';

export const { Post, PostsCollection } = PostConstruct({
    Meteor, Mongo, LikeableModel, CommentableModel, LinkableModel, LinkParent, ServerTime,
});
export const { PostableModel } = PostableConstruct({ Meteor, LinkParent, Post, PostsCollection });
