export interface JuryNominee {
  name: string;
  entity: string;
  category: string;
  score: number;
  flag?: boolean;
}

export interface JuryPanelMember {
  id: string;
  name: string;
  entity: string;
  role: "Business" | "General";
}

export interface JuryRoleMapItem {
  id: string;
  juryMember: string;
  mappedEntity: string;
  category: string;
}

export const MOCK_JURY_EVALUATION: JuryNominee[] = [
  { name: "Ravi Kumar", entity: "SRMAP", category: "Innovation", score: 95 },
  { name: "Riya Sharma", entity: "SRM Tech", category: "Service Excellence", score: 85 },
  { name: "Amit Verma", entity: "SRM Media", category: "Talent", score: 70, flag: true },
  { name: "Suresh Iyer", entity: "Puthiya Thalaimurai", category: "Customer Focus", score: 82 },
  { name: "Sathish Kumar", entity: "SRMAP", category: "Leadership Excellence", score: 80 },
  { name: "Balaji", entity: "SRM Research", category: "Best Innovation", score: 84 },
  { name: "Manikandan", entity: "SRM Research", category: "Service", score: 82 },
  { name: "Prakash", entity: "SRM Research", category: "Customer Focus", score: 80 },
  { name: "Kumaran", entity: "SRM Research", category: "Best Innovation", score: 86 },
  { name: "Deepa Menon", entity: "SRM Hospital", category: "Clinical Care", score: 91 },
  { name: "Ashok Sundaram", entity: "SRM Global", category: "Global Outreach", score: 88 },
  { name: "Meena Natarajan", entity: "SRM Tech", category: "Cloud Architecture", score: 79, flag: true },
  { name: "Girish Kulkarni", entity: "SRMAP", category: "Data Science", score: 93 },
  { name: "Pavithra Sekar", entity: "PT", category: "Journalism Excellence", score: 87 },
  { name: "Vigneshwaran R", entity: "SRM University", category: "Sports Leadership", score: 85 },
  { name: "Gayathri S", entity: "SRM MHS", category: "Diagnostics Pioneer", score: 89 },
];

export const MOCK_JURY_MEMBERS: JuryPanelMember[] = [
  { id: "1", name: "Dr. Ramesh Kumar", entity: "SRM Hospital", role: "Business" },
  { id: "2", name: "Prof. Anitha Rao", entity: "SRM University", role: "General" },
  { id: "3", name: "Mr. S. Venkatesh", entity: "Global Holdings", role: "Business" },
  { id: "4", name: "Ms. Divya Shankar", entity: "SRM Tech", role: "General" },
  { id: "5", name: "Dr. Rajiv Menon", entity: "Puthiya Thalaimurai", role: "Business" },
  { id: "6", name: "Mr. Arvind Kumar", entity: "SRM MHS", role: "General" },
  { id: "7", name: "Dr. Malini Subramanian", entity: "SRMAP", role: "Business" },
  { id: "8", name: "Prof. Chandrashekar", entity: "SRM Research", role: "General" },
  { id: "9", name: "Ms. Sunita Krishnan", entity: "SRM Holdings", role: "Business" },
  { id: "10", name: "Dr. Mohan Babu", entity: "SRM University", role: "General" },
  { id: "11", name: "Mr. Pradeep Joy", entity: "SRM Tech", role: "Business" },
  { id: "12", name: "Mrs. Revathi Raman", entity: "PT", role: "General" },
  { id: "13", name: "Dr. K. S. Narayanan", entity: "SRM Hospital", role: "Business" },
  { id: "14", name: "Prof. Vidya Sagar", entity: "SRMAP", role: "General" },
];

export const MOCK_JURY_MAPPINGS: JuryRoleMapItem[] = [
  { id: "1", juryMember: "Dr. Ramesh Kumar", mappedEntity: "SRM Hospital", category: "Service Excellence" },
  { id: "2", juryMember: "Prof. Anitha Rao", mappedEntity: "SRM University", category: "Leadership" },
  { id: "3", juryMember: "Mr. S. Venkatesh", mappedEntity: "Global Holdings", category: "Innovation Awards" },
  { id: "4", juryMember: "Ms. Divya Shankar", mappedEntity: "SRM Tech", category: "Service Excellence" },
  { id: "5", juryMember: "Dr. Rajiv Menon", mappedEntity: "Puthiya Thalaimurai", category: "Service Excellence" },
  { id: "6", juryMember: "Mr. Arvind Kumar", mappedEntity: "SRM MHS", category: "Customer Focus" },
  { id: "7", juryMember: "Dr. Malini Subramanian", mappedEntity: "SRMAP", category: "Research Impact" },
  { id: "8", juryMember: "Prof. Chandrashekar", mappedEntity: "SRM Research", category: "Innovation Awards" },
  { id: "9", juryMember: "Ms. Sunita Krishnan", mappedEntity: "SRM Holdings", category: "Team Excellence" },
  { id: "10", juryMember: "Dr. Mohan Babu", mappedEntity: "SRM University", category: "Academic Mentor" },
  { id: "11", juryMember: "Mr. Pradeep Joy", mappedEntity: "SRM Tech", category: "Digital Transformation" },
  { id: "12", juryMember: "Mrs. Revathi Raman", mappedEntity: "PT", category: "Content Innovation" },
  { id: "13", juryMember: "Dr. K. S. Narayanan", mappedEntity: "SRM Hospital", category: "Clinical Impact" },
  { id: "14", juryMember: "Prof. Vidya Sagar", mappedEntity: "SRMAP", category: "Student Empowerment" },
];
