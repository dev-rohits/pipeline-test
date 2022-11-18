import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { BooleanNullable } from 'aws-sdk/clients/glue';

import { Menu } from 'src/app/model/Menu';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() sidebaropen!: boolean;

  menu: Menu[] = [];
  open!: boolean;

  constructor(
    private authService: AuthService,
    private renderer2: Renderer2,
    private router: Router
  ) { }

  currentUrl: string = '';

  ngOnInit(): void {

    this.currentUrl = this.router.url;
    this.authService
      .getUserMenuBar(
        JSON.parse(localStorage.getItem('auth') as string).selectedInstitute
      )
      .subscribe((res) => {
        this.menu = res;
      });
  }
}
