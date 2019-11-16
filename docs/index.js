import {runTest} from "./main.js";
import {loadLink, loadScripts, loadFirebaseCDN, loadTokBoxCDN} from "./web_modules/@wonkytech/tm-script-loader.js";

runTest(loadLink, loadScripts, loadFirebaseCDN, loadTokBoxCDN);