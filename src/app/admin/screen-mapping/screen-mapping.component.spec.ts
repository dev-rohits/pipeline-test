import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenMappingComponent } from './screen-mapping.component';

describe('ScreenMappingComponent', () => {
  let component: ScreenMappingComponent;
  let fixture: ComponentFixture<ScreenMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
