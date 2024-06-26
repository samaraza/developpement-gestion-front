import { LoginService } from 'src/app/services/login_service';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Role } from '../enums/role';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('rot', [
      transition(':enter', [
        animate('900ms', keyframes([
          style({ transform: 'rotate(0deg)', offset: 0 }),
          style({ transform: 'rotate(1turn)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  connectedUserRole?: Role;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.connectedUserRole = this.loginService.connectedUser.role;
    this.filterNavData();
  }

  filterNavData(): void {
    if (this.connectedUserRole) {
      this.navData = navbarData.filter(item => item.roles.includes(this.connectedUserRole!));
    }
  }

  toggleLeCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  logout() {
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
