/**
 * @function CustomValidateFunction
 * 
 * @param {*} value the value you want to validated
 * @param {http.IncomingMessage=} req the req object of express
 * @returns {*} the validate result, when none error, you can return `false` `undefined` `null` or anything can transform to false, 
 * when the value is not suitable, you can return a string or an object.
 */

/**
 * @typedef ValidateElement
 * 
 * If the value of `required` or `type` is an Array, 
 * the second value of the array is the error message that describe the error reason, 
 * it can be a string or an object,
 * and the first value is normal value as used without array.
 * 
 * @property {Boolean|Array} required indicate whether the current field necessary
 * @property {Number|JSON|Date|Array} type declare the current field's type.
 * @property {FuncCustomValidateFunctiontion} custom the custom validate function
 */

/**
 * @typedef Schema
 * @example 
 * ```javascript
 * {
 *   numberFiled : {
 *     required:true,
 *     type : Number
 *   }
 * }
 * ```
 * @example
 * ```javascript
 * {
 *  dateField:{
 *      required:[true,'the dateField can not be empty']
 *      type:[Date,'the dataField must be a Date']
 *  }
 * }
 * ```
 * @property {ValidateElement} filedName
 */

/**
 * The class of Validator
 * 
 * @class Validator
 */
class Validator {
    /**
     * Creates an instance of Validator.
     * @param {Schema} schema 
     * @memberof Validator
     */
    constructor(schema) {
        this.schema = schema;
        this._req = null;
        this.schemaKeys = Object.keys(this.schema);
        this.expectedErrorMsg = {};
        for (const key of this.schemaKeys) {
            const validateElement = this.schema[key];
            this.expectedErrorMsg[key] = {};
            for (const checkItem in validateElement) {
                const checkContent = validateElement[checkItem];
                if (Array.isArray(checkContent)) {
                    this.expectedErrorMsg[key][checkItem] = checkContent[1];//the custom error message
                }
            }
        }
    }
    setReq(req) {
        this._req = req;
    }
    _isEmptyValue(value) {
        return typeof(value) === 'undefined' || value === '' || value === null;
    }
    /**
     * To do a validation.
     * 
     * @param {Object} params 
     * @returns {null|Object|String}
     * @memberof Validator
     */
    doValidate(params) {
        for (const key of this.schemaKeys) {
            const validateElement = this.schema[key];
            let value = params[key];

            if (this._isEmptyValue(value)) {
                const required = validateElement.required;
                if ((Array.isArray(required) && required[0]) || required)  {
                    return this.expectedErrorMsg[key].required || `${key} can't be empty`;
                } else {
                    continue;
                }
            }

            let needType = validateElement.type;
            if (Array.isArray(needType)) {
                needType = needType[0];
            }
            if (needType && needType !== String) {
                switch(needType) {
                    case Number:
                    value = Number(value);
                    if (isNaN(value)) {
                        return this.expectedErrorMsg[key].type || `${key} must be a Number`;
                    }
                    params[key] = value;
                    break;

                    case Date:
                    value = new Date(value);
                    if (isNaN(value.getTime())) {
                        return this.expectedErrorMsg[key].type || `${key} must be a Date`
                    }
                    params[key] = value;
                    break;

                    case JSON:
                    try {
                        value = JSON.parse(value);
                    } catch (e) {
                        return this.expectedErrorMsg[key].type || `${key} must be a JSON string`
                    }
                    params[key] = value;
                }
            }

            const customValidator = validateElement.custom;
            if (customValidator) {
                const result = customValidator(value,this._req);
                if (!result) {
                    continue;
                }
                return result;
            }
        }//end of for
        return null;
    }
}

module.exports = Validator;
