import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  location = {
    titleKey: 'aboutUs.contact.location.title',
    addressKey: 'aboutUs.contact.location.address',
    streetKey: 'aboutUs.contact.location.street',
    kvkKey: 'aboutUs.contact.location.kvk'
  };

  phone = {
    titleKey: 'aboutUs.contact.phone.title',
    number: '+31 6 241 662 51',
    hours: {
      weekdaysKey: 'aboutUs.contact.phone.hours.weekdays',
      saturdayKey: 'aboutUs.contact.phone.hours.saturday',
      sundayKey: 'aboutUs.contact.phone.hours.sunday'
    }
  };

  email = {
    titleKey: 'aboutUs.contact.email.title',
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

