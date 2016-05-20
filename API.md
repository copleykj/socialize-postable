# PostableModel #

PostableModel is a BaseModel mixin which adds posting capabilities to models you create.

```javascript
class Group extends PostableModel(BaseModel) {
    constructor(doc){
        super(doc);
    }
}
```
## Methods ##

`addPost(<String> body)` - Add a post connected to the model.

`posts(<Number> limit, <Number> skip, <String> sortBy, <Number> sortOrder)` - Retrieve the posts for the model. ***From the client this will depend on the posts being published.***


# Post #
***Extends [BaseModel][1], Implements [CommentableModel][2] and [LikeableModel][3]***

Model for the record of each post on a connected Model.

## Methods ##

`poster()` - The use who added the post to the feed. Poster may return the same as user if the user created the post in their own feed.

`checkOwnership()` - Check if the user is the poster or the user as both can delete the post.

`canUpdate()` - Check if the user is allowed to update the post. Only poster can change a post.

[1]: https://github.com/copleykj/socialize-base-model
[2]: https://github.com/copleykj/socialize-commentable
[3]: https://github.com/copleykj/socialize-likeable
