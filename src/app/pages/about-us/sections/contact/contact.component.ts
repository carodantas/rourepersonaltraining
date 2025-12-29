import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  location = {
    title: 'Studio Location',
    address: 'Amsterdam, NH',
    street: 'Domselaerstraat 120, 1093 MB',
    kvk: 'KVK: 92526268'
  };

  phone = {
    title: 'Call Us',
    number: '+31 6 241 662 51',
    hours: {
      weekdays: 'Mon - Fri: 07:00 - 22:00',
      saturday: 'Saturday: 09:00 - 17:00',
      sunday: 'Sunday: 09:00 - 17:00'
    }
  };

  email = {
    title: 'Send Us an Email',
    address: 'Info@roure.nl'
  };

  // Google Maps embed URL for Roure Personal Training, Domselaerstraat 120, 1093 MB Amsterdam
  private mapUrlString = 'https://www.google.com/maps?q=Roure+Personal+Training,+Domselaerstraat+120,+1093+MB+Amsterdam,+Países+Baixos&output=embed';

  constructor(private sanitizer: DomSanitizer) {}

  get mapUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrlString);
  }

  get videoUrl(): SafeResourceUrl | null {
    return this.toSafeYoutubeEmbed('https://www.youtube.com/embed/trBTosWRs0w');
  }

  toSafeYoutubeEmbed(url: string): SafeResourceUrl | null {
    // Whitelist only YouTube embed URLs for security
    const allowed = /^https:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+/;
    if (!allowed.test(url)) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

