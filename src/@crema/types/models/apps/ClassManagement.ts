export type TeacherDataType = {
  id: number;
  name: string;
  gender: string;
  contact: string;
  avatar_url?: string;
};

export type TeacherProfileDataType = {
  id: number,
  name: string,
  contact: string,
  school_name: string,
  avatar_url?: string,
  class_list?: any[]
}

export type SchoolDataType = {
  id: number;
  name: string;
};

export type ClassStudentDataType = {
  id: number;
  class_id: number;
  student_id: number;
  name: string;
  gender: string;
  date_of_birth: string;
};

export type StudentProfileDataType = {
  id: number,
  student_id: number,
  student_name: string,
  gender: string,
  date_of_birth: string,
  school_name: string,
  class_name?: string,
  school_year?: string,
  parent_name: string,
  parent_phone: string,
  avatar_url?: string;
}

export type ClassDataType = {
  id: number;
  name: string;
  teacher_id: number;
  teacher_name: string;
  class_room: string;
  school_year: string;
};

export type ClassProfileDataType = {
  teacher_id: number;
  teacher_name: string;
  teacher_avatar?: string;
  class_name: string;
  class_room: string;
  school_year: string;
  studentList: ClassStudentDataType[];
}

export type ClassScheduleDataType = {
  id: number;
  start: string;
  end: string;
  title: string;
  class_id: number;
  class_name: string;
  teacher_id: number;
  teacher_name: string;
  location_id: number;
  location_name: string;
  media?: string[];
};

export type EatingScheduleDataType = {
  id: number;
  start: string;
  end: string;
  title: string;
  class_id: number;
  class_name: string;
  location_id: number;
  location_name: string;
  menu: string[];
  nutrition: string[];
  media?: string[];
};

export type FilterDataType = {
  name?: string | null;
  teacher?: TeacherDataType | null;
  school?: SchoolDataType | null;
  student?: ClassStudentDataType | null;
  page?: number | string;
};





