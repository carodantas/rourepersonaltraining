/**
 * Interface for Intake Form Submission Data
 * Ready for backend API integration
 */
export interface IntakeFormSubmission {
  // Client Details
  clientDetails: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };

  // Intake Information
  intakeInformation: {
    interestedPlan: string;
    interestedProgram: string;
  };

  // Training Goals (array of selected goal values)
  goals: string[];

  // Additional Notes
  additionalNotes?: string;

  // Marketing Consent
  receiveCommunications: boolean;

  // Metadata
  metadata?: {
    submittedAt: string;
    source: string;
    userAgent?: string;
  };
}

/**
 * Helper function to get goal label from value
 */
export function getGoalLabel(value: string): string {
  const goalMap: Record<string, string> = {
    'improve-health': 'Improve my overall health',
    'increase-flexibility': 'Increase flexibility',
    'improve-posture': 'Improve posture',
    'get-stronger': 'Get stronger',
    'feel-confident': 'Feel more confident / improve my appearance',
    'tone-shape': 'Tone and shape my body',
    'lose-weight': 'Lose weight',
    'other': 'Other'
  };
  return goalMap[value] || value;
}

/**
 * Helper function to get plan label from value
 */
export function getPlanLabel(value: string): string {
  const planMap: Record<string, string> = {
    'duo-buddy': 'Duo / Buddy',
    'solo-standard': 'Solo Standard',
    'long-term': 'Long-Term',
    'not-sure': 'Not sure yet',
    '': 'Not specified'
  };
  return planMap[value] || value;
}

/**
 * Helper function to get program label from value
 */
export function getProgramLabel(value: string): string {
  const programMap: Record<string, string> = {
    'weight-loss-muscle-mass': 'Weight loss & muscle mass',
    'peak-performance': 'Peak performance',
    'vitality-longevity': 'Vitality & longevity',
    'prenatal-postpartum': 'Prenatal & postpartum',
    'not-sure': 'Not sure yet',
    '': 'Not specified'
  };
  return programMap[value] || value;
}

