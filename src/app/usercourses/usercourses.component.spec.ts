import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercoursesComponent } from './usercourses.component';

describe('UsercoursesComponent', () => {
  let component: UsercoursesComponent;
  let fixture: ComponentFixture<UsercoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsercoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
