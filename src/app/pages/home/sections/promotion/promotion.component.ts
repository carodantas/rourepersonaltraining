import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonPrimaryGlassComponent } from '../../../../shared/components/button-primary-glass/button-primary-glass.component';
import { IntakeFormSubmission, getGoalLabel, getPlanLabel, getProgramLabel } from './intake-form.interface';

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

  showSuccessAnimation = false;

  /**
   * Prepares form data for backend submission
   * Returns formatted data structure ready for API
   */
  prepareSubmissionData(): IntakeFormSubmission {
    const formValue = this.intakeForm.value;
    const goalsArray = this.goalsFormArray.value as boolean[];
    
    // Extract selected goals
    const selectedGoals = this.trainingGoals
      .filter((goal, index) => goalsArray[index] === true)
      .map(goal => goal.value);

    return {
      clientDetails: {
        firstName: formValue.firstName || '',
        lastName: formValue.lastName || '',
        phoneNumber: formValue.phoneNumber || '',
        email: formValue.email || ''
      },
      intakeInformation: {
        interestedPlan: formValue.plan || '',
        interestedProgram: formValue.program || ''
      },
      goals: selectedGoals,
      additionalNotes: formValue.questions || undefined,
      receiveCommunications: formValue.receiveCommunications || false,
      metadata: {
        submittedAt: new Date().toISOString(),
        source: 'website',
        userAgent: navigator.userAgent
      }
    };
  }

  /**
   * Gets formatted data for email templates
   * Returns human-readable labels for display in emails
   */
  getFormattedDataForEmails() {
    const submissionData = this.prepareSubmissionData();
    
    return {
      // Client details for email
      clientName: `${submissionData.clientDetails.firstName} ${submissionData.clientDetails.lastName}`,
      firstName: submissionData.clientDetails.firstName,
      lastName: submissionData.clientDetails.lastName,
      phoneNumber: submissionData.clientDetails.phoneNumber,
      email: submissionData.clientDetails.email,
      
      // Intake information with labels
      interestedPlan: getPlanLabel(submissionData.intakeInformation.interestedPlan),
      interestedProgram: getProgramLabel(submissionData.intakeInformation.interestedProgram),
      
      // Goals with labels
      selectedGoals: submissionData.goals.map(goal => getGoalLabel(goal)),
      goalsList: submissionData.goals.map(goal => getGoalLabel(goal)).join(', '),
      
      // Additional notes
      additionalNotes: submissionData.additionalNotes || 'No additional notes provided.',
      
      // Marketing consent
      receiveCommunications: submissionData.receiveCommunications
    };
  }

  onSubmit(): void {
    if (this.intakeForm.valid) {
      this.isSubmitting = true;
      
      // Prepare data for backend submission
      const submissionData = this.prepareSubmissionData();
      const emailData = this.getFormattedDataForEmails();
      
      // Log formatted data (for debugging - remove in production)
      console.log('Form submission data (for backend):', submissionData);
      console.log('Formatted data (for emails):', emailData);
      
      // TODO: Replace with actual API call
      // Example:
      // this.intakeService.submitIntakeForm(submissionData).subscribe({
      //   next: (response) => {
      //     // Handle success
      //   },
      //   error: (error) => {
      //     // Handle error
      //   }
      // });
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccessAnimation = true;
        
        // Show success animation for 1.5 seconds, then show message
        setTimeout(() => {
          this.showSuccessAnimation = false;
          this.isSubmitted = true;
          this.intakeForm.reset();
          
          // Scroll to top of the section to show confirmation message
          setTimeout(() => {
            const element = document.getElementById('promotion');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              // Fallback to window scroll if element not found
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 100);
        }, 1500);
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

  exploreWebsite(): void {
    void this.router.navigate(['/']);
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }
}
