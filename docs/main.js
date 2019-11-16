export function runTest(loadLink, loadScripts, loadFirebaseCDN, loadTokBoxCDN) {

    // test loading CSS
    loadLink('resources/test.css');

    // test loading some scripts
    loadScripts({
        load: [
            'resources/test1.js',
            'resources/test2.js'
        ], then: {
            load: [
                'resources/test3.js'
            ]
        }, payload: () => {return [window.testOne, window.testTwo, window.testThree]}
    }).then(([test1,test2,test3]) => {
        console.log('Test1: ', test1);
        console.log('Test2: ', test2);
        console.log('Test3: ', test3);
    });

    // Testing a second bit of code trying to load the same scripts
    setTimeout(() => {
        console.log('====================================');
        loadScripts({
            load: [
                'resources/test1.js',
                'resources/test2.js'
            ], then: {
                load: [
                    'resources/test3.js'
                ]
            }, payload: () => {return [window.testOne, window.testTwo, window.testThree]}
        }).then(([test1,test2,test3]) => {
            console.log('Test1: ', test1);
            console.log('Test2: ', test2);
            console.log('Test3: ', test3);
        });
    }, 0);


    // test loading firebase
    loadFirebaseCDN().then((firebase) => {
        console.log('Firebase has finished loading.', firebase);
    });

    // test loading ToxBox
    loadTokBoxCDN().then((tokbox) => {
        console.log('TokBox has finished loading.', tokbox);
    });
}