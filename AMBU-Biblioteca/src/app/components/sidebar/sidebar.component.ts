import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private login: LoginService
  ) { }

  // FUNCIONES
  logout() {
    this.login.logout();
  }
  ngOnInit() {
  }

}
