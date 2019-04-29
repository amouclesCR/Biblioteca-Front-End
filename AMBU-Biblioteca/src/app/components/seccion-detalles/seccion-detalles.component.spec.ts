import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionDetallesComponent } from './seccion-detalles.component';

describe('SeccionDetallesComponent', () => {
  let component: SeccionDetallesComponent;
  let fixture: ComponentFixture<SeccionDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
