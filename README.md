# Feed #

A package for creating a social network style news feed


## Post (class) - Extends [BaseModel][1] - Implements [CommentableModel][2] and [LikeableModel][3]##

### Instance Methods ###

**user()** - The user who's feed the post was added to.

**poster()** - The use who added the post to the feed. Poster may return the same as user if the user created the post in their own feed.

**checkOwnership()** - Check if the user is the poster or the user as both can delete the post.

**canUpdate()** - Check if the user is allowed to update the post. Only poster can change a post.


## Feed (class) - Extends [BaseModel][1] ##

Feed instances must be created by calling `user.feed()`. This will return the feed object for that user. You can then call the methods of the feed as needed.

### Instance Methods ###

**addPost(&lt;String&gt; body)** - Add a post to the users feed.

```javascript
Meteor.user().feed().addPost("Socialize Packages Rock!");
```

## User Extensions ##

**User.prototype.feed()** - Get a feed object for the user.

```javascript
var feed = Meteor.user().feed();
```


## Publications ##

**posts {limit, skip, sort:{field:direction}}** - publish the posts for the current user and of their friends.

```javascript
Meteor.subscribe("posts", {limit:10, skip:10, sort:{date:-1});
```

[1]: https://github.com/copleykj/socialize-base-model
[2]: https://github.com/copleykj/socialize-commentable
[3]: https://github.com/copleykj/socialize-likeable
