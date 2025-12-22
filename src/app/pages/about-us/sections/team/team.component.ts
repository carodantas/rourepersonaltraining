import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type TeamMember = {
  name: string;
  title: string;
  bio: string;
  image?: string;
};

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'Carlos Alberto Torres Roure',
      title: 'Founder & Personal Trainer',
      bio:
        'Carlos has a deep passion for sports and strength training. Over the years, he has explored various disciplines including judo, rugby, and football — before focusing on strength training with an emphasis on muscle development and functional strength.\n\nFor Carlos, enjoying movement is key. His coaching focuses on helping clients build healthy habits they can maintain long-term — habits that positively influence not only themselves, but also the people around them.',
      image: 'images/carlos-torres.png'
    },
    {
      name: 'Niels Greven',
      title: 'Personal Trainer',
      bio:
        'Sports have been part of Niels\' life from a young age. After nearly ten years working as a physics teacher, he decided to turn his long-standing passion for training into his profession.\n\nWith over eight years of consistent personal training experience and multiple certifications, Niels continues to deepen his knowledge through ongoing education. His coaching style is responsible, science-based, and always focused on making training enjoyable and meaningful.',
      image: 'images/niels-greven.png'
    },
    {
      name: 'Izabela Gasparovic',
      title: 'Personal Trainer & Rehabilitation Specialist',
      bio:
        'Izabela has a background in kinesiology and more than ten years of experience in personal training and rehabilitation. As a former professional handball player, she brings firsthand knowledge of performance, injury prevention, and recovery.\n\nHer strength lies in assessing individual needs, reducing injury risks, and creating personalized recovery and training plans. Izabela believes that understanding why you train is just as important as the training itself — and that enjoyment plays a key role in long-term success.',
      image: 'images/izabela-gasparovic.png'
    },
    {
      name: 'Dennis Bakker',
      title: 'Personal Trainer & Sports Therapist',
      bio:
        'With nearly 15 years of experience in the fitness industry, Dennis knows what works — and what doesn\'t. As a personal trainer and certified sports therapist, he helps people get stronger, fitter, and more in control of their health, both physically and mentally.\n\nHis approach is straightforward: personal attention, honest feedback, and training that fits you. No gimmicks, no shouting — just clear coaching, firm when needed, and always purposeful.\n\nWhether you\'re recovering, building strength, or simply want to feel better in your own body, Dennis believes in tackling it together — step by step, at your pace.',
      image: 'images/dennis-bakker.png'
    }
  ];
}


