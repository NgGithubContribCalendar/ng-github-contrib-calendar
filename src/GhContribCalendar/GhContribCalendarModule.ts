import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {NgForageModule} from '@ngforage/ngforage-ng5';
import {GhContribCalendarComponent} from './CalendarComponent/GhContribCalendarComponent';
import {CalendarFetcher} from './CalendarFetcher/CalendarFetcher';

@NgModule({
  declarations: [
    GhContribCalendarComponent
  ],
  exports: [
    GhContribCalendarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgForageModule
  ],
  providers: [CalendarFetcher]
})
export class GhContribCalendarModule {

}
