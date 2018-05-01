import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
declare var require: any;

const iosDragDropShim = require('../node_modules/drag-drop-webkit-mobile');
const options = {enableEnterLeave: true, holdToDrag: 300}; // ios dragndrop
iosDragDropShim(options);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
