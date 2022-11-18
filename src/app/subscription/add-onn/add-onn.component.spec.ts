import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnnComponent } from './add-onn.component';

describe('AddOnnComponent', () => {
  let component: AddOnnComponent;
  let fixture: ComponentFixture<AddOnnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOnnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOnnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
