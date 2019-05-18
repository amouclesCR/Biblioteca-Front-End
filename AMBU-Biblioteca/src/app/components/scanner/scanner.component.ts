import { Component, VERSION, OnInit, ViewChild } from '@angular/core';

import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { Activo } from 'src/app/interfaces/index';
import { ActivoService, AlertasService } from '../../services/index';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  ngVersion = VERSION.full;

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasCameras = false;
  ensender = false;
  hasPermission: boolean;
  qrResultString: string;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;

  //  ATRIBUTOS
  resultado: string;
  listaDispositivos: MediaDeviceInfo[];
  seleccionDispositivo: MediaDeviceInfo;
  camara = false;
  permisos = false;
  listaActivos: Activo[];
  mensajeAccion: string;

  constructor( 
    private activoServicio: ActivoService,
    private alertasServicio: AlertasService) {

  }
  //  FUNCIONES
  ngOnInit(): void {
    this.listaActivos = [];
      this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
          this.camara = true;
          this.listaDispositivos = devices;
      });

      this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
          console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
      });

      this.scanner.permissionResponse.subscribe((answer: boolean) => {
        this.permisos = answer;
      });

  }

  escaneo(resultString: string) {
      this.resultado = resultString;
      if (this.resultado) {
        this.getActivos();
      }
  }

  dispositivoSeleccionado(selectedValue: string) {
      this.seleccionDispositivo = this.scanner.getDeviceById(selectedValue);
      this.mensajeAccion = this.seleccionDispositivo? "Ya puedes escanear" : "";
  }

  get activosVacio() {
    return this.listaActivos.length > 0;
  }

  getActivos() {
    this.activoServicio.getActivosByNumeroActivo(this.resultado).subscribe(
      res => {
        this.listaActivos.push(res.body);
      }, 
      err => {
        if (err.status==0) {
          this.alertasServicio.errorInfoAlert("No se puede conectar al servidor!!!"+
          "Por favor, verifique la conexión con el servidor");
        } else {
          this.alertasServicio.errorInfoAlert("El Activo solicitado no puede ser encontrado!!!"+
          "Por favor, revise que el codigo del activo sea el correcto");
        }
      }
    );
  }
}
