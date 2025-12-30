import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
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

  programOptions = [
    { value: '', label: 'Select a program' },
    { value: 'weight-loss-muscle-mass', label: 'Weight loss & muscle mass' },
    { value: 'peak-performance', label: 'Peak performance' },
    { value: 'vitality-longevity', label: 'Vitality & longevity' },
    { value: 'prenatal-postpartum', label: 'Prenatal & postpartum' },
    { value: 'not-sure', label: 'Not sure yet' }
  ];

  planOptions = [
    { value: '', label: 'Select a plan' },
    { value: 'duo-buddy', label: 'Duo / Buddy' },
    { value: 'solo-standard', label: 'Solo Standard' },
    { value: 'long-term', label: 'Long-Term' },
    { value: 'not-sure', label: 'Not sure yet' }
  ];

  trainingGoals = [
    { value: 'improve-health', label: 'Improve my overall health' },
    { value: 'increase-flexibility', label: 'Increase flexibility' },
    { value: 'improve-posture', label: 'Improve posture' },
    { value: 'get-stronger', label: 'Get stronger' },
    { value: 'feel-confident', label: 'Feel more confident / improve my appearance' },
    { value: 'tone-shape', label: 'Tone and shape my body' },
    { value: 'lose-weight', label: 'Lose weight' },
    { value: 'other', label: 'Other' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Create FormArray for goals with all goals set to false initially
    const goalsControls = this.trainingGoals.map(() => this.fb.control(false));
    
    this.intakeForm = this.fb.group({
      plan: [''],
      program: [''],
      goals: this.fb.array(goalsControls),
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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

  get goalsFormArray(): FormArray {
    return this.intakeForm.get('goals') as FormArray;
  }

  getGoalControl(goalValue: string): FormControl {
    const index = this.trainingGoals.findIndex(g => g.value === goalValue);
    return this.goalsFormArray.at(index) as FormControl;
  }
}
