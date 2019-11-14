function loadScripts(scripts) {
    // test if already loaded.
    if (scripts.payload) {
        const payload = scripts.payload();
        if (payload) {
            return new Promise((resolve, reject) => {
                resolve(payload);
            });
        }
    } else {
        return _loadScripts(scripts);
    }
}

function _loadScripts(scripts) {
    // noinspection DuplicatedCode
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
        console.log('Script has been loaded: ' + link);
    };
    newLink.onerror = (error) => {
        console.error(`There was an issue loading link(${link}):`, error);
    };
    document.getElementsByTagName('head')[0].append(newLink);
}

export {loadScripts, loadLink};
