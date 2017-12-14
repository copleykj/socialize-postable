# Postable #

A package for creating models that can be posted on. User profiles could be postable to create a news feed. Groups could be posted on to give users common areas to talk about specific topics. Other postable things are up to your imagination.

## Supporting the Project ##
In the spirit of keeping this and all of the packages in the [Socialize](https://atmospherejs.com/socialize) set alive, I ask that if you find this package useful, please donate to it's development.

[Bitcoin](https://www.coinbase.com/checkouts/4a52f56a76e565c552b6ecf118461287) / [Patreon](https://www.patreon.com/user?u=4866588) / [Paypal](https://www.paypal.me/copleykj)

## Installation ##

>meteor add socialize:postable

## Basic Usage ##

For the most part you will probably be able to find the functionality you need in another socialize package. The user-profile package implements this to provide a feed for each users profile. That being said you can use this directly and create new classes that are postable.

```javascript
import { Mongo } from 'meteor/mongo';
import { LinkableModel } from 'meteor/socialize:linkable-model';
import { BaseModel } from 'meteor/socialize:base-model';
import { PostableModel } from 'meteor/socialize:postable';

//create the collection to store information about each group
const GroupsCollection = new Mongo.Collection("groups");

//define the group class and use the PostableModel mixin extending BaseModel.
class Group extends PostableModel(BaseModel){
    //Must have a constructor which accepts a document
    constructor(document){
        //call super to make sure we are extending the class with the document
        super(document);
    }

    //methods of the Group classes

    members(){
        return GroupMembersCollection.find({groupId:this._id});
    }
}

//Attach the collection to the group class so we can use CRUD methods provided by BaseModel
Group.attachCollection(GroupsCollection);

//Register the Group class as a linkable type since posts will be linked to a group.
LinkableModel.registerParentModel(Group);

//Create a new group using BaseModel's save method
new Group({name:"Meteor Lovers"});

//Get an instance of group by querying MongoDB
var group = GroupsCollection.findOne();

console.log(group.name); // -> "Meteor Lovers"

group.members().forEach(member => {
    console.log(member.user().username);
});
```

\* __*Take note of the call to `LinkableModel.registerParentModel`*__. This is necessary to setup the link between the Model (in this case Group) and the posts connected to it.

For a more in depth explanation of how to use this package see [API.md](API.md)
