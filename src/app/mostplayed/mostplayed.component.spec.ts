import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostplayedComponent } from './mostplayed.component';

describe('MostplayedComponent', () => {
  let component: MostplayedComponent;
  let fixture: ComponentFixture<MostplayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostplayedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostplayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
