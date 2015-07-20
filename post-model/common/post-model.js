/**
 *  A post model
 *  @class Post
 */
Post = CommentableModel.extendAndSetupCollection("posts");

/**
 * The user who's feed the post was added to
 * @returns {User} The user who the post was to.
 */
Post.prototype.user = function() {
    return Meteor.users.findOne(this.userId);
};

/**
 * The user who created the post
 * @returns {User} The user who sent the post
 */
Post.prototype.poster = function() {
    //backwards compatability with old posts that only had the userId
    var posterId = this.posterId || this.userId;

    return Meteor.users.findOne(posterId);
};

/**
 * Check to see if the current user was either the user posted to or the posting user
 * @returns {Boolean} Whether the user is considered an "owner" of the post
 */
Post.prototype.checkOwnership = function () {
    var currentUserId = Meteor.userId();
    return this.userId === currentUserId || this.posterId === currentUserId;
};

/**
 * Check if the current user is allowed to update the post
 * @returns {Boolean} Wheter or not the user is allowed to update the post
 */
Post.prototype.canUpdate = function () {
    var currentUserId = Meteor.userId();
    return this.userId === currentUserId;
};


//create the schema for a post
Post.appendSchema({
    "posterId":{
        type:String,
        regEx:SimpleSchema.RegEx.Id,
        autoValue:function () {
            if(this.isInsert || !this.isFromTrustedCode){
                return Meteor.userId();
            }
        },
        denyUpdate:true
    },
    "userId":{
        type:String,
        regEx:SimpleSchema.RegEx.Id,
        autoValue:function () {
            if(this.isInsert && !this.isSet){
                return Meteor.userId();
            }
        },
        denyUpdate:true
    },
    "date":{
        type:Date,
        autoValue:function() {
            if(this.isInsert || !this.isFromTrustedCode){
                return new Date();
            }
        },
        denyUpdate:true
    },
    "type":{
        type:String,
        defaultValue:"standard",
    },
    "body":{
        type:String
    },
});

PostsCollection = Post.collection;

//attach likeable schema since we extend LikeableModel
Post.appendSchema(LikeableModel.LikeableSchema);
//attach commentable schemal since we extend CommentableModel
Post.appendSchema(CommentableModel.CommentableSchema);

//register the post model as a linkable type
LinkableModel.registerLinkableType(Post, "post");
