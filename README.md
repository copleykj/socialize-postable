# Postable

A package for creating models that can be posted on. User profiles could be postable to create a news feed. Groups could be posted on to give users common areas to talk about specific topics. Other postable things are up to your imagination.

>>This is a [Meteor][meteor] package with part of it's code published as a companion NPM package made to work with clients other than Meteor. For example your server is Meteor, but you want to build a React Native app for the client. This allows you to share code between your Meteor server and other clients to give you a competitive advantage when bringing your mobile and web application to market.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->
- [Supporting The Project](#supporting-the-project)
- [Meteor Installation](#meteor-installation)
- [NPM Installation](#npm-installation)
- [Usage Outside Meteor](#usage-outside-meteor)
  - [React Native](#react-native)
- [Basic Usage](#basic-usage)
- [Scalability - Redis Oplog](#scalability---redis-oplog)
<!-- /TOC -->

## Supporting The Project

Finding the time to maintain FOSS projects can be quite difficult. I am myself responsible for over 30 personal projects across 2 platforms, as well as Multiple others maintained by the [Meteor Community Packages](https://github.com/meteor-community-packages) organization. Therfore, if you appreciate my work, I ask that you either sponsor my work through GitHub, or donate via Paypal or Patreon. Every dollar helps give cause for spending my free time fielding issues, feature requests, pull requests and releasing updates. Info can be found in the "Sponsor this project" section of the [GitHub Repo](https://github.com/copleykj/socialize-postable)

## Meteor Installation

This package relies on the npm package `simpl-schema` so you will need to make sure it is installed as well.

```shell
meteor npm install --save simpl-schema
meteor add socialize:postable
```

## NPM Installation

When using this package with React Native, the dependency tree ensures that `simpl-schema` is loaded so there's no need to install it as when using within Meteor.

```shell
npm install --save @socialize/postable
```

## Usage Outside Meteor

The client side parts of this package are published to NPM as `@socialize/cloudinary` for use in front ends outside of Meteor.

When using the npm package you'll need to connect to a server, which hosts the server side Meteor code for your app, using `Meteor.connect` as per the [@socialize/react-native-meteor usage example](https://github.com/copleykj/react-native-meteor#example-usage) documentation.

 ```javascript
Meteor.connect('ws://192.168.X.X:3000/websocket');
 ```

### React Native

When using this package with React Native there is some minor setup required by the `@socialize/react-native-meteor` package. See [@socialize/react-native-meteor react-native](https://github.com/copleykj/react-native-meteor#react-native) for necessary instructions.

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
