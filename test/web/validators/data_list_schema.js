module.exports = Object.freeze({
    begin_time : {
        required:[true,{code:1,msg:'The begin_time is empty'}],
        type:[Date,{code:2,msg:'the begin_time should be a Date'}]
    }
});