
export enum Department {
  BRAND = '브랜드 사업부',
  MARKETING = '마케팅 사업부',
  DISTRIBUTION = '유통콘텐츠 사업부',
  CONCRETE = '콘크리트 파머스',
}


export interface Tool {
  id: string;
  department: Department;
  category: string;
  tool_name: string;
  description: string;
  logoUrl: string;
  manual_link: string;
  service_url: string;
  login_id: string;
  login_pw: string;
  memo: string;
  in_use: 'Y' | 'N';
  is_paid: 'Y' | 'N';
  order?: number;
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
  toolDepartment?: Department;
  userEmail: string;
  userName: string;
  content: string;
  createdAt: string;
  status: 'Pending' | 'Resolved';
}
