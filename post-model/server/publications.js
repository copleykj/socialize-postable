Meteor.publish('posts', function(options) {
    var friendMap;

    if(!this.userId){
        return this.ready();
    }

    friendMap = Meteor.friends.find({userId:this.userId}, {fields:{friendId:true}}).map(function(friend){
        return friend.friendId;
    });

    friendMap.push(this.userId);

    options = options || {};

    //only allow the limit and skip options
    options = _.pick(options, "limit", "skip", "sort");

    Meteor.publishWithRelations({
        handle: this,
        collection: Meteor.posts,
        filter: {$or:[{userId:{$in:friendMap}}, {posterId:{$in:friendMap}}]},
        options:options,
        mappings: [{
            key: 'userId',
            collection: Meteor.users,
            options:{fields:{username:true, avatarId:true}}
        }, {
            reverse: true,
            key: 'linkedObjectId',
            collection: Meteor.comments,
            options:{sort:{date:-1}, limit:3},
            mappings: [{
                key: 'userId',
                collection: Meteor.users,
                options:{fields:{username:true, avatarId:true}}
            }]
        }]
    });

});
