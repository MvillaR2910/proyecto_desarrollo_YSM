import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true, // Hacerlo standalone
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUserData = localStorage.getItem('userProfile');
    this.isLoggedIn = !!storedUserData;
  }

  logout() {
    localStorage.removeItem('userProfile');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
