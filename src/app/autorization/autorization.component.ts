import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from '../services/login_service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.css']
})
export class AutorizationComponent implements OnInit {

  constructor(private router: Router,private loginService: LoginService) { }

  ngOnInit(): void {

  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    // Perform your action here, such as navigating to a specific route
    // For example, navigate to the login page when the back button is pressed
    this.goToRoute()
  }

  goToRoute(){
 // Open the login page in a new window
 const newWindow = window.open('/login', '_blank');

 // Close the current window after a short delay
 setTimeout(() => {
   if (newWindow) {
     window.close();
   } else {
     // Handle if pop-up blocker prevents opening the new window
     console.error('Popup blocker prevented opening the login page in a new window.');
   }
 }, 500); // Adjust the delay as needed

  }

}
