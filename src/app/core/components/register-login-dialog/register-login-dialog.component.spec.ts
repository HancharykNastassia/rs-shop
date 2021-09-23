import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLoginDialogComponent } from './register-login-dialog.component';

describe('RegisterLoginDialogComponent', () => {
  let component: RegisterLoginDialogComponent;
  let fixture: ComponentFixture<RegisterLoginDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterLoginDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
