import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoMantenimientoComponent } from './departamento-mantenimiento.component';

describe('DepartamentoMantenimientoComponent', () => {
  let component: DepartamentoMantenimientoComponent;
  let fixture: ComponentFixture<DepartamentoMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartamentoMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentoMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
