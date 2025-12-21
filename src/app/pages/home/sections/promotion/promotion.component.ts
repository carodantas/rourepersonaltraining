import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonPrimaryGlassComponent } from '../../../../shared/components/button-primary-glass/button-primary-glass.component';

@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonPrimaryGlassComponent],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css'
})
export class PromotionComponent implements OnInit {
  intakeForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  showProgramSelection = false;
  selectedProgram = '';

  goals = [
    { id: 'improve-health', label: 'Improve my overall health' },
    { id: 'confidence', label: 'Feel more confident / improve my appearance' },
    { id: 'flexibility', label: 'Increase flexibility' },
    { id: 'tone', label: 'Tone and shape my body' },
    { id: 'posture', label: 'Improve posture' },
    { id: 'lose-weight', label: 'Lose weight' },
    { id: 'strength', label: 'Get stronger' },
    { id: 'other', label: 'Other' }
  ];

  programOptions = [
    { value: '', label: 'Select a program' },
    { value: 'weight-loss-muscle-mass', label: 'Weight loss & muscle mass' },
    { value: 'peak-performance', label: 'Peak performance' },
    { value: 'vitality-longevity', label: 'Vitality & longevity' },
    { value: 'prenatal-postpartum', label: 'Prenatal & postpartum' },
    { value: 'not-sure', label: 'Not sure yet' }
  ];

  exerciseFrequencyOptions = [
    { value: '', label: 'Select' },
    { value: 'daily', label: 'Daily' },
    { value: '4-5-times', label: '4-5 times per week' },
    { value: '2-3-times', label: '2-3 times per week' },
    { value: 'once-week', label: 'Once per week' },
    { value: 'occasionally', label: 'Occasionally' },
    { value: 'rarely', label: 'Rarely / Never' }
  ];

  planOptions = [
    { value: '', label: 'Select a plan' },
    { value: 'duo-buddy', label: 'Duo / Buddy' },
    { value: 'solo-standard', label: 'Solo Standard' },
    { value: 'long-term', label: 'Long-Term' },
    { value: 'not-sure', label: 'Not sure yet' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.intakeForm = this.fb.group({
      plan: [''],
      program: [''],
      goals: this.fb.group(
        this.goals.reduce((acc, goal) => {
          acc[goal.id] = [false];
          return acc;
        }, {} as Record<string, [boolean]>)
      ),
      otherGoal: [''],
      exerciseFrequency: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      discountCode: [''],
      questions: [''],
      receiveCommunications: [false]
    });
  }

  ngOnInit(): void {
    // Check for query parameters
    this.route.queryParams.subscribe(params => {
      // Check for program parameter
      if (params['program']) {
        const programValue = params['program'];
        if (this.programOptions.some(option => option.value === programValue)) {
          this.showProgramSelection = true;
          this.selectedProgram = programValue;
          this.intakeForm.patchValue({ program: programValue });
        }
      }
      
      // Check for plan query parameter and pre-select it
      if (params['plan']) {
        const planValue = params['plan'];
        // Validate that the plan value is valid
        if (this.planOptions.some(option => option.value === planValue)) {
          this.intakeForm.patchValue({ plan: planValue });
        }
      }
      
      // Scroll to form after a short delay to ensure it's rendered
      if (params['program'] || params['plan']) {
        setTimeout(() => {
          const element = document.getElementById('promotion');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  }

  get goalsFormGroup(): FormGroup {
    return this.intakeForm.get('goals') as FormGroup;
  }

  get showOtherInput(): boolean {
    return this.goalsFormGroup.get('other')?.value || false;
  }

  onSubmit(): void {
    if (this.intakeForm.valid) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        console.log('Form submitted:', this.intakeForm.value);
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.intakeForm.reset();
        
        // Reset submitted state after 5 seconds
        setTimeout(() => {
          this.isSubmitted = false;
        }, 5000);
      }, 1000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.intakeForm.controls).forEach(key => {
        const control = this.intakeForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  hasError(controlName: string): boolean {
    const control = this.intakeForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(controlName: string): string {
    const control = this.intakeForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }
}
