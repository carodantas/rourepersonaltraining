# Intake Form Backend Integration Guide

This document describes the data structure and integration points for the intake form submission.

## Overview

The intake form collects client information and prepares it for backend submission. The data is structured to support both:
1. **Client confirmation email** - Sent to the client after submission
2. **Trainer notification email** - Sent to the team with intake details

## Data Structure

### IntakeFormSubmission Interface

```typescript
interface IntakeFormSubmission {
  clientDetails: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  intakeInformation: {
    interestedPlan: string;      // Values: 'duo-buddy', 'solo-standard', 'long-term', 'not-sure', ''
    interestedProgram: string;   // Values: 'weight-loss-muscle-mass', 'peak-performance', 'vitality-longevity', 'prenatal-postpartum', 'not-sure', ''
  };
  goals: string[];               // Array of selected goal values
  additionalNotes?: string;      // Optional client questions/notes
  receiveCommunications: boolean; // Marketing consent
  metadata?: {
    submittedAt: string;         // ISO 8601 timestamp
    source: string;              // Always 'website'
    userAgent?: string;           // Browser user agent
  };
}
```

## Field Values Reference

### Plan Values
- `'duo-buddy'` → "Duo / Buddy"
- `'solo-standard'` → "Solo Standard"
- `'long-term'` → "Long-Term"
- `'not-sure'` → "Not sure yet"
- `''` → Not specified

### Program Values
- `'weight-loss-muscle-mass'` → "Weight loss & muscle mass"
- `'peak-performance'` → "Peak performance"
- `'vitality-longevity'` → "Vitality & longevity"
- `'prenatal-postpartum'` → "Prenatal & postpartum"
- `'not-sure'` → "Not sure yet"
- `''` → Not specified

### Goal Values
- `'improve-health'` → "Improve my overall health"
- `'increase-flexibility'` → "Increase flexibility"
- `'improve-posture'` → "Improve posture"
- `'get-stronger'` → "Get stronger"
- `'feel-confident'` → "Feel more confident / improve my appearance"
- `'tone-shape'` → "Tone and shape my body"
- `'lose-weight'` → "Lose weight"
- `'other'` → "Other"

## Example Submission Data

```json
{
  "clientDetails": {
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+31 6 1234 5678",
    "email": "john.doe@example.com"
  },
  "intakeInformation": {
    "interestedPlan": "solo-standard",
    "interestedProgram": "weight-loss-muscle-mass"
  },
  "goals": [
    "lose-weight",
    "get-stronger",
    "improve-health"
  ],
  "additionalNotes": "I have a knee injury from 2 years ago. Can we work around it?",
  "receiveCommunications": true,
  "metadata": {
    "submittedAt": "2024-01-15T10:30:00.000Z",
    "source": "website",
    "userAgent": "Mozilla/5.0..."
  }
}
```

## Email Template Data

The component also provides formatted data for email templates via `getFormattedDataForEmails()`:

```typescript
{
  clientName: "John Doe",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "+31 6 1234 5678",
  email: "john.doe@example.com",
  interestedPlan: "Solo Standard",
  interestedProgram: "Weight loss & muscle mass",
  selectedGoals: [
    "Lose weight",
    "Get stronger",
    "Improve my overall health"
  ],
  goalsList: "Lose weight, Get stronger, Improve my overall health",
  additionalNotes: "I have a knee injury from 2 years ago. Can we work around it?",
  receiveCommunications: true
}
```

## Integration Steps

### 1. Update API Endpoint

In `intake-form.service.ts`, update the `apiUrl`:

```typescript
private apiUrl = 'https://your-api-domain.com/api/intake/submit';
```

### 2. Enable HTTP Client

Ensure `HttpClientModule` is imported in your app module or main component.

### 3. Update Component to Use Service

In `promotion.component.ts`, replace the simulated submission with:

```typescript
import { IntakeFormService } from './intake-form.service';

constructor(
  // ... existing dependencies
  private intakeService: IntakeFormService
) {}

onSubmit(): void {
  if (this.intakeForm.valid) {
    this.isSubmitting = true;
    const submissionData = this.prepareSubmissionData();
    
    this.intakeService.submitIntakeForm(submissionData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.showSuccessAnimation = true;
        // ... rest of success handling
      },
      error: (error) => {
        this.isSubmitting = false;
        // Handle error (show error message to user)
        console.error('Form submission error:', error);
      }
    });
  }
}
```

## Backend Requirements

Your backend API should:

1. **Accept POST requests** to the intake submission endpoint
2. **Validate the data** structure matches `IntakeFormSubmission`
3. **Store the intake request** in your database
4. **Send two emails**:
   - Client confirmation email (using formatted email data)
   - Trainer notification email (using raw submission data)
5. **Return a success response** (status 200/201)

## Email Templates

### Client Confirmation Email Variables

Use the formatted data from `getFormattedDataForEmails()`:
- `{{firstName}}` - Client's first name
- `{{clientName}}` - Full name
- `{{phoneNumber}}` - Phone number
- `{{email}}` - Email address
- `{{interestedPlan}}` - Plan label (e.g., "Solo Standard")
- `{{interestedProgram}}` - Program label (e.g., "Weight loss & muscle mass")

### Trainer Notification Email Variables

Use the raw submission data:
- `{{First name}}` - `clientDetails.firstName`
- `{{Last name}}` - `clientDetails.lastName`
- `{{Phone number}}` - `clientDetails.phoneNumber`
- `{{Email address}}` - `clientDetails.email`
- `{{Selected plan}}` - `intakeInformation.interestedPlan` (use `getPlanLabel()` for label)
- `{{Selected program}}` - `intakeInformation.interestedProgram` (use `getProgramLabel()` for label)
- `{{List of selected goals}}` - `goals` array (use `getGoalLabel()` for each)
- `{{Client message / questions}}` - `additionalNotes` or "No additional notes provided."

## Helper Functions

The interface file includes helper functions to convert values to labels:
- `getGoalLabel(value: string): string`
- `getPlanLabel(value: string): string`
- `getProgramLabel(value: string): string`

These can be used in your backend or email template system.

## Testing

To test the form submission:

1. Fill out the form with test data
2. Check browser console for logged submission data
3. Verify the data structure matches the interface
4. Once backend is ready, test actual API submission

## Notes

- All required fields are validated on the frontend
- Phone number format is not enforced (backend should validate)
- Email format is validated on frontend
- Goals array can be empty if no goals selected
- Additional notes are optional

