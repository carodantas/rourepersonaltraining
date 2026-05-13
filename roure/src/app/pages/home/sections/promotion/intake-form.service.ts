import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IntakeFormSubmission } from './intake-form.interface';
import { environment } from '../../../../../environments/environment';

/**
 * Service for handling intake form submissions
 * Ready for backend API integration
 */
@Injectable({
  providedIn: 'root'
})
export class IntakeFormService {
  private apiUrl = this.buildApiUrl('form.php');

  constructor(private http: HttpClient) {}

  private buildApiUrl(path: string): string {
    const o = (environment.apiPublicOrigin ?? '').trim().replace(/\/$/, '');
    const p = path.replace(/^\//, '');
    return o ? `${o}/${p}` : `/${p}`;
  }

  /**
   * Submits intake form data to backend
   * @param data Form submission data
   * @returns Observable with API response
   */
  submitIntakeForm(data: IntakeFormSubmission): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, data, { headers });
  }

  /**
   * Alternative method if you need to send data in a different format
   * This can be customized based on your backend requirements
   */
  submitIntakeFormCustom(data: IntakeFormSubmission): Observable<any> {
    // Example: Transform data if backend expects different structure
    const payload = {
      client: {
        first_name: data.clientDetails.firstName,
        last_name: data.clientDetails.lastName,
        phone: data.clientDetails.phoneNumber,
        email: data.clientDetails.email
      },
      intake: {
        plan: data.intakeInformation.interestedPlan,
        program: data.intakeInformation.interestedProgram
      },
      goals: data.goals,
      notes: data.additionalNotes,
      marketing_consent: data.receiveCommunications,
      metadata: data.metadata
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, payload, { headers });
  }
}

