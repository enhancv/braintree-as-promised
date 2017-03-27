function promiseCallback(object, method) {
    return function promisify() {
        return new Promise((resolve, reject) => {
            function callback(error, result) {
                if (error) {
                    return reject(new Error(error));
                }

                if (result && result.success === false) {
                    return reject(new Error(result.message));
                }

                return resolve(result);
            }

            object[method].apply(object, Array.prototype.slice.call(arguments).concat([callback]));
        });
    };
}

module.exports = function promised(gateway) {
    const modules = {
        address: {
            create: null,
            update: null,
            find: null,
            delete: null,
        },
        addOn: {
            all: null,
        },
        clientToken: {
            generate: null,
        },
        creditCardVerification: {
            search: null,
        },
        customer: {
            create: null,
            delete: null,
            find: null,
            search: null,
            update: null,
        },
        discount: {
            all: null,
        },
        merchantAccount: {
            create: null,
            find: null,
            update: null,
        },
        paymentMethod: {
            create: null,
            delete: null,
            find: null,
            update: null,
        },
        paymentMethodNonce: {
            create: null,
            find: null,
        },
        plan: {
            all: null,
        },
        settlementBatchSummary: {
            generate: null,
        },
        subscription: {
            cancel: null,
            create: null,
            find: null,
            retryCharge: null,
            search: null,
            update: null,
        },
        transaction: {
            cancelRelease: null,
            cloneTransaction: null,
            find: null,
            holdInEscrow: null,
            refund: null,
            releaseFromEscrow: null,
            sale: null,
            search: null,
            submitForSettlement: null,
            void: null,
        },
        webhookNotification: {
            parse: null,
        },
        testing: {
            settle: null,
            settlementPending: null,
            settlementConfirm: null,
            settlementDecline: null,
            settlementOperationWithEnvironmentCheck: null,
        },
    };

    for (const name in modules) {
        for (const method in modules[name]) {
            modules[name][method] = promiseCallback(gateway[name], method);
        }
    }

    return modules;
};
