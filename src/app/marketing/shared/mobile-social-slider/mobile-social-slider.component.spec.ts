import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSocialSliderComponent } from './mobile-social-slider.component';

describe('MobileSocialSliderComponent', () => {
  let component: MobileSocialSliderComponent;
  let fixture: ComponentFixture<MobileSocialSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileSocialSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSocialSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
