import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {NgForageModule} from '@ngforage/ngforage-ng5';
import {CalendarFetcher} from './CalendarFetcher/CalendarFetcher';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgForageModule
  ],
  providers: [CalendarFetcher]
})
export class GhContribCalendarModule {

}
