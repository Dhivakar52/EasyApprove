// Types
 export default interface Nomination {
  id: string;
  nominee: string;
  entity: string;
  category: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  progress: string;
}