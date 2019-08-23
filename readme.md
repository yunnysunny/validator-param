# validator-param

A library, which can create validators to validate request parameters easily. 

[![NPM](https://nodei.co/npm/validator-param.png?downloads=true)](https://nodei.co/npm/validator-param/)  

[![NPM version](https://img.shields.io/npm/v/validator-param.svg?style=flat-square)](https://npmjs.com/package/validator-param)
[![Build status](https://travis-ci.org/yunnysunny/validator-param.svg?branch=master)](https://travis-ci.org/yunnysunny/validator-param)
[![Test coverage](https://img.shields.io/coveralls/yunnysunny/validator-param.svg?style=flat-square)](https://coveralls.io/r/yunnysunny/validator-param?branch=master)

## Install
```npm install validator-param --save```

## How to use

### The basic usage

```javascript
const {expect} = require('chai');
const {Validator} = require('validator-param');

const schema = {
    requiredParam : {
        required: [true, new Error('The requiredParam can not be empty')]//when check failed return a Error object
    }
};
const validator = new Validator(schema);
const error = validator.doValidate({});
expect(error).to.be.an('error');

const schema2 = {
    jsonParam : {
        required:true,//when check failed return a inner error string
        type:[JSON,{code:1,msg:'The jsonParam must be a JSON object'}]//when check failed return a custom object
    }
};
const validator2 = new Validator(schema2);
const error2 = validator2.doValidate({jsonParam:'xx'});
expect(error2).to.be.an('object').and.have.property('code').and.equal(1);
```
**code 2.1.1 The basic usage**

### Use as express middleware

This is a directory tree of our web project:

```
│─app.js
│
├─bin
│      www
│
├─public
│  ├─images
│  ├─javascripts
│  └─stylesheets
│          style.css
│
├─routes
│      index.js
│
├─validators
│      data_list_schema.js
│
└─views
        error.ejs
        index.ejs
```
**directory tree**

And then it is the code of app.js , where we introduce the middleware supplied by request-param:

```javascript
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const {filter:requestValidator} = require('validator-param');
const index = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestValidator({
  basePath:path.join(__dirname,'./validators'),
  urlPrefix:'/i/',
  filenameReplaces:{'_':'/'},
  filenameSuffix:'_schema.js'
}));
```
**code 2.2.1 The code of app.js**

As showed above, the files in directory of `validators` with a suffix of `_schema.js` will be parsed. And we have the file `data_list_schema.js` in it, so the url of `/i/data/list` will be validate by the definition of the file `data_list_schema.js`. For  the parameter `urlPrefix` is `/i/`, the paramter `filenameReplaces` is `{'_':'/'}`, the filename will be remove the `filenameSuffix` and replace `filenameReplaces`'s key with its value, and  unshfited with `urlPrefix`.

```javascript
module.exports = Object.freeze({
    begin_time : {
        required:[true,{code:1,msg:'The begin_time is empty'}],
        type:[Date,{code:2,msg:'the begin_time should be a Date'}]
    }
});
```
**code 2.2.2 The code of data_list_schema.js**

As showed in **code 2.2.2**, when request `/i/data/list` without parameter `begin_time` or in wrong type(not a Date), the middleware will return a error object. 

## API

See the [api](doc/api.md) document.

## Attention

Not use querysting in POST method, it will case the req.query's data type transform fail.

## License

[MIT](LICENSE)