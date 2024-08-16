export type TeacherDataType = {
  id: number;
  name: string;
};

export type SchoolDataType = {
  id: number;
  name: string;
};

export type DailyScheduleDataType = {
  id: number;
  class_id: number;
  schedule: string;
};

export type EatingScheduleDataType = {
  id: number;
  class_id: number;
  schedule: string;
};

export type ClassStudentDataType = {
  id: number;
  class_id: number;
  student_id: number;
  name: string;
};

export type AbsenceDataType = {
  id: number;
  class_id: number;
  student_id: number;
  date: string;
};

export type ClassDataType = {
  id: number;
  name: string;
  teacher_id: number;
  teacher: TeacherDataType;
  school_id: number;
  school: SchoolDataType;
  dailySchedules: DailyScheduleDataType[];
  eatingSchedules: EatingScheduleDataType[];
  classStudents: ClassStudentDataType[];
  absences: AbsenceDataType[];
  created_at: Date;
  updated_at: Date;
};

export type FilterDataType = {
  name?: string | null;
  teacher?: TeacherDataType | null;
  school?: SchoolDataType | null;
  student?: ClassStudentDataType | null;
  page?: number | string;
};
