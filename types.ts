
export enum Department {
  BRAND = '브랜드 사업부',
  MARKETING = '마케팅 사업부',
  DISTRIBUTION = '유통콘텐츠 사업부',
  CONCRETE = '콘크리트 파머스',
}

export interface AccountInfo {
  id: string;
  accountId: string;
  accountPw: string;
  twoFactorNote: string;
  creatorName: string;
  // Financial/Admin details
  paymentType?: string;
  cost?: string;
  cardName?: string;
  cardNum?: string;
  cardPw?: string;
  paymentDate?: string;
  connectedAccount?: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  linkUrl: string;
  manualUrl: string;
  department: Department;
  purpose: string;
  category: string; // e.g., 'AI', 'General'
  accounts: AccountInfo[];
  isManaged?: boolean; // New field: If true, hides credentials for general users
  order?: number; // For sorting
}

export interface User {
  email: string;
  name: string;
  avatar: string;
  isAdmin: boolean;
  isSystem: boolean;
}

export interface Inquiry {
  id: string;
  type: 'Deletion' | 'Correction';
  toolId: string;
  toolName: string;
  userEmail: string;
  userName: string;
  content: string;
  createdAt: string;
  status: 'Pending' | 'Resolved';
}
