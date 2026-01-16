import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private title = inject(Title);

  ngOnInit(): void {
    // Set default title on app initialization
    this.title.setTitle('Roure Personal Training | Amsterdam Oost');
    
    // Page view tracking is handled automatically by AnalyticsService
    // via router NavigationEnd events, so no need to track here to avoid duplicates
  }
}
