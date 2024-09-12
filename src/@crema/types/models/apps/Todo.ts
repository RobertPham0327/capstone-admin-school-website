export type FolderObjType = {
  id: number;
  name: string;
  alias: string;
  icon?: string;
};

export type LabelObjType = {
  id: number;
  name: string;
  alias: string;
  label: string;
  value: string;
  color: string;
};

export type PriorityObjType = {
  id: number;
  name: string;
  type: number;
  color: string;
};

export type StaffObjType = {
  id: number;
  name: string;
  image: string;
};

export type StatusObjType = {
  id: number;
  name: string;
  type: number;
};

export type CommentObjType = {
  comment: string;
  name: string;
  image: string;
  date: string;
  time?: string;
};

export type TodoObjType = {
  id: number;
  user_id: number;
  school_id: number;
  title: string;
  message: string;
  status: 'unread' | 'read'; // Based on the provided example
  notification_type: 'notification'; // You can expand this based on different types
  created_at: string;
};

