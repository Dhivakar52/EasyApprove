// Types for Nomination workflow
export type NominationType = 'Travel Expenses' | 'Project';
export type NominationStatus = 'Pending' | 'In Review' | 'Under Review' | 'Approved' | 'Rejected';

export interface SupportingDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  dataUrl?: string;
}

export interface ReassignmentRecord {
  previousOwner: string;
  newOwner: string;
  reassignmentReason: string;
  reassignedBy: string;
  timestamp: string;
}

export interface TravelDetails {
  purpose: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelMode: string;
  estimatedCost: string;
  justification?: string;
}

export interface ProjectDetails {
  projectName: string;
  domain: string;
  projectRole: string;
  duration: string;
  teamSize?: string;
  impact: string;
  keyDeliverables?: string;
}

export default interface Nomination {
  id: string;
  nominee: string;
  entity: string;
  category: string;
  status: NominationStatus;
  progress?: string;
  title?: string;
  department?: string;
  nominationType?: NominationType;
  submittedDate?: string;
  assignedEmployee?: string;
  mobileNumber?: string;
  nomineeEmail?: string;
  managerEmail?: string;
  referrals?: string[];
  supportingDocuments?: SupportingDocument[];
  description?: string;
  travelDetails?: TravelDetails;
  projectDetails?: ProjectDetails;
  reassignmentHistory?: ReassignmentRecord[];
  originalSubmitter?: string;
  submittedBy?: string;
}