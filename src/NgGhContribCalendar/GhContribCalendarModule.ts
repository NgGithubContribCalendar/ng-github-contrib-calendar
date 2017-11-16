import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgForageModule} from '@ngforage/ngforage-ng5';
import {GhContribCalendarComponent} from './GhContribCalendarComponent/GhContribCalendarComponent';
import {GhContribCalendarFetcher} from './GhContribCalendarFetcher/GhContribCalendarFetcher';

@NgModule({
  declarations: [
    GhContribCalendarComponent
  ],
  exports: [
    GhContribCalendarComponent
  ],
  imports: [
    NgForageModule,
    CommonModule
  ],
  providers: [
    GhContribCalendarFetcher
  ]
})
export class GhContribCalendarModule {

}
