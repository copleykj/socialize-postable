PostsCollection.allow({
    insert: function (userId, post) {
        var user = User.createEmpty(post.userId);
        var poster = User.createEmpty(post.posterId);
        if(user.isSelf(poster)){
            return true;
        }else {
            return userId && !user.blocksUser(poster) && ! poster.blocksUserById(user);
        }
    },
    update: function (userId, post) {
        return userId && post.checkOwnership();
    },
    remove: function(userId, post){
        return userId && post.checkOwnership();
    }
});


PostsCollection.after.remove(function(userId, post){
    //clean up any comments or likes that were linked to the deleted post
    Meteor.comments.remove({linkedObjectId:post._id});
    Meteor.likes.remove({linkedObjectId:post._id});
});
