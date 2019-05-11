import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudBajaListaComponent } from './solicitud-baja-lista.component';

describe('SolicitudBajaListaComponent', () => {
  let component: SolicitudBajaListaComponent;
  let fixture: ComponentFixture<SolicitudBajaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudBajaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudBajaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
