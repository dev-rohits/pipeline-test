import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrichAppWebsiteComponent } from './nrich-app-website.component';

describe('NrichAppWebsiteComponent', () => {
  let component: NrichAppWebsiteComponent;
  let fixture: ComponentFixture<NrichAppWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrichAppWebsiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NrichAppWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
