/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { LikeableModel } from 'meteor/socialize:likeable';
import { CommentableModel } from 'meteor/socialize:commentable';
import { LinkableModel, LinkParent } from 'meteor/socialize:linkable-model';

export const PostsCollection = new Mongo.Collection('socialize:posts');

// create the schema for a post
const PostsSchema = new SimpleSchema({
    // The _id of the user who creates the post.
    posterId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue() {
            if (this.isInsert) {
                return this.userId;
            }
            return undefined;
        },
        denyUpdate: true,
    },
    // The date at which the post was created.
    createAt: {
        type: Date,
        autoValue() {
            if (this.isInsert) {
                return new Date();
            }
            return undefined;
        },
        denyUpdate: true,
    },
    // Latest update date
    updatedAt: {
        type: Date,
        optional: true,
        autoValue() {
          if (this.isInsert || this.isUpdate)
            return new Date();
        }
    },
    // The body text of the post
    body: {
        type: SimpleSchema.oneOf(String, Object),
    },
});

// Attach the schema
PostsCollection.attachSchema(PostsSchema);

/**
 *  A post model
 *  @class Post
 *  @extends LikeableModel
 *  @extends CommentableModel
 *  @extends LinkabelModel
 *  @extends BaseModel
 */
export class Post extends LikeableModel(CommentableModel(LinkableModel(LinkParent))) {
    /**
     * The user who created the post
     * @returns {User} The user who sent the post
     */
    poster() {
        // backwards compatability with old posts that only had the userId
        const posterId = this.posterId || this.userId;

        return Meteor.users.findOne(posterId);
    }

    /**
     * Check to see if the current user was either the user posted to or the posting user
     * @returns {Boolean} Whether the user is considered an "owner" of the post
     */
    canRemove() {
        const currentUserId = Meteor.userId();
        return this.posterId === currentUserId ||
            this.linkedObjectId === currentUserId ||
            this.linkedParent().userId === currentUserId;
    }

    /**
     * Check if the current user is allowed to update the post
     * @returns {Boolean} Wheter or not the user is allowed to update the post
     */
    canUpdate() {
        const currentUserId = Meteor.userId();
        return this.posterId === currentUserId;
    }
}

// Attach the collection to the Post Class
Post.attachCollection(PostsCollection);

// attach likeable schema since we extend LikeableModel
Post.appendSchema(LikeableModel.LikeableSchema);
// attach commentable schemal since we extend CommentableModel
Post.appendSchema(CommentableModel.CommentableSchema);
// attach linkable schema since posts will now be linked to models that extend PostableModel
Post.appendSchema(LinkableModel.LinkableSchema);
// register the post model as a linkable type
LinkableModel.registerParentModel(Post);
