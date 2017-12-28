import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {NgForageModule} from '@ngforage/ngforage-ng5';
import {GhContribCalendarComponent} from './CalendarComponent/GhContribCalendarComponent';
import {defaultFormatterFunction} from './CalendarFetcher/defaultFormatterFunction';
import {Chevron} from './Chevron/Chevron';
import {DayDetails} from './DayDetails/DayDetails';
import {LoadingBar} from './LoadingBar/LoadingBar';

/** The main module */
@NgModule({
  declarations: [
    GhContribCalendarComponent,
    Chevron,
    DayDetails,
    LoadingBar
  ],
  exports: [
    GhContribCalendarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgForageModule
  ],
  providers: [
    {
      provide: defaultFormatterFunction,
      useValue: defaultFormatterFunction
    }
  ]
})
export class GhContribCalendarModule {

}
