export interface RecognitionItem {
  id: string;
  awardName: string;
  winner: string;
  certificateIssued: boolean;
}

export interface AwardCategoryItem {
  id: string;
  name: string;
  description: string;
}

export const MOCK_RECOGNITIONS: RecognitionItem[] = [
  { id: "1", awardName: "Best Research Faculty", winner: "Dr. R. Shankar", certificateIssued: true },
  { id: "2", awardName: "Academic Excellence Award", winner: "Ms. Priya Rajan", certificateIssued: true },
  { id: "3", awardName: "Best Mentor – IT Dept.", winner: "Mr. S. Karthikeyan", certificateIssued: true },
  { id: "4", awardName: "Young Achiever – Student", winner: "Anjali Krishnan", certificateIssued: false },
  { id: "5", awardName: "Innovation in Teaching", winner: "Dr. N. Selvam", certificateIssued: true },
  { id: "6", awardName: "Best Department Coordinator", winner: "Mrs. Keerthi R", certificateIssued: true },
  { id: "7", awardName: "Rising Star – ECE Dept.", winner: "Rahul Suresh", certificateIssued: false },
  { id: "8", awardName: "Distinguished Service Award", winner: "Dr. M. K. Venkat", certificateIssued: true },
  { id: "9", awardName: "Outstanding Clinician Award", winner: "Dr. Deepa Menon", certificateIssued: true },
  { id: "10", awardName: "Pioneer in Nanotechnology", winner: "Prof. S. R. Natarajan", certificateIssued: false },
  { id: "11", awardName: "Community Impact Champion", winner: "Mrs. V. Gomathi", certificateIssued: true },
  { id: "12", awardName: "Excellence in Administration", winner: "Mr. K. Annamalai", certificateIssued: true },
  { id: "13", awardName: "Emerging Researcher Fellowship", winner: "Dr. Swati Pillai", certificateIssued: false },
  { id: "14", awardName: "Student Leadership Trophy", winner: "Gautham Siddharth", certificateIssued: true },
  { id: "15", awardName: "Lifetime Achievement Honor", winner: "Prof. K. R. Ramachandran", certificateIssued: true },
  { id: "16", awardName: "Green Campus Initiative Award", winner: "Mr. T. Dinesh Kumar", certificateIssued: false },
];

export const MOCK_AWARD_CATEGORIES: AwardCategoryItem[] = [
  { id: "1", name: "Best Innovator", description: "Top innovation and creativity award across all campuses" },
  { id: "2", name: "Young Talent", description: "Recognizing early-career professionals and emerging leaders" },
  { id: "3", name: "Service Excellence", description: "Honoring customer focus, operational speed, and team impact" },
  { id: "4", name: "Leadership Excellence", description: "Inspiring teams, executing strategies, and driving growth" },
  { id: "5", name: "Outstanding Contributor", description: "High-impact individuals driving cross-departmental success" },
  { id: "6", name: "Rising Star", description: "Promising new employees demonstrating steep learning curves" },
  { id: "7", name: "Academic Mentorship", description: "Guiding scholars, students, and junior faculty to high honors" },
  { id: "8", name: "Research Vanguard", description: "Top published citations, clinical trials, and technology patents" },
  { id: "9", name: "Corporate Social Impact", description: "Significant contributions to green initiatives and social causes" },
  { id: "10", name: "Patient Care Champion", description: "Highest compassion, responsiveness, and clinical satisfaction" },
  { id: "11", name: "Digital Transformation Pioneer", description: "Modernizing legacy systems through automated workflows" },
  { id: "12", name: "Excellence in Collaboration", description: "Uniting multidisciplinary teams across institution boundaries" },
];
