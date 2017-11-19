import {NgModule} from '@angular/core';
import {MatCardModule, MatToolbarModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoComponent} from './DemoComponent/DemoComponent';

@NgModule({
            bootstrap:       [DemoComponent],
            declarations:    [
              DemoComponent
            ],
            entryComponents: [DemoComponent],
            imports:         [
              BrowserModule,
              BrowserAnimationsModule,
              MatCardModule,
              MatToolbarModule
            ]
          })
export class DemoModule {

}
