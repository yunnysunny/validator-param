const {expect} = require('chai');
const request = require('supertest');
const app = require('../web/app');
describe('test for middleware function of request-param',function() {
    it('should return error when required parameter is empty',function(done) {
        request(app)
            .get('/i/data/list')
            .query()
            .expect(200)
            .end(function(err,res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.have.property('code').and.equal(1);
                done();
            });
    });

    it('should return error when the parameter is not a Date type',function(done) {
        request(app)
            .get('/i/data/list')
            .query({begin_time:'xxx'})
            .expect(200)
            .end(function(err,res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.have.property('code').and.equal(2);
                done();
            });
    });

    it('should return ok when the parameter is all right',function(done) {
        request(app)
            .get('/i/data/list')
            .query({begin_time:'2017-09-10 10:00:00'})
            .expect(200)
            .end(function(err,res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.have.property('code').and.equal(0);
                done();
            });
    });
});