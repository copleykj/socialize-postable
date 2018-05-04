# Postable

A package for creating models that can be posted on. User profiles could be postable to create a news feed. Groups could be posted on to give users common areas to talk about specific topics. Other postable things are up to your imagination.

>This is a [Meteor][meteor] package with part of it's code published as a companion NPM package made to work with React Native. This allows your Meteor and React Native projects that use this package to share code between them to give you a competitive advantage when bringing your mobile and web application to market.

<!-- TOC START min:1 max:3 link:true update:true -->
- [Postable](#postable)
  - [Supporting the Project](#supporting-the-project)
  - [Installation](#installation)
  - [React Native Installation](#react-native-installation)
  - [Basic Usage](#basic-usage)
  - [Scalability - Redis Oplog](#scalability---redis-oplog)

<!-- TOC END -->

## Supporting the Project
In the spirit of keeping this and all of the packages in the [Socialize][socialize] set alive, I ask that if you find this package useful, please donate to it's development.

Litecoin: LXLBD9sC5dV79eQkwj7tFusUHvJA5nhuD3 / [Patreon](https://www.patreon.com/user?u=4866588) / [Paypal](https://www.paypal.me/copleykj)

## Meteor Installation

This package relies on the npm package `simpl-schema` so you will need to make sure it is installed as well.

```shell
$ meteor npm install --save simpl-schema
$ meteor add socialize:postable
```

## React Native Installation

When using this package with React Native, the dependency tree ensures that `simpl-schema` is loaded so there's no need to install it as when using within Meteor.

```shell
$ npm install --save @socialize/postable
```
> **Note**
>
>  When using with React Native, you'll need to connect to a server which hosts the server side Meteor code for your app using `Meteor.connect` as per the [@socialize/react-native-meteor](https://www.npmjs.com/package/@socialize/react-native-meteor#example-usage) documentation.

## Basic Usage

For the most part you will probably be able to find the functionality you need in another socialize package. The user-profile package implements this to provide a feed for each users profile. That being said you can use this directly and create new classes that are postable. One example that the set doesn't not currently provide, but hopefully will in the future, is Groups so we will use this as our example.

Depending on the environment your code will be running in, you'll need to import the classes from the packages specific to that environment, either Meteor or React Native.

```javascript
// Meteor Imports
import { Mongo } from 'meteor/mongo';
import { LinkableModel } from 'meteor/socialize:linkable-model';
import { BaseModel } from 'meteor/socialize:base-model';
import { PostableModel } from 'meteor/socialize:postable';
```

```javascript
// React Native Imports
import { Mongo } from '@socialize/react-native-meteor';
import { LinkableModel } from '@socializesocialize/linkable-model';
import { BaseModel } from '@socializesocialize/base-model';
import { PostableModel } from '@socializesocialize/postable';
```
Once we have the appropriate packages imported, the rest of the code will run in either environment.

```javascript
//create the collection to store information about each group
const GroupsCollection = new Mongo.Collection("groups");

//define the group class and use the PostableModel mixin extending BaseModel.
class Group extends PostableModel(BaseModel){
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

For a more in depth explanation of how to use this package see [API.md][api]

## Scalability - Redis Oplog

This package implements [cultofcoders:redis-oplog][redis-oplog]'s namespaces to provide reactive scalability as an alternative to Meteor's `livedata`. Use of redis-oplog is not required and will not engage until you install the [cultofcoders:redis-oplog][redis-oplog] package and configure it.

[redis-oplog]:https://github.com/cultofcoders/redis-oplog
[api]: https://github.com/copleykj/socialize-postable/blob/master/API.md
[socialize]: https://atmospherejs.com/socialize
[meteor]: https://meteor.com
