# tm-script-loader

Javascript module for programmatically loading scripts.

## Installation
```bash
npm i @wonkytech/tm-script-loader
```

## Usage
```javascript

import {
    loadLink,
    loadScripts, loadModule,
    loadFirebaseCDN, loadTokBoxCDN, 
} from "@wonkytech/tm-script-loader";

loadLink('test.css');

loadScripts({
    load: [
        'test1.js',
        'test2.js'
    ], then: {
        load: [
            'test3.js'
        ]
    }, payload: () => {return [window.testOne, window.testTwo, window.testThree]}
}).then(([test1,test2,test3]) => {
    console.log('Test1: ', test1);
    console.log('Test2: ', test2);
    console.log('Test3: ', test3);
});

loadFirebaseCDN().then((firebase) => {
    console.log('Firebase has finished loading.', firebase);
});

loadTokBoxCDN().then((tokbox) => {
    console.log('TokBox has finished loading.', tokbox);
});

loadModule('@wonkytech/tm-script-loader', ['loadLink']).then(([loadLink]) => {
    console.log('LoadLink', loadLink);
});
```