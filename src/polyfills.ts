if (typeof (window as any).global === 'undefined') {
  (window as any).global = window;
}
if (typeof (window as any).Buffer === 'undefined') {
  (window as any).Buffer = [];
}
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: { DEBUG: undefined }, version: '' };
}

import 'core-js/es6/reflect';
import 'zone.js/dist/zone';  // Included with Angular CLI.


