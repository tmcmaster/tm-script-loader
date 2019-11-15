function loadScripts(scripts) {
    if (_haveScriptsLoaded(scripts.payload())) {
        return new Promise((resolve, reject) => {
            resolve(scripts.payload());
        });
    } else {
        return _loadScripts(scripts);
    }
}

function _haveScriptsLoaded(payload) {
    if (payload === undefined || payload === null) {
        return false;
    } else if (Array.isArray(payload)) {
        let numberUnfinished = payload.filter(item => item === undefined || item === null)
            .reduce((a) => a + 1, 0);
        return (numberUnfinished === 0);
    }
}

function _loadScripts(scripts) {
    return new Promise((resolve,reject) => {
        Promise.all(scripts.load.map((script) => new Promise((resolve,reject) => {
            console.log('Loading script: ' + script);
            let newScript = document.createElement("script");
            newScript.setAttribute("defer", "defer");
            newScript.onload = (event) => {
                console.log('Script has been loaded: ' + script);
                resolve();
            };
            newScript.onerror = (error) => {
                console.error(`There was an issue loading script: url(${script}):`, error);
                reject(error)
            };
            document.getElementsByTagName('head')[0].append(newScript);
            newScript.src = script.toString();
        }))).then(() => {
            if (scripts.then === undefined) {
                resolve((scripts.payload ? scripts.payload() : undefined));
            } else {
                _loadScripts(scripts.then).then(() => {
                    resolve((scripts.payload ? scripts.payload() : undefined));
                }).catch((e) => {
                    reject();
                });
            }
        }).catch((e) => {
            reject();
        });
    });
}

// TODO: need to add logic to test if the link has already been added.
function loadLink(link) {
    const newLink = document.createElement("link");
    newLink.setAttribute("rel", "stylesheet");
    newLink.setAttribute("href", link);
    newLink.onload = (event) => {
        console.log('Script has been loaded successfully: ' + link);
    };
    newLink.onerror = (error) => {
        console.error(`There was an issue loading link(${link}):`, error);
    };
    document.getElementsByTagName('head')[0].append(newLink);
}

function loadFirebaseEmbedded() {
    return _loadScripts({
        load: [
            '/__/firebase/7.2.0/firebase-app.js',
            '/__/firebase/7.2.3/firebase-analytics.js',
            '/__/firebase/7.2.0/firebase-auth.js'
        ], then: {
            load: [
                '/__/firebase/7.2.0/firebase-database.js',
                '/__/firebase/7.2.0/firebase-messaging.js',
                '/__/firebase/7.2.0/firebase-storage.js'
            ], then: {
                load: [
                    '/__/firebase/init.js'
                ]
            }
        }, payload: () => window.firebase
    });
}

function loadFirebaseCDN() {
    return _loadScripts({
        load: [
            'https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js',
            'https://www.gstatic.com/firebasejs/7.4.0/firebase-analytics.js',
            'https://www.gstatic.com/firebasejs/7.4.0/firebase-auth.js'
        ], then: {
            load: [
                'https://www.gstatic.com/firebasejs/7.4.0/firebase-database.js',
                'https://www.gstatic.com/firebasejs/7.4.0/firebase-messaging.js',
                'https://www.gstatic.com/firebasejs/7.4.0/firebase-storage.js'
            ]
        }, payload: () => window.firebase
    });
}

function loadTokBoxCDN() {
    return _loadScripts({
        load: ['https://static.opentok.com/v2/js/opentok.js'],
        payload: () => window.OT
    });
}

function loadModule(moduleName, functionNames) {
    return new Promise((resolve, reject) => {
        import(moduleName).then(module => {
            const loadModules = functionNames.map(name => module[name]);
            console.log('Module has loaded.', loadModules);
            resolve(loadModules);
        })
    });

}

export {loadScripts, loadLink, loadFirebaseEmbedded, loadFirebaseCDN, loadTokBoxCDN, loadModule};
