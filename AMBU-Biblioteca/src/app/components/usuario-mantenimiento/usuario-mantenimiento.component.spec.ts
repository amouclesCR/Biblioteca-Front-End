import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioMantenimientoComponent } from './usuario-mantenimiento.component';

describe('UsuarioMantenimientoComponent', () => {
  let component: UsuarioMantenimientoComponent;
  let fixture: ComponentFixture<UsuarioMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
