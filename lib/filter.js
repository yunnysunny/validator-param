/**
 * @module filter
 */

/**
 * @callback ErrorResponseCallback
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @param {String|Object|undefined} err 
 */

const batchRequire = require('batch-require');
const Validator = require('./Validator');
/**
 * @param {Object} option
 * @param {String} option.basePath The directory of validator schema files to use.
 * @param {String} option.urlPrefix The prefix string of the url path to validate.
 * @param {Object=} option.filenameReplaces A map of data to indicate which characters to be replaced.
 * @param {String=} option.filenameSuffix Only the files end with `option.filenameSuffix` will be processed. The default value is `.js` . 
 * @param {ErrorResponseCallback=} option.errorResponseCallback
 */
module.exports = function(option){
    const validators = batchRequire({
        className:Validator,
        basePath:option.basePath,
        keyPrefix:option.urlPrefix,
        keyReplaces:option.filenameReplaces,
        filenameSuffix:option.filenameSuffix
    });
    const errorResponseCallback = option.errorResponseCallback || function(req, res, next,err) {
        if (!err) {
            return next();
        }
        if (typeof (err) === 'string') {
            return res.send({code:1,msg:err});
        }
        res.send(err);
    };

    return function(req, res, next) {
        const path = req.path;
        const validator = validators[path];
        if (!validator) {
            return next();
        }
        validator.setReq(req);
        // const params = req.method === 'POST' ?
        // req.body :
        // req.query;
        const error = validator.doValidate(Object.assign({},req.query,req.body));
        errorResponseCallback(req, res, next, error);;
    }
};