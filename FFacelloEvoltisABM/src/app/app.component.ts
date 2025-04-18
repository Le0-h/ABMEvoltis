import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ABM Usuarios';
  year: number = new Date().getFullYear();

  ngOnInit() {
    // Cualquier inicialización futura puede ir aquí
  }
}
