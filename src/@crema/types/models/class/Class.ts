export type TeacherType = {
    id: number;
    name: string;
  };
  
  export type SchoolType = {
    id: number;
    name: string;
  };
  
  export type DailyScheduleType = {
    id: number;
    class_id: number;
    schedule: string;
  };
  
  export type EatingScheduleType = {
    id: number;
    class_id: number;
    schedule: string;
  };
  
  export type ClassStudentType = {
    id: number;
    class_id: number;
    student_id: number;
    name: string;
  };
  
  export type AbsenceType = {
    id: number;
    class_id: number;
    student_id: number;
    date: string;
  };
  
  export type ClassType = {
    id: number;
    name: string;
    teacher_id: number;
    teacher: TeacherType;
    school_id: number;
    school: SchoolType;
    dailySchedules: DailyScheduleType[];
    eatingSchedules: EatingScheduleType[];
    classStudents: ClassStudentType[];
    absences: AbsenceType[];
    created_at: Date;
    updated_at: Date;
  };
