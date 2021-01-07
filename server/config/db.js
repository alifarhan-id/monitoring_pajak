const promise = require('bluebird')
const options = {
    promiseLib: promise,
    error(error, e) {
        if (e.cn) {
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message || error)
        }
    }
}
const pgp = require('pg-promise')(options)
const connectionString = 'postgres://postgres:K0p3d123@172.16.254.15:5432/bphtb';
const db = pgp(connectionString)

db.connect()
    .then(obj => {
        obj.done();
    })
    .catch(error => {
        console.log('ERROR: ', error.message || error)
    })

module.exports = db;