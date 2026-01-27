import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ButtonPrimaryGlassComponent } from '../../../../shared/components/button-primary-glass/button-primary-glass.component';
import { IntakeFormSubmission, getGoalLabel, getPlanLabel, getProgramLabel } from './intake-form.interface';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonPrimaryGlassComponent, RouterLink, TranslatePipe],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css'
})
export class PromotionComponent implements OnInit {
  intakeForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  submitError: string | null = null;
  showProgramSelection = false;
  selectedProgram = '';

  programOptions = [
    { value: '', labelKey: 'home.promotion.select.program' },
    { value: 'weight-loss-muscle-mass', labelKey: 'home.promotion.program.weightLoss' },
    { value: 'peak-performance', labelKey: 'home.promotion.program.peak' },
    { value: 'vitality-longevity', labelKey: 'home.promotion.program.vitality' },
    { value: 'prenatal-postpartum', labelKey: 'home.promotion.program.prenatal' },
    { value: 'not-sure', labelKey: 'home.promotion.program.notSure' }
  ];

  planOptions = [
    { value: '', labelKey: 'home.promotion.select.plan' },
    { value: 'duo-buddy', labelKey: 'home.promotion.plan.duo' },
    { value: 'solo-standard', labelKey: 'home.promotion.plan.solo' },
    { value: 'long-term', labelKey: 'home.promotion.plan.long' },
    { value: 'not-sure', labelKey: 'home.promotion.plan.notSure' }
  ];

  trainingGoals = [
    { value: 'improve-health', labelKey: 'home.promotion.goals.improveHealth' },
    { value: 'increase-flexibility', labelKey: 'home.promotion.goals.increaseFlexibility' },
    { value: 'improve-posture', labelKey: 'home.promotion.goals.improvePosture' },
    { value: 'get-stronger', labelKey: 'home.promotion.goals.getStronger' },
    { value: 'feel-confident', labelKey: 'home.promotion.goals.feelConfident' },
    { value: 'tone-shape', labelKey: 'home.promotion.goals.toneShape' },
    { value: 'lose-weight', labelKey: 'home.promotion.goals.loseWeight' },
    { value: 'other', labelKey: 'home.promotion.goals.other' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    // Create FormArray for goals with all goals set to false initially
    const goalsControls = this.trainingGoals.map(() => this.fb.control(false));
    
    this.intakeForm = this.fb.group({
      plan: [''],
      program: [''],
      goals: this.fb.array(goalsControls),
      otherGoalText: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      questions: [''],
      receiveCommunications: [false],
      // Honeypot anti-spam (must stay empty)
      website: ['']
    });
  }

  ngOnInit(): void {
    // Watch for "Other" checkbox changes to update validation
    const otherIndex = this.trainingGoals.findIndex(g => g.value === 'other');
    if (otherIndex !== -1) {
      this.getGoalControl('other').valueChanges.subscribe(isSelected => {
        const otherGoalTextControl = this.intakeForm.get('otherGoalText');
        if (isSelected) {
          otherGoalTextControl?.setValidators([Validators.required]);
        } else {
          otherGoalTextControl?.clearValidators();
          otherGoalTextControl?.setValue('');
        }
        otherGoalTextControl?.updateValueAndValidity();
      });
    }

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
      .map(goal => {
        // If "Other" is selected, append the text if provided
        if (goal.value === 'other' && formValue.otherGoalText) {
          return `other: ${formValue.otherGoalText}`;
        }
        return goal.value;
      });

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
      this.submitError = null;
      
      // Prepare data for backend submission
      const submissionData = this.prepareSubmissionData();

      const payload = {
        ...submissionData,
        // honeypot (must stay empty)
        website: this.intakeForm.value.website || ''
      };

      this.http.post<{ ok: boolean; message?: string }>('form.php', payload).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          if (!res?.ok) {
            this.submitError = res?.message || 'home.promotion.errors.submissionFailed';
            return;
          }

          this.showSuccessAnimation = true;

          // Show success animation for 1.5 seconds, then show message
          setTimeout(() => {
            this.showSuccessAnimation = false;
            this.isSubmitted = true;
            this.resetForm();

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
        },
        error: () => {
          this.isSubmitting = false;
          this.submitError = 'home.promotion.errors.submissionUnavailable';
        }
      });
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

  private resetForm(): void {
    const goalsControls = this.trainingGoals.map(() => this.fb.control(false));
    this.intakeForm.setControl('goals', this.fb.array(goalsControls));
    this.intakeForm.reset({
      plan: '',
      program: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      questions: '',
      otherGoalText: '',
      receiveCommunications: false,
      website: ''
    });
  }

  hasError(controlName: string): boolean {
    const control = this.intakeForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(controlName: string): string {
    const control = this.intakeForm.get(controlName);
    if (control?.hasError('required')) {
      return 'home.promotion.errors.required';
    }
    if (control?.hasError('email')) {
      return 'home.promotion.errors.email';
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

  isOtherSelected(): boolean {
    const otherIndex = this.trainingGoals.findIndex(g => g.value === 'other');
    if (otherIndex === -1) return false;
    return this.goalsFormArray.at(otherIndex)?.value === true;
  }

  exploreWebsite(): void {
    void this.router.navigate(['/']);
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  getProgramLink(): string {
    const selectedProgram = this.intakeForm.get('program')?.value;
    
    // Map program values to their routes
    const programRoutes: Record<string, string> = {
      'weight-loss-muscle-mass': '/programs/weight-loss-muscle-mass',
      'peak-performance': '/programs/peak-performance',
      'vitality-longevity': '/programs/vitality-longevity',
      'prenatal-postpartum': '/programs/prenatal-postpartum'
    };
    
    // If a program is selected, link to that specific program page
    // Otherwise, link to the general programs page
    return selectedProgram && programRoutes[selectedProgram] 
      ? programRoutes[selectedProgram] 
      : '/programs';
  }
}
