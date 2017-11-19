import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Chevron} from './Chevron';

describe('Chevron', () => {
  let fixture: ComponentFixture<Chevron>;
  let inst: Chevron;

  beforeEach(async done => {
    await TestBed.configureTestingModule({
                                           declarations: [Chevron]
                                         })
                 .compileComponents();

    fixture = TestBed.createComponent(Chevron);
    inst    = fixture.componentInstance;

    done();
  });

  function debug() {
    return fixture.debugElement.query(By.css('svg'));
  }

  it('default', () => {
    fixture.detectChanges();
    expect(debug().classes.right).toBe(true);
    expect(debug().classes.left).toBeFalsy();
  });

  it('right', () => {
    inst.dir = 'right';
    fixture.detectChanges();
    expect(debug().classes.right).toBe(true);
    expect(debug().classes.left).toBeFalsy();
  });

  it('left', () => {
    inst.dir = 'left';
    fixture.detectChanges();
    expect(debug().classes.left).toBe(true);
    expect(debug().classes.right).toBeFalsy();
  });
});
