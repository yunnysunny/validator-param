# validator-param

A library, which can create validators to validate request parameters easily. 

[![NPM](https://nodei.co/npm/validator-param.png?downloads=true)](https://nodei.co/npm/validator-param/)  

## Install
```npm install validator-param --save```

## How to use

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

## API

See the [api](doc/api.md) document.

## License

[MIT](LICENSE)