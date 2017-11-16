import {NgModule} from "@angular/core";
import {CalendarFetcher} from "./CalendarFetcher/CalendarFetcher";
import {CommonModule} from "@angular/common";
import {NgForageModule} from "@ngforage/ngforage-ng5";

@NgModule({
  imports: [
    CommonModule,
    NgForageModule
  ],
  providers: [CalendarFetcher]
})
export class GhContribCalendarModule {

}
