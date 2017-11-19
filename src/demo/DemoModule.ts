import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatMenuModule, MatRadioModule, MatToolbarModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgForageModule} from '@ngforage/ngforage-ng5';
import {GhContribCalendarModule} from '../GhContribCalendar/GhContribCalendarModule';
import {DemoComponent} from './DemoComponent/DemoComponent';
import {GhContribCalendarIcon} from './Icon/GhContribCalendarIcon';
import {GitHubIcon} from './Icon/GitHubIcon';

@NgModule({
            bootstrap:       [DemoComponent],
            declarations:    [
              DemoComponent,
              GitHubIcon,
              GhContribCalendarIcon
            ],
            entryComponents: [DemoComponent],
            imports:         [
              BrowserModule,
              FormsModule,
              BrowserAnimationsModule,
              GhContribCalendarModule,
              MatCardModule,
              MatToolbarModule,
              MatMenuModule,
              MatButtonModule,
              MatRadioModule,
              NgForageModule
            ]
          })
export class DemoModule {

}
