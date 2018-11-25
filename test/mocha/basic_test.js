const {expect} = require('chai');
const {Validator} = require('../../index');

describe('validator-param test#',function() {
    it('invalid parameter should be checked with error',function() {
        const schema = {
            intParam : {
                type : Number,
                required : true
            }
        };
        const validator = new Validator(schema);
        const error = validator.doValidate({});
        expect(error).to.not.be.a('null');
    });

    it('invalid parameter should return error when given custom object',function() {
        const schema = {
            requiredParam : {
                required: [true, new Error('The requiredParam can not be empty')]
            }
        };
        const validator = new Validator(schema);
        const error = validator.doValidate({});
        expect(error).to.be.an('error');

        const schema2 = {
            jsonParam : {
                required:true,
                type:[JSON,{code:1,msg:'The jsonParam must be a JSON object'}]
            }
        };
        const validator2 = new Validator(schema2);
        const error2 = validator2.doValidate({jsonParam:'xx'});
        expect(error2).to.be.an('object').and.have.property('code').and.equal(1);
    });

    it('the result of validation should return error for the second parameter is empty',function() {
        const schema = {
            first:{
                type:[Number]
            },
            second:{
                required:[true,{code:1}]
            }
        };
        const validator = new Validator(schema);
        const error = validator.doValidate({});
        expect(error).to.be.an('object').and.have.property('code').and.equal(1);
    });

    it('the custom validate function',function() {
        const ERROR_MSG = 'you must give a positive number';
        const schema = {
            num: {
                type:Number,
                custom: function(value) {
                    if (value < 0) {
                        return ERROR_MSG;
                    }
                }
            }
        };
        const validator = new Validator(schema);
        const error = validator.doValidate({num:-1});
        expect(error).to.be.a('string').and.to.equal(ERROR_MSG);
    })
});