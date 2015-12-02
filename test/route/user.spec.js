const expect = require('chai').expect,
    request = require('supertest'),
    TestUtilDatabase = require('../testutil-database'),
    server = require('../../app'),
    User = require('../../model').User;

describe('/', function () {
    before(TestUtilDatabase.connect);
    after(TestUtilDatabase.disconnect);
    beforeEach(TestUtilDatabase.tearDownDb);
    afterEach(TestUtilDatabase.tearDownDb);

    describe('# POST /user', function () {
        it('# should create a user', function (done) {
            request(server)
                .post('/user')
                .send({name: 'testuser', email: 'test@test.com'})
                .expect(201)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res.body.message).to.equal('user created');
                    User.findOne({email: 'test@test.com'}, function (err, user) {
                        expect(err).to.be.null;
                        expect(user).not.to.be.null;
                        done();
                    });
                });
        });
    });
    describe('# GET /user', function () {
        it('# get users', function (done) {
            request(server)
                .get('/user?filter=email')
                .end(function (err, res) {
                    // you get the point ;)...
                    done();
                });
        });
    });
});
