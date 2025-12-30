import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent implements OnInit {
  slug: string | null = null;
  article: any = null;

  articles: any[] = [
    {
      slug: 'why-personal-trainers-are-worth-it',
      title: 'Why Personal Trainers Are Worth It',
      category: 'Personal Training',
      date: 'August 21, 2024',
      image: 'images/why-personal-trainers-are-worth-it.png',
      content: {
        introduction: "In today's fast-paced world, staying fit and healthy can be challenging. Many people turn to personal trainers to help them achieve their fitness goals. But is hiring a personal trainer really worth it? Let's explore why personal trainers can be a valuable investment in your health.",
        sections: [
          {
            title: 'Personalized Workout Plans',
            content: "One of the main benefits of working with a personal trainer is the creation of a personalized workout plan. Unlike generic workout routines you might find online, a personal trainer tailors exercises to your specific needs and goals. Whether you aim to lose weight, build muscle, or improve your overall fitness, a personalized plan can make a significant difference."
          },
          {
            title: 'Proper Technique and Form',
            content: "Personal trainers are experts in exercise techniques and proper form. They ensure you perform exercises correctly to avoid injuries and maximize effectiveness. Incorrect form can lead to serious injuries and long-term health issues. With a personal trainer guiding you, you can be confident that you are exercising safely."
          },
          {
            title: 'Motivation and Accountability',
            content: "Staying motivated can be one of the biggest hurdles in maintaining a fitness routine. Personal trainers provide the encouragement and support you need to stay on track. They hold you accountable by setting realistic goals and tracking your progress. Knowing that someone is monitoring your progress can be a strong motivator to stick with your fitness plan."
          },
          {
            title: 'Efficient Workouts',
            content: "Time is a precious commodity, and personal trainers help you make the most of it. They design workouts that are efficient and effective, ensuring you get the best results in the shortest amount of time. With a well-structured plan, you can achieve more in a 30-minute session with a personal trainer than in an hour working out on your own."
          },
          {
            title: 'Customized Nutrition Advice',
            content: "Personal trainers often provide nutritional advice tailored to your fitness goals. They can help you create a balanced diet plan that complements your workouts and enhances your results. Proper nutrition is a crucial component of any fitness journey, and having expert guidance can make a significant difference."
          },
          {
            title: 'Adaptability and Flexibility',
            content: "Life is unpredictable, and sometimes your fitness routine needs to adapt. Personal trainers can adjust your workout plans to accommodate changes in your schedule, fitness level, or health conditions. This flexibility ensures that you can continue progressing toward your goals, no matter what life throws your way."
          },
          {
            title: 'Cost-Effective Investment',
            content: "While hiring a personal trainer may seem like a significant expense, it can be a cost-effective investment in the long run. The benefits of personalized training, injury prevention, and efficient workouts can save you time and money on medical bills and ineffective fitness programs. Additionally, the long-term health benefits can lead to a better quality of life."
          }
        ],
        conclusion: "In conclusion, personal trainers offer numerous advantages that make them worth the investment. From personalized workout plans to motivation and accountability, they provide the support you need to achieve your fitness goals efficiently and safely. If you're searching for \"personal trainers near me\" or considering Roure Personal Training, now is the time to take the leap and invest in your health.",
        callToAction: "Have you worked with a personal trainer before? Share your experiences in the comments below!"
      }
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      if (this.slug) {
        this.article = this.articles.find(a => a.slug === this.slug);
        if (!this.article) {
          // Redirect to blog if article not found
          void this.router.navigate(['/blog']);
        }
      }
    });
  }
}

