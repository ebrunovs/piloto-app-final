import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusMateriaisComponent } from './meus-materiais.component';

describe('MeusMateriaisComponent', () => {
  let component: MeusMateriaisComponent;
  let fixture: ComponentFixture<MeusMateriaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeusMateriaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusMateriaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
