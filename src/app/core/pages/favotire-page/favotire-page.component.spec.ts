import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavotirePageComponent } from './favotire-page.component';

describe('FavotirePageComponent', () => {
  let component: FavotirePageComponent;
  let fixture: ComponentFixture<FavotirePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavotirePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavotirePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
