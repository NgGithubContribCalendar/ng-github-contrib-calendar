//tslint:disable
import 'core-js';
import 'rxjs/Rx';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/proxy';
import 'zone.js/dist/jasmine-patch';
import {TestBed, TestModuleMetadata} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {CalendarFetcher} from "./src/GhContribCalendar/CalendarFetcher/CalendarFetcher";
import {NgForageModule} from "@ngforage/ngforage-ng5";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

import './src/index';

export const def: TestModuleMetadata = {
  imports: [
    CommonModule,
    HttpClientModule,
    NgForageModule
  ],
  providers: [CalendarFetcher]
};

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

const testsContext: any = require.context('./src', true, /\.spec/);
testsContext.keys().forEach(testsContext);
