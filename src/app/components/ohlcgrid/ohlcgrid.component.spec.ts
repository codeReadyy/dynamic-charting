import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OhlcgridComponent } from './ohlcgrid.component';

describe('OhlcgridComponent', () => {
  let component: OhlcgridComponent;
  let fixture: ComponentFixture<OhlcgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OhlcgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhlcgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
