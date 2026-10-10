export interface PresidentNominee {
  nominee: string;
  entity: string;
  category: string;
  consolidatedScore: number;
  presidentScore: number;
  flag: string;
  finalStatus: "Winner" | "Runner-up";
}

export const MOCK_PRESIDENT_NOMINEES: PresidentNominee[] = [
  { nominee: "Ravi Kumar", entity: "SRMAP", category: "Innovation", consolidatedScore: 95, presidentScore: 96, flag: "✔", finalStatus: "Winner" },
  { nominee: "Riya Sharma", entity: "SRM Tech", category: "Service Excellence", consolidatedScore: 85, presidentScore: 92, flag: "✔", finalStatus: "Winner" },
  { nominee: "Amit Verma", entity: "SRM Media", category: "Talent", consolidatedScore: 90, presidentScore: 93, flag: "✔", finalStatus: "Winner" },
  { nominee: "Suresh Iyer", entity: "Puthiya Thalaimurai", category: "Customer Focus", consolidatedScore: 87, presidentScore: 90, flag: "✔", finalStatus: "Winner" },
  { nominee: "Sathish Kumar", entity: "SRMAP", category: "Leadership Excellence", consolidatedScore: 85, presidentScore: 87, flag: "✔", finalStatus: "Runner-up" },
  { nominee: "Balaji", entity: "SRM Research", category: "Best Innovation", consolidatedScore: 86, presidentScore: 89, flag: "✔", finalStatus: "Runner-up" },
  { nominee: "Kavitha Sundaram", entity: "SRM Hospital", category: "Clinical Impact", consolidatedScore: 92, presidentScore: 94, flag: "✔", finalStatus: "Winner" },
  { nominee: "Deepak Vishwanathan", entity: "SRM University", category: "Academic Mentor", consolidatedScore: 84, presidentScore: 86, flag: "✔", finalStatus: "Runner-up" },
  { nominee: "Sangeetha Jagadeesan", entity: "SRM Tech", category: "Digital Transformation", consolidatedScore: 91, presidentScore: 93, flag: "✔", finalStatus: "Winner" },
  { nominee: "Ramesh Kumar", entity: "SRM Holdings", category: "Strategic Initiative", consolidatedScore: 83, presidentScore: 85, flag: "✔", finalStatus: "Runner-up" },
  { nominee: "Priyanshu Nair", entity: "SRMAP", category: "Research Publications", consolidatedScore: 89, presidentScore: 91, flag: "✔", finalStatus: "Winner" },
  { nominee: "Murugesan Swamy", entity: "PT", category: "Broadcast Journalism", consolidatedScore: 82, presidentScore: 84, flag: "✔", finalStatus: "Runner-up" },
  { nominee: "Ergamreddy Natarajan", entity: "SRM MHS", category: "Healthcare Technology", consolidatedScore: 88, presidentScore: 90, flag: "✔", finalStatus: "Winner" },
  { nominee: "Suvetha Reddy", entity: "SRM Research", category: "AI Innovations", consolidatedScore: 93, presidentScore: 95, flag: "✔", finalStatus: "Winner" },
  { nominee: "Balaji Reddy", entity: "SRM Global", category: "International Partnership", consolidatedScore: 81, presidentScore: 83, flag: "✔", finalStatus: "Runner-up" },
  { nominee: "Aravind Swaminathan", entity: "SRMAP", category: "Faculty Excellence", consolidatedScore: 86, presidentScore: 88, flag: "✔", finalStatus: "Runner-up" },
];
