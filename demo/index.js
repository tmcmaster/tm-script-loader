import {loadLink, loadScripts, loadFirebaseCDN, loadTokBoxCDN, loadModule} from "../src/index.js";

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

loadModule('../src/index.js', ['loadLink']).then(([loadLink]) => {
    console.log('LoadLink', loadLink);
});
