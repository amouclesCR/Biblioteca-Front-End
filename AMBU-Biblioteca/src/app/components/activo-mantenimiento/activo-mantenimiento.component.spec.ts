import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoMantenimientoComponent } from './activo-mantenimiento.component';

describe('ActivoMantenimientoComponent', () => {
  let component: ActivoMantenimientoComponent;
  let fixture: ComponentFixture<ActivoMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivoMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivoMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
