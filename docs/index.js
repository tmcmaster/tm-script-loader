import {runTest} from "./main.js";
import {loadLink, loadScripts, loadFirebaseCDN, loadTokBoxCDN,loadFirebaseEmbedded, waitForFirebase} from "./web_modules/@wonkytech/tm-script-loader.js";
import {html, render} from "./web_modules/lit-html.js";
import './web_modules/@wonkytech/tm-console-view.js';

runTest(html, render, loadLink, loadScripts, loadFirebaseCDN, loadTokBoxCDN,loadFirebaseEmbedded, waitForFirebase);