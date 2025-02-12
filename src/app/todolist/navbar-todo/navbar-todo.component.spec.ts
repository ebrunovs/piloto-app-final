import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTodoComponent } from './navbar-todo.component';

describe('NavbarTodoComponent', () => {
  let component: NavbarTodoComponent;
  let fixture: ComponentFixture<NavbarTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarTodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
