import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

type TeamMember = {
  name: string;
  titleKey: string;
  bioKey: string;
  image?: string;
};

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'Carlos Alberto Torres Roure',
      titleKey: 'aboutUs.team.members.carlos.title',
      bioKey: 'aboutUs.team.members.carlos.bio',
      image: 'images/carlos-torres.jpg'
    },
    {
      name: 'Niels Greven',
      titleKey: 'aboutUs.team.members.niels.title',
      bioKey: 'aboutUs.team.members.niels.bio',
      image: 'images/niels-greven.jpg'
    },
    {
      name: 'Izabela Gasparovic',
      titleKey: 'aboutUs.team.members.izabela.title',
      bioKey: 'aboutUs.team.members.izabela.bio',
      image: 'images/izabela-gasparovic.jpg'
    },
    {
      name: 'Dennis Bakker',
      titleKey: 'aboutUs.team.members.dennis.title',
      bioKey: 'aboutUs.team.members.dennis.bio',
      image: 'images/dennis-bakker.jpg'
    }
  ];
}


