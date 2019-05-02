import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMantenimientoComponent } from './perfil-mantenimiento.component';

describe('PerfilMantenimientoComponent', () => {
  let component: PerfilMantenimientoComponent;
  let fixture: ComponentFixture<PerfilMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
