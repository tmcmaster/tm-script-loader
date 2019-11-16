import {loadLink, loadScripts, loadFirebaseCDN, loadTokBoxCDN} from '../src/index.js';
import {runTest} from "../docs/main.js";
import '../docs/web_modules/@wonkytech/tm-console-view.js';
import {html, render} from "../docs/web_modules/lit-html.js";

runTest(html, render, loadLink, loadScripts, loadFirebaseCDN, loadTokBoxCDN);