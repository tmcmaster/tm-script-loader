function loadScripts(scripts) {
  return _loadScripts(scripts);
}

function _loadScripts(scripts) {
  return new Promise((resolve, reject) => {
    Promise.all(scripts.load.map(script => _loadScript(script))).then(() => {
      if (scripts.then === undefined) {
        resolve(scripts.payload ? scripts.payload() : undefined);
      } else {
        _loadScripts(scripts.then).then(() => {
          resolve(scripts.payload ? scripts.payload() : undefined);
        }).catch(e => {
          reject();
        });
      }
    }).catch(e => {
      reject();
    });
  });
}

function _getScriptByName(scriptSrc) {
  let scripts = document.head.getElementsByTagName("script");

  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].TMScriptLoader !== undefined && scripts[i].TMScriptLoader.src === scriptSrc) {
      return scripts[i];
    }
  }

  return undefined;
}

function _loadScript(script) {
  console.log('Checking script exists: ' + script);

  const scriptElement = _getScriptByName(script);

  if (scriptElement === undefined) {
    return new Promise((resolve, reject) => {
      console.log('Loading script: ' + script);
      let newScript = document.createElement("script");
      newScript.defer = true;
      newScript.status = 'loading';
      newScript.TMScriptLoader = {
        src: script,
        status: 'loading'
      };

      newScript.onload = event => {
        console.log('Script has been loaded: ' + script);
        newScript.TMScriptLoader.status = 'loaded';
        resolve();
      };

      newScript.onerror = error => {
        console.error(`There was an issue loading script: url(${script}):`, error);
        newScript.TMScriptLoader.status = 'failed';
        reject(error);
      };

      document.getElementsByTagName('head')[0].append(newScript);
      newScript.src = script.toString();
    });
  } else {
    const scriptStatus = scriptElement.TMScriptLoader ? scriptElement.TMScriptLoader.status : undefined;

    if (scriptStatus === 'loaded') {
      console.log('Script was already loaded:' + script);
      return new Promise((resolve, reject) => {
        resolve();
      });
    } else if (scriptStatus === 'loading') {
      console.log('Script had already started loading:' + script);
      return new Promise((resolve, reject) => {
        scriptElement.addEventListener('load', () => {
          resolve();
        }, e => {
          reject(e);
        });
      });
    } else {
      console.warn('Script is already there, but unknown status:' + script);
      return new Promise((resolve, reject) => {
        let counter = 10;
        const interval = setTimeout(() => {
          const scriptStatus = scriptElement.TMScriptLoader ? scriptElement.TMScriptLoader.status : undefined;

          if (scriptStatus === 'loaded') {
            clearInterval(interval);
            resolve();
          }

          if (--counter < 1) {
            clearInterval(interval);
            reject(new Error("Script took to long to load."));
          }
        }, 500);
      });
    }
  }
} // TODO: need to add logic to test if the link has already been added.


function loadLink(link) {
  const newLink = document.createElement("link");
  newLink.setAttribute("rel", "stylesheet");
  newLink.setAttribute("href", link);

  newLink.onload = event => {
    console.log('Script has been loaded successfully: ' + link);
  };

  newLink.onerror = error => {
    console.error(`There was an issue loading link(${link}):`, error);
  };

  document.getElementsByTagName('head')[0].append(newLink);
}

function loadFirebaseEmbedded() {
  return _loadScripts({
    load: ['/__/firebase/7.2.0/firebase-app.js', '/__/firebase/7.2.0/firebase-auth.js'],
    then: {
      load: ['/__/firebase/7.2.0/firebase-database.js', '/__/firebase/7.2.0/firebase-messaging.js', '/__/firebase/7.2.0/firebase-storage.js'],
      then: {
        load: ['/__/firebase/init.js']
      }
    },
    payload: () => window.firebase
  });
}

function loadFirebaseCDN() {
  return _loadScripts({
    load: ['https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js', 'https://www.gstatic.com/firebasejs/7.4.0/firebase-analytics.js', 'https://www.gstatic.com/firebasejs/7.4.0/firebase-auth.js'],
    then: {
      load: ['https://www.gstatic.com/firebasejs/7.4.0/firebase-database.js', 'https://www.gstatic.com/firebasejs/7.4.0/firebase-messaging.js', 'https://www.gstatic.com/firebasejs/7.4.0/firebase-storage.js']
    },
    payload: () => window.firebase
  });
}

function loadTokBoxCDN() {
  return _loadScripts({
    load: ['https://static.opentok.com/v2/js/opentok.js'],
    payload: () => window.OT
  });
} // function loadModule(moduleName, functionNames) {

export { loadFirebaseCDN, loadFirebaseEmbedded, loadLink, loadScripts, loadTokBoxCDN };
