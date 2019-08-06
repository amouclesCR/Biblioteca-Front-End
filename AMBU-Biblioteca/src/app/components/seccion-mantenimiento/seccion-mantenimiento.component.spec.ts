import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionMantenimientoComponent } from './seccion-mantenimiento.component';

describe('SeccionMantenimientoComponent', () => {
  let component: SeccionMantenimientoComponent;
  let fixture: ComponentFixture<SeccionMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
