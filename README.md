# Feed #

A package for creating a social network style news feed


## Post - Extends CommentableModel##

**Post.prototype.user()** - The user who's feed the post was added to.

**Post.prototype.poster()** - The use who added the post to the feed.

**Post.prototype.checkOwnership()** - Check if the user is the poster or the user as both can delete the post.

**Post.prototype.canUpdate()** - Check if the user is allowed to update the post. Only poster can change a post.


## User Extensions ##

**User.prototype.feed()** - Get a feed object for the user.

### Feed Ojbect ###

**addPost(body)** - add a post the the users feed.

## Publications ##

**posts {limit, skip, sort:{field:direction}}** - publish the posts for the current user and of their friends.

```javascript
Meteor.subscribe("posts", {limit:10, skip:10, sort:{date:-1});
```
