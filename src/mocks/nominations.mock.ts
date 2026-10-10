import type Nomination from "../dataTypes/nomination";

export interface ApprovalNomination {
  id: string;
  nominee: string;
  entity: string;
  contest: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

export const MOCK_APPROVAL_NOMINATIONS: ApprovalNomination[] = [
  { id: "SELF-0851", nominee: "Ravi Kumar", entity: "SRMAP", contest: "Self Nomination", date: "07/20/2025", status: "Pending" },
  { id: "NOM-0321", nominee: "Ayesha Thomas", entity: "SRM MHS", contest: "Nominate Others", date: "07/18/2025", status: "Pending" },
  { id: "NOM-0456", nominee: "Varun Mishra", entity: "SRM Tech", contest: "Nominate Others", date: "07/15/2025", status: "Approved" },
  { id: "SELF-0852", nominee: "Fatima Noor", entity: "PT", contest: "Self Nomination", date: "07/10/2025", status: "Approved" },
  { id: "NOM-0458", nominee: "Priya Raj", entity: "SRM Sikkim", contest: "Nominate Others", date: "07/08/2025", status: "Rejected" },
  { id: "SELF-0856", nominee: "Arjun Patel", entity: "SRM Holdings", contest: "Self Nomination", date: "07/02/2025", status: "Approved" },
  { id: "NOM-0489", nominee: "Kavitha Sundaram", entity: "SRM University", contest: "Nominate Others", date: "06/28/2025", status: "Pending" },
  { id: "SELF-0891", nominee: "Siddharth Verma", entity: "SRM Tech", contest: "Self Nomination", date: "06/25/2025", status: "Approved" },
  { id: "NOM-0512", nominee: "Divya Nambiar", entity: "SRM Hospital", contest: "Nominate Others", date: "06/21/2025", status: "Pending" },
  { id: "SELF-0902", nominee: "Manoj Deshmukh", entity: "SRMAP", contest: "Self Nomination", date: "06/18/2025", status: "Rejected" },
  { id: "NOM-0533", nominee: "Sneha Mukherjee", entity: "SRM Research", contest: "Nominate Others", date: "06/15/2025", status: "Approved" },
  { id: "SELF-0914", nominee: "Gautam Krishna", entity: "SRM Global", contest: "Self Nomination", date: "06/11/2025", status: "Pending" },
  { id: "NOM-0557", nominee: "Ananya Roy", entity: "SRM Tech", contest: "Nominate Others", date: "06/08/2025", status: "Approved" },
  { id: "SELF-0925", nominee: "Karthik Raja", entity: "PT", contest: "Self Nomination", date: "06/05/2025", status: "Rejected" },
  { id: "NOM-0580", nominee: "Preethi Bala", entity: "SRM MHS", contest: "Nominate Others", date: "06/01/2025", status: "Approved" },
  { id: "SELF-0937", nominee: "Deepak Chawla", entity: "SRMAP", contest: "Self Nomination", date: "05/28/2025", status: "Pending" },
];

export const MOCK_NOMINATIONS: Nomination[] = [
  { id: "NOM-00123", nominee: "Ravi Kumar", entity: "SRMAP", category: "Business Excellence", status: "Pending", progress: "Stage 2" },
  { id: "NOM-00124", nominee: "Ayesha Thomas", entity: "SRM Hospital", category: "Service Excellence", status: "Approved", progress: "Stage 3" },
  { id: "NOM-00125", nominee: "Varun Mishra", entity: "SRM Tech", category: "Innovation", status: "Under Review", progress: "Stage 1" },
  { id: "NOM-00126", nominee: "Priya Das", entity: "SRMAP", category: "Leadership", status: "Rejected", progress: "Stage 2" },
  { id: "NOM-00127", nominee: "Arjun Nair", entity: "SRM Research", category: "Team Excellence", status: "Approved", progress: "Stage 3" },
  { id: "NOM-00128", nominee: "Sathish Kumar", entity: "SRM University", category: "Best Mentor", status: "Pending", progress: "Stage 1" },
  { id: "NOM-00129", nominee: "Meenakshi Sundaram", entity: "SRM Holdings", category: "Customer Focus", status: "Approved", progress: "Stage 2" },
  { id: "NOM-00130", nominee: "Vikram Seth", entity: "SRM Tech", category: "Innovation", status: "Approved", progress: "Stage 3" },
  { id: "NOM-00131", nominee: "Kiran Mazumdar", entity: "SRM MHS", category: "Healthcare Impact", status: "Under Review", progress: "Stage 1" },
  { id: "NOM-00132", nominee: "Rajesh Kannan", entity: "PT", category: "Media Excellence", status: "Pending", progress: "Stage 2" },
  { id: "NOM-00133", nominee: "Swetha Rao", entity: "SRMAP", category: "Young Achiever", status: "Approved", progress: "Stage 3" },
  { id: "NOM-00134", nominee: "Harish Kalyan", entity: "SRM Research", category: "Patent Pioneer", status: "Approved", progress: "Stage 2" },
  { id: "NOM-00135", nominee: "Nandhini Prasad", entity: "SRM Global", category: "Corporate Social Impact", status: "Pending", progress: "Stage 1" },
  { id: "NOM-00136", nominee: "Sanjay Singhania", entity: "SRM Tech", category: "Operational Excellence", status: "Rejected", progress: "Stage 2" },
  { id: "NOM-00137", nominee: "Pooja Hegde", entity: "SRM Hospital", category: "Patient Care", status: "Approved", progress: "Stage 3" },
  { id: "NOM-00138", nominee: "Aditya Roy", entity: "SRMAP", category: "Academic Mentor", status: "Under Review", progress: "Stage 1" },
];
