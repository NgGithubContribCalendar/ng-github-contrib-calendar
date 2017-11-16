import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgForageModule} from '@ngforage/ngforage-ng5';
import {CalendarFetcher} from './CalendarFetcher/CalendarFetcher';

@NgModule({
  imports: [
    CommonModule,
    NgForageModule
  ],
  providers: [CalendarFetcher]
})
export class GhContribCalendarModule {

}
