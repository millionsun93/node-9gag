# node-9gag

*A simple API for accessing 9gag*

## Installation

npm install node-9gag

##Usage

```js
var gag = require('node-9gag')
```

- Find a post on 9gag

```js
gag.find('query', function (err, res) {
  // res = [
  //   {
  //     query: ,
  //     sectionHeader: ,
  //     result: {
  //       title: ,
  //       id: ,
  //       url: ,
  //       image:
  //     }
  //   }
  // ]
});
```

- Get details of a post from its id

```js
gag.getItem('id', function (err, res) {
  // res = {
  //   title: ,
  //   points: ,
  //   commentCount: ,
  //   image:
  // }
});
```

- Access a section on 9gag (defaults to hot)

```js
gag.section('section'[, hot/fresh], 'nextpage'[optional, empty if you dont have next page url], function (err, res) {
  // res = {
  //   nextPage:null,
  //   posts:[
  //   {
  //     title: null,
  //     id: null,
  //     url: null,
  //     image: null,
  //     points: null,
  //     commentCount: null
  //   }]
  // }
});
```

- Access the comments of a post

```js
gag.comments('id', function (err, res) {
  // res = [
  //   {
  //     user: null,
  //     text: null
  //   }
  // ]
});
```

- Get the posts of an user

```js
gag.user('id','nextpage'[optional, empty if you dont have next page url], function (err, res) {
  // res = {
  //   nextPage:null,
  //   posts:[
  //   {
  //     title: null,
  //     id: null,
  //     url: null,
  //     image: null,
  //     points: null,
  //     commentCount: null
  //   }]
  // }
});
