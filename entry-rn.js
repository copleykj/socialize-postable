/* eslint-disable import/no-unresolved */
import Meteor, { Mongo } from '@socialize/react-native-meteor';
import { LikeableModel } from '@socialize/likeable';
import { CommentableModel } from '@socialize/commentable';
import { LinkableModel, LinkParent } from '@socialize/linkable-model';
import { ServerTime } from '@socialize/server-time';
/* eslint-enable import/no-unresolved */

import PostConstruct from './common/post-model.js';
import PostableConstruct from './common/postable-model.js';

export const { Post, PostsCollection } = PostConstruct({
    Meteor, Mongo, LikeableModel, CommentableModel, LinkableModel, LinkParent, ServerTime,
});
export const { PostableModel } = PostableConstruct({ Meteor, LinkParent, Post, PostsCollection });
