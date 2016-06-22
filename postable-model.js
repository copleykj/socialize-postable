import { Post, PostsCollection } from './post-model';


/**
 * PostableModel - A mixin to provide postable behavior to models
 */
export const PostableModel = Base => class extends Base {
    constructor(document){
        super();
    }
    addPost(body) {
        new Post({
            body:body,
            linkedObjectId:this._id,
            objectType:this._objectType
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
        var options = {};

        if (limit) {
            options.limit = limit;
        }

        if (skip) {
            options.skip = skip;
        }

        if(sortBy && sortOrder){
            options.sort = {};
            options.sort[sortBy] = sortOrder;
        }

        return PostsCollection.find({linkedObjectId:this._id}, options);
    }
}
