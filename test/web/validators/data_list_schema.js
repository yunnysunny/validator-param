module.exports = Object.freeze({
    begin_time : {
        required:[true,{code:1,msg:'The begin_time is empty'}],
        type:[Date,{code:2,msg:'the begin_time should be a Date'}],
        custom:function(value,req) {
            const session = req.session;
            if (!session) {
                return {code:3,msg:'session invalid'}
            }
            const user = session.user;
            if (!user) {
                return {code:4,msg:'invalid user'};
            }
            if (user.role !== 1) {
                return {code:5,msg:'you have no right to do this query'};
            }
        }
    }
});