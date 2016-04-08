# braintree-as-promised
[![Build Status](https://secure.travis-ci.org/enhancv/braintree-as-promised.png?branch=master)](http://travis-ci.org/enhancv/braintree-as-promised)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/061c718ec2594bcc8edee6d40de0b503)](https://www.codacy.com/app/ivank/braintree-as-promised)

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

## Documantation

calling `promised(gateway)` will return a new gateway object with all the methods converted to promise-based, using native promises. You can continue to use your gateway object normall, as it does not change anything there

Additionally it handles the "result.success" parameter, so that if success === false, the promise is rejected with the returned error message.

## License
Copyright (c) 2016 Enhancv
Licensed under the MIT license.
