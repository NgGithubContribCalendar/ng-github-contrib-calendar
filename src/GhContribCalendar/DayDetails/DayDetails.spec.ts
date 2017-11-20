import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Translator} from '../Translate/Translator';
import {DayDetails} from './DayDetails';

describe('DayDetails', () => {
  let fixture: ComponentFixture<DayDetails>;
  let inst: DayDetails;
  let debug: DebugElement;

  let date: Date;
  let count: number;

  beforeEach(async done => {
    await TestBed.configureTestingModule({
                                           declarations: [DayDetails]
                                         })
                 .compileComponents();

    fixture = TestBed.createComponent(DayDetails);
    inst    = fixture.componentInstance;
    debug   = fixture.debugElement;

    date  = new Date();
    count = Math.random();

    inst.tr    = new Translator();
    inst.date  = date;
    inst.count = count;

    done();
  });

  it('count', () => {
    fixture.detectChanges();

    const counter = debug.query(By.css('.count'));

    expect(counter.nativeElement.innerText).toBe(count.toLocaleString());
  });

  describe('date', () => {
    let el: HTMLTimeElement;

    beforeEach(() => {
      fixture.detectChanges();
      el = debug.query(By.css('time')).nativeElement;
    });

    it('text', () => {
      expect(el.innerText).toBe(date.toLocaleDateString());
    });

    it('attr', () => {
      expect(el.dateTime).toBe(date.toISOString());
    });
  });

  describe('hideZero', () => {
    beforeEach(() => {
      inst.count = 0;
    });

    it('true', () => {
      inst.tr.registerTranslations({hideZero: true});
      fixture.detectChanges();

      expect(debug.query(By.css('.count'))).toBeFalsy();
    });
    it('false', () => {
      inst.tr.registerTranslations({hideZero: false});
      fixture.detectChanges();

      expect(debug.query(By.css('.count'))).toBeTruthy();
    });
  });
});
