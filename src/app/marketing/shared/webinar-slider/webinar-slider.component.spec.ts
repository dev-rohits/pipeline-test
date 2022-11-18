import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarSliderComponent } from './webinar-slider.component';

describe('WebinarSliderComponent', () => {
  let component: WebinarSliderComponent;
  let fixture: ComponentFixture<WebinarSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebinarSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
