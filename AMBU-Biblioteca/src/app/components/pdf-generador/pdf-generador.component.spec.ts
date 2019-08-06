import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfGeneradorComponent } from './pdf-generador.component';

describe('PdfGeneradorComponent', () => {
  let component: PdfGeneradorComponent;
  let fixture: ComponentFixture<PdfGeneradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfGeneradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfGeneradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
