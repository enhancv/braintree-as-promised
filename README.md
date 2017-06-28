# braintree-as-promised
[![Build Status](https://travis-ci.org/enhancv/braintree-as-promised.svg?branch=master)](https://travis-ci.org/enhancv/braintree-as-promised)
[![Code Climate](https://codeclimate.com/github/enhancv/braintree-as-promised/badges/gpa.svg)](https://codeclimate.com/github/enhancv/braintree-as-promised)
[![Test Coverage](https://codeclimate.com/github/enhancv/braintree-as-promised/badges/coverage.svg)](https://codeclimate.com/github/enhancv/braintree-as-promised/coverage)

> **DEPRECATED** Braintree already supports this natively https://github.com/braintree/braintree_node/issues/50

Add native promises to braintree gateway

## Getting Started
Install the module with: `npm install braintree-as-promised`

```javascript
var braintree = require('braintree');
var promised = require('braintree-as-promised');
var gateway = promised(braintree.connect({ ... }));

gateway.clientToken
    .generate({})
    .then((result) => {
        console.log(result.clientToken);
    });

gateway.transaction
    .sale({
        ...
    })
    .then((result) => {
        console.log(result.transaction);
    });
```

## Documentation

calling `promised(gateway)` will return a new gateway object with all the methods converted to promise-based ones, using native promises. You can continue to use your gateway object normal, as it does not change anything on the original object.

Additionally it handles the "result.success" parameter, so that if success === false, the promise is rejected with the returned error message.

## License
Copyright (c) 2016 Enhancv
Licensed under the MIT license.
