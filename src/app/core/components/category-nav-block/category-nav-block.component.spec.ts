import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNavBlockComponent } from './category-nav-block.component';

describe('CategoryNavBlockComponent', () => {
  let component: CategoryNavBlockComponent;
  let fixture: ComponentFixture<CategoryNavBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryNavBlockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNavBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
