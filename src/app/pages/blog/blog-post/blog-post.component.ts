import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import type { BlogCategoryId } from '../blog.types';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent implements OnInit {
  slug: string | null = null;
  article: any = null;

  articles: any[] = [
    {
      slug: 'why-personal-trainers-are-worth-it',
      titleKey: 'blog.post.whyPersonalTrainersAreWorthIt.title',
      categoryId: 'personal-training' as BlogCategoryId,
      date: 'August 21, 2024',
      image: 'images/why-personal-trainers-are-worth-it.png',
      content: {
        introductionKey: 'blog.post.whyPersonalTrainersAreWorthIt.introduction',
        sections: [
          {
            titleKey: 'blog.post.whyPersonalTrainersAreWorthIt.sections.0.title',
            contentKey: 'blog.post.whyPersonalTrainersAreWorthIt.sections.0.content'
          },
          {
            titleKey: 'blog.post.whyPersonalTrainersAreWorthIt.sections.1.title',
            contentKey: 'blog.post.whyPersonalTrainersAreWorthIt.sections.1.content'
          },
          {
            titleKey: 'blog.post.whyPersonalTrainersAreWorthIt.sections.2.title',
            contentKey: 'blog.post.whyPersonalTrainersAreWorthIt.sections.2.content'
          },
          {
            titleKey: 'blog.post.whyPersonalTrainersAreWorthIt.sections.3.title',
            contentKey: 'blog.post.whyPersonalTrainersAreWorthIt.sections.3.content'
          },
          {
            titleKey: 'blog.post.whyPersonalTrainersAreWorthIt.sections.4.title',
            contentKey: 'blog.post.whyPersonalTrainersAreWorthIt.sections.4.content'
          },
          {
            titleKey: 'blog.post.whyPersonalTrainersAreWorthIt.sections.5.title',
            contentKey: 'blog.post.whyPersonalTrainersAreWorthIt.sections.5.content'
          },
          {
            titleKey: 'blog.post.whyPersonalTrainersAreWorthIt.sections.6.title',
            contentKey: 'blog.post.whyPersonalTrainersAreWorthIt.sections.6.content'
          }
        ],
        conclusionKey: 'blog.post.whyPersonalTrainersAreWorthIt.conclusion',
        callToActionKey: 'blog.post.whyPersonalTrainersAreWorthIt.callToAction'
      }
    },
    {
      slug: 'how-exercise-helps-to-relieve-stress',
      titleKey: 'blog.post.howExerciseHelpsToRelieveStress.title',
      categoryId: 'tips-tricks' as BlogCategoryId,
      date: 'June 29, 2023',
      image: 'images/how-exercise-helps-to-relieve-stress-card.jpg',
      content: {
        introductionKey: 'blog.post.howExerciseHelpsToRelieveStress.introduction',
        sections: [
          {
            titleKey: 'blog.post.howExerciseHelpsToRelieveStress.sections.0.title',
            contentKey: 'blog.post.howExerciseHelpsToRelieveStress.sections.0.content'
          },
          {
            titleKey: 'blog.post.howExerciseHelpsToRelieveStress.sections.1.title',
            contentKey: 'blog.post.howExerciseHelpsToRelieveStress.sections.1.content'
          },
          {
            titleKey: 'blog.post.howExerciseHelpsToRelieveStress.sections.2.title',
            contentKey: 'blog.post.howExerciseHelpsToRelieveStress.sections.2.content'
          },
          {
            titleKey: 'blog.post.howExerciseHelpsToRelieveStress.sections.3.title',
            contentKey: 'blog.post.howExerciseHelpsToRelieveStress.sections.3.content'
          },
          {
            titleKey: 'blog.post.howExerciseHelpsToRelieveStress.sections.4.title',
            contentKey: 'blog.post.howExerciseHelpsToRelieveStress.sections.4.content'
          },
          {
            titleKey: 'blog.post.howExerciseHelpsToRelieveStress.sections.5.title',
            contentKey: 'blog.post.howExerciseHelpsToRelieveStress.sections.5.content'
          },
          {
            titleKey: 'blog.post.howExerciseHelpsToRelieveStress.sections.6.title',
            contentKey: 'blog.post.howExerciseHelpsToRelieveStress.sections.6.content'
          }
        ],
        conclusionKey: '',
        callToActionKey: ''
      }
    },
    {
      slug: 'how-much-water-should-you-drink',
      titleKey: 'blog.post.howMuchWaterShouldYouDrink.title',
      categoryId: 'tips-tricks' as BlogCategoryId,
      date: 'May 14, 2023',
      image: 'images/hydration-before-during-after-workout-card.jpg',
      content: {
        introductionKey: 'blog.post.howMuchWaterShouldYouDrink.introduction',
        sections: [
          {
            titleKey: 'blog.post.howMuchWaterShouldYouDrink.sections.0.title',
            contentKey: 'blog.post.howMuchWaterShouldYouDrink.sections.0.content'
          },
          {
            titleKey: 'blog.post.howMuchWaterShouldYouDrink.sections.1.title',
            contentKey: 'blog.post.howMuchWaterShouldYouDrink.sections.1.content'
          },
          {
            titleKey: 'blog.post.howMuchWaterShouldYouDrink.sections.2.title',
            contentKey: 'blog.post.howMuchWaterShouldYouDrink.sections.2.content'
          },
          {
            titleKey: 'blog.post.howMuchWaterShouldYouDrink.sections.3.title',
            contentKey: 'blog.post.howMuchWaterShouldYouDrink.sections.3.content'
          },
          {
            titleKey: 'blog.post.howMuchWaterShouldYouDrink.sections.4.title',
            contentKey: 'blog.post.howMuchWaterShouldYouDrink.sections.4.content'
          },
          {
            titleKey: 'blog.post.howMuchWaterShouldYouDrink.sections.5.title',
            contentKey: 'blog.post.howMuchWaterShouldYouDrink.sections.5.content'
          }
        ],
        conclusionKey: '',
        callToActionKey: ''
      }
    },
    {
      slug: 'static-stretching-vs-dynamic-stretching',
      titleKey: 'blog.post.staticStretchingVsDynamicStretching.title',
      categoryId: 'exercises' as BlogCategoryId,
      date: 'February 14, 2023',
      image: 'images/static-stretching-vs-dynamic-stretching-an-introduction-card.jpg',
      content: {
        introductionKey: 'blog.post.staticStretchingVsDynamicStretching.introduction',
        sections: [
          {
            titleKey: 'blog.post.staticStretchingVsDynamicStretching.sections.0.title',
            contentKey: 'blog.post.staticStretchingVsDynamicStretching.sections.0.content'
          },
          {
            titleKey: 'blog.post.staticStretchingVsDynamicStretching.sections.1.title',
            contentKey: 'blog.post.staticStretchingVsDynamicStretching.sections.1.content'
          },
          {
            titleKey: 'blog.post.staticStretchingVsDynamicStretching.sections.2.title',
            contentKey: 'blog.post.staticStretchingVsDynamicStretching.sections.2.content'
          },
          {
            titleKey: 'blog.post.staticStretchingVsDynamicStretching.sections.3.title',
            contentKey: 'blog.post.staticStretchingVsDynamicStretching.sections.3.content'
          }
        ],
        conclusionKey: '',
        callToActionKey: ''
      }
    },
    {
      slug: 'mindful-exercise-mindfulness-workouts',
      titleKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.title',
      categoryId: 'exercises' as BlogCategoryId,
      date: 'January 10, 2023',
      image: 'images/mindful-exercise-workout-routine-card.jpg',
      content: {
        introductionKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.introduction',
        sections: [
          {
            titleKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.sections.0.title',
            contentKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.sections.0.content'
          },
          {
            titleKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.sections.1.title',
            contentKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.sections.1.content'
          },
          {
            titleKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.sections.2.title',
            contentKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.sections.2.content'
          },
          {
            titleKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.sections.3.title',
            contentKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.sections.3.content'
          },
          {
            titleKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.sections.4.title',
            contentKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.sections.4.content'
          },
          {
            titleKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.sections.5.title',
            contentKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.sections.5.content'
          },
          {
            titleKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.sections.6.title',
            contentKey: 'blog.post.mindfulExerciseMindfulnessWorkouts.sections.6.content'
          }
        ],
        conclusionKey: '',
        callToActionKey: ''
      }
    },
    {
      slug: 'building-strength-comprehensive-guide',
      titleKey: 'blog.post.buildingStrengthComprehensiveGuide.title',
      categoryId: 'personal-training' as BlogCategoryId,
      date: 'December 5, 2023',
      image: 'images/fascinating-facts-about-muscles-card.jpg',
      content: {
        introductionKey: 'blog.post.buildingStrengthComprehensiveGuide.introduction',
        sections: [
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.0.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.0.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.1.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.1.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.2.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.2.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.3.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.3.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.4.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.4.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.5.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.5.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.6.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.6.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.7.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.7.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.8.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.8.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.9.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.9.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.10.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.10.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.11.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.11.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.12.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.12.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.13.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.13.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.14.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.14.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.15.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.15.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.16.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.16.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.17.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.17.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.18.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.18.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.19.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.19.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.20.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.20.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.21.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.21.content'
          },
          {
            titleKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.22.title',
            contentKey: 'blog.post.buildingStrengthComprehensiveGuide.sections.22.content'
          }
        ],
        conclusionKey: '',
        callToActionKey: ''
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

  categoryLabelKey(categoryId: BlogCategoryId | undefined): string {
    switch (categoryId) {
      case 'all':
        return 'blog.categories.all';
      case 'client-talks':
        return 'blog.categories.clientTalks';
      case 'event':
        return 'blog.categories.event';
      case 'exercises':
        return 'blog.categories.exercises';
      case 'personal-training':
        return 'blog.categories.personalTraining';
      case 'recipes':
        return 'blog.categories.recipes';
      case 'tips-tricks':
        return 'blog.categories.tipsTricks';
      case 'uncategorized':
        return 'blog.categories.uncategorized';
      default:
        return 'blog.categories.uncategorized';
    }
  }
}

