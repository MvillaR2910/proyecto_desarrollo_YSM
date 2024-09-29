import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  userData: any;

  ngOnInit() {
    const storedUserData = localStorage.getItem('userProfile');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
  }

  logout() {
    localStorage.removeItem('userProfile');
    // Redirigir a login o a la página que quieras después de cerrar sesión
  }
}
