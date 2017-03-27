const assert = require('assert');
const braintree = require('braintree');
const promised = require('../src/promised');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

describe('Braintree as promised', () => {
    it('Should perform correctly against a live braintree sandbox', () => {
        const promisedGateway = promised(gateway);

        return promisedGateway.clientToken.generate({})
            .then((result) => {
                assert.ok(result.success);
                assert.ok(result.clientToken);
            });
    });

    it('Should handle error response', () => {
        const promisedGateway = promised({
            clientToken: {
                generate: (object, cb) => cb('Some error'),
            },
        });

        return promisedGateway.clientToken.generate({})
            .then(null, (error) => {
                assert.equal(error.message, 'Some error');
            });
    });

    it('Should handle success: false as rejection', () => {
        const promisedGateway = promised({
            clientToken: {
                generate: (object, cb) => cb(null, { success: false, message: 'Some message' }),
            },
        });

        return promisedGateway.clientToken.generate({})
            .then(null, (error) => {
                assert.equal(error.message, 'Some message');
            });
    });

    it('Should return true if no response is returned', () => {
        const promisedGateway = promised({
            address: {
                delete: (object, cb) => cb(null),
            },
        });

        return promisedGateway.address.delete({})
            .then((result) => {
                assert.ok(!result);
            });
    });

    it('Should handle exceptions as rejection', () => {
        const promisedGateway = promised({
            clientToken: {
                generate: () => {
                    throw new Error('Some exception');
                },
            },
        });

        return promisedGateway.clientToken.generate({})
            .then(null, (error) => {
                assert.equal(error.message, 'Some exception');
            });
    });
});
