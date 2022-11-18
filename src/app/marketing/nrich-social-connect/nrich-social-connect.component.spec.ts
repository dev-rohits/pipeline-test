import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrichSocialConnectComponent } from './nrich-social-connect.component';

describe('NrichSocialConnectComponent', () => {
  let component: NrichSocialConnectComponent;
  let fixture: ComponentFixture<NrichSocialConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrichSocialConnectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NrichSocialConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
