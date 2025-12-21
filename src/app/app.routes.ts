import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { MethodsComponent } from './pages/methods/methods.component';
import { BlogComponent } from './pages/blog/blog.component';
import { FreeIntakeComponent } from './pages/free-intake/free-intake.component';
import { WeightLossMuscleMassComponent } from './pages/programs/weight-loss-muscle-mass/weight-loss-muscle-mass.component';
import { PeakPerformanceComponent } from './pages/programs/peak-performance/peak-performance.component';
import { VitalityLongevityComponent } from './pages/programs/vitality-longevity/vitality-longevity.component';
import { PrenatalPostpartumComponent } from './pages/programs/prenatal-postpartum/prenatal-postpartum.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'methods',
    component: MethodsComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'programs',
    component: ProgramsComponent
  },
  {
    path: 'free-intake',
    component: FreeIntakeComponent
  },
  {
    path: 'programs/weight-loss-muscle-mass',
    component: WeightLossMuscleMassComponent
  },
  {
    path: 'programs/peak-performance',
    component: PeakPerformanceComponent
  },
  {
    path: 'programs/vitality-longevity',
    component: VitalityLongevityComponent
  },
  {
    path: 'programs/prenatal-postpartum',
    component: PrenatalPostpartumComponent
  }
];
