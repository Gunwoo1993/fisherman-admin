
export enum AnswerType {
  YES_NO = 'YES_NO',
  CHECKBOX = 'CHECKBOX',
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  IMAGE = 'IMAGE',
  TASK_SELECT = 'TASK_SELECT',
  CAGE_SELECT = 'CAGE_SELECT' // 배정된 가두리 중 선택하는 타입 추가
}

export interface Fisherman {
  id: string;
  password?: string;
  name: string;
  phone?: string;
  corporation?: string;
  cage_number?: string;
  product_type?: string;
  created_at?: string;
}

export interface LogTemplateItem {
  id: string;
  question: string;
  type: AnswerType;
  options?: string[]; // 체크박스용 옵션
  isRequired: boolean;
  parentId?: string; // 부모 문항 ID
  showOnValue?: boolean | string; // 부모 문항이 이 값일 때만 표시
}

export interface LogTemplate {
  id: string;
  title: string;
  items: LogTemplateItem[];
  is_active: boolean;
  created_at: string;
}

export interface WorkLogEntry {
  question: string;
  value: any;
}

export interface WorkLog {
  id: string;
  fisherman_id: string;
  template_id: string;
  title: string;
  cage_number: string;
  entries: WorkLogEntry[];
  note?: string;
  submitted_at: string;
}
