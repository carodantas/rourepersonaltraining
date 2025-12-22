import { Component, signal, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type BlogArticle = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  comments: number;
  image: string;
  slug: string;
};

@Component({
  selector: 'app-articles-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles-grid.component.html',
  styleUrl: './articles-grid.component.css'
})
export class ArticlesGridComponent {
  selectedCategory = input<string>('All Articles');

  allArticles: BlogArticle[] = [
    {
      id: '1',
      category: 'Personal Training',
      title: 'Why Personal Trainers Are Worth It',
      excerpt: "In today's fast-paced world, staying fit and healthy can be challenging. Many people turn to personal trainers to help them achieve their fitness goals.",
      date: 'August 21, 2024',
      comments: 0,
      image: 'images/no-image.jpg',
      slug: 'why-personal-trainers-are-worth-it'
    },
    {
      id: '2',
      category: 'Tips & Tricks',
      title: 'How exercise helps to relieve stress',
      excerpt: "Along with making sure you get enough sleep, regular exercise is the most common advice we hear whenever we go through a stressful period.",
      date: 'June 29, 2023',
      comments: 0,
      image: 'images/no-image.jpg',
      slug: 'how-exercise-helps-to-relieve-stress'
    },
    {
      id: '3',
      category: 'Exercises',
      title: 'Static stretching vs dynamic stretching: an introduction',
      excerpt: "We all know that stretching is important. However, not all stretches are equal. In this blogpost we'll shed a light on static stretching versus dynamic stretching.",
      date: 'February 14, 2023',
      comments: 0,
      image: 'images/no-image.jpg',
      slug: 'static-stretching-vs-dynamic-stretching'
    },
    {
      id: '4',
      category: 'Tips & Tricks',
      title: 'How much water should you drink before, during and after training?',
      excerpt: "We probably don't need to tell you how important it is to drink enough water every day. When you're working up a sweat, proper hydration becomes even more crucial.",
      date: 'May 14, 2023',
      comments: 0,
      image: 'images/no-image.jpg',
      slug: 'how-much-water-should-you-drink'
    },
    {
      id: '5',
      category: 'Exercises',
      title: 'Mindful exercise: How to bring more mindfulness into your workouts',
      excerpt: "Let's get one thing straight: there is absolutely nothing wrong with putting in your AirPods and listening to some tunes when you're going for a run.",
      date: 'January 10, 2023',
      comments: 0,
      image: 'images/no-image.jpg',
      slug: 'mindful-exercise-mindfulness-workouts'
    },
    {
      id: '6',
      category: 'Personal Training',
      title: 'Building strength: A comprehensive guide',
      excerpt: 'Strength training is one of the most effective ways to improve your overall health and fitness. Learn how to build strength safely and effectively.',
      date: 'December 5, 2023',
      comments: 0,
      image: 'images/no-image.jpg',
      slug: 'building-strength-comprehensive-guide'
    }
  ];

  filteredArticles = signal<BlogArticle[]>(this.allArticles);

  constructor(private router: Router) {
    // React to category changes
    effect(() => {
      const category = this.selectedCategory();
      if (category === 'All Articles') {
        this.filteredArticles.set(this.allArticles);
      } else {
        this.filteredArticles.set(
          this.allArticles.filter(article => article.category === category)
        );
      }
    });
  }

  openArticle(article: BlogArticle): void {
    // Navigate to article detail page (to be implemented)
    void this.router.navigate(['/blog', article.slug]);
  }

  formatComments(count: number): string {
    return count === 0 ? 'No Comments' : `${count} Comment${count !== 1 ? 's' : ''}`;
  }
}

