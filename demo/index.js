import {loadLink, loadScripts, loadFirebaseCDN, loadTokBoxCDN} from '../src/index.js';
import {runTest} from "../docs/main.js";

runTest(loadLink, loadScripts, loadFirebaseCDN, loadTokBoxCDN);