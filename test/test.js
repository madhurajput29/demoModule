const test = require('../index');
const should = require('should');
serverArray1 = [
    {
        "url": "http://google.com",
        "priority": 4
    },
    {
        "url": "http://offline.kratikal.com",
        "priority": 2
    }
]
serverArray2 = [
    {
        "url": "http://doesNotExist.kratikal.com",
        "priority": 1
    }
]
serverArray3 = [
    {
        "url": "http://google.com",
        "priority": 4
    },
    {
        "url": "http://google.com",
        "priority": 2
    }
]

describe('Node Module Testing', () => {
    describe('Basic test', () => {
        it('should return object', async function () {
            const type = typeof test;
            should.exist(type);
            should.equal(type,'object');
        });
    });
    describe('Success Case', () => {
        it('promise should be fulfilled', async function () {
            await test.findServer(serverArray1).then((response) => {
                should.exist(response);
                should.equal(response, '{"url":"http://google.com","priority":4}')
            });
        });
        it('promise should be fulfilled with lowest priority server', async function () {
            await test.findServer(serverArray3).then((response) => {
                should.exist(response);
                should.equal(response, '{"url":"http://google.com","priority":2}')
            });
        });
    });
    describe('Failure Case', () => {
        it('promise should be rejected with server Array', async function () {
            await test.findServer(serverArray2).catch((error) => {
                should.exist(error);
                should.equal(error, 'No server is available.')
            });
        });
        it('promise should be rejected without server Array', async function () {
            await test.findServer().catch((error) => {
                should.exist(error);
                should.equal(error, 'Please provide Server Array')
            });
        });
        it('promise should be rejected with empty server Array', async function () {
            await test.findServer([]).catch((error) => {
                should.exist(error);
                should.equal(error, 'Please provide Server Array')
            });
        });
    });
})
