const {expect} = require('chai');
const request = require('supertest');
const app = require('../web/app');

function roleTest(role,code,done) {
    var cookie = '';
        request(app)
        .post('/i/login')
        .send({role:role})
        .expect(200,{code:0})
        .end(function(err,res) {
          if (err) {
              return done(err);
          }
          var header = res.header;
          var setCookieArray = header['set-cookie'];

          for (var i=0,len=setCookieArray.length;i<len;i++) {
              var value = setCookieArray[i];
              var result = value.match(/^validator_session=([a-zA-Z0-9%\.\-_]+);\s/);
              if (result && result.length > 1) {
                  cookie = result[1];
                  break;
              }
          }
          if (!cookie) {
              return done(new Error('find cookie error'));
          }
          request(app)
            .get('/i/data/list')
            .set('Cookie','validator_session=' + cookie)
            .query({begin_time:'2017-09-10 10:00:00'})
            .expect(200)
            .end(function(err,res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.have.property('code').and.equal(code);
                done();
            });
      });
}

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
    it('should return error when not login',function(done) {
        request(app)
            .get('/i/data/list')
            .query({begin_time:'2017-09-10 10:00:00'})
            .expect(200)
            .end(function(err,res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.have.property('code').and.equal(4);
                done();
            });
    });
    it('should return error when the login user\' role is not 1',function(done) {
        roleTest(2,5,done);
    });
    it('should return ok when the parameter is all right',function(done) {
        roleTest(1,0,done);
    });
});