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
  gender: string;
  date_of_birth: string;
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
  created_at: String;
  updated_at: String;
};

export type FilterDataType = {
  name?: string | null;
  teacher?: TeacherDataType | null;
  school?: SchoolDataType | null;
  student?: ClassStudentDataType | null;
  page?: number | string;
};

export const sampleStudentList1: ClassStudentDataType[] = [
  {
    id: 1,
    class_id: 1,
    student_id: 1,
    name: 'Student 1',
    gender: 'female',
    date_of_birth: '2021-01-01',
  },
  {
    id: 2,
    class_id: 1,
    student_id: 2,
    name: 'Student 2',
    gender: 'male',
    date_of_birth: '2021-01-01',
  },
];

export const sampleStudentList2: ClassStudentDataType[] = [
  {
    id: 3,
    class_id: 2,
    student_id: 3,
    name: 'Student 3',
    gender: 'male',
    date_of_birth: '2021-01-01',
  },
  {
    id: 4,
    class_id: 2,
    student_id: 4,
    name: 'Student 4',
    gender: 'male',
    date_of_birth: '2021-01-01',
  },
]

export const sampleStudentList3: ClassStudentDataType[] = [
  {
    id: 5,
    class_id: 3,
    student_id: 3,
    name: 'Student 5',
    gender: 'male',
    date_of_birth: '2021-01-01',
  },
  {
    id: 6,
    class_id: 3,
    student_id: 6,
    name: 'Student 6',
    gender: 'male',
    date_of_birth: '2021-01-01',
  },
]

export const sampleTeacher1: TeacherDataType = {
  id: 1,
  name: 'Dumbledore',
};

export const sampleTeacher2: TeacherDataType = {
  id: 2,
  name: 'Robin Hood',
};

export const sampleTeacher3: TeacherDataType = {
  id: 3,
  name: 'Optimus Prime',
};

export const sampleClassList: ClassDataType[] = [
  {
    id: 1,
    name: 'Magic Class',
    teacher_id: 1,
    teacher: sampleTeacher1,
    school_id: 1,
    school: {
      id: 1,
      name: 'School 1',
    },
    dailySchedules: [
      {
        id: 1,
        class_id: 1,
        schedule: '8:00 - 10:00',
      },
      {
        id: 2,
        class_id: 1,
        schedule: '10:00 - 12:00',
      },
    ],
    eatingSchedules: [
      {
        id: 1,
        class_id: 1,
        schedule: '12:00 - 13:00',
      },
    ],
    classStudents: sampleStudentList1,
    absences: [
      {
        id: 1,
        class_id: 1,
        student_id: 1,
        date: '2021-01-01',
      },
    ],
    created_at: "2024-08-21",
    updated_at: "2024-08-21",
  },
  {
    id: 2,
    name: 'Thieves Guild',
    teacher_id: 2,
    teacher: sampleTeacher2,
    school_id: 2,
    school: {
      id: 2,
      name: 'School 2',
    },
    dailySchedules: [
      {
        id: 3,
        class_id: 2,
        schedule: '8:00 - 10:00',
      },
      {
        id: 4,
        class_id: 2,
        schedule: '10:00 - 12:00',
      },
    ],
    eatingSchedules: [
      {
        id: 2,
        class_id: 2,
        schedule: '12:00 - 13:00',
      },
    ],
    classStudents: sampleStudentList2,
    absences: [
      {
        id: 2,
        class_id: 2,
        student_id: 3,
        date: '2021-01-01',
      },
    ],
    created_at: "2024-08-21",
    updated_at: "2024-08-21",
  },
  {
    id: 3,
    name: 'Autobots',
    teacher_id: 2,
    teacher: sampleTeacher3,
    school_id: 2,
    school: {
      id: 2,
      name: 'School 2',
    },
    dailySchedules: [
      {
        id: 3,
        class_id: 2,
        schedule: '8:00 - 10:00',
      },
      {
        id: 4,
        class_id: 2,
        schedule: '10:00 - 12:00',
      },
    ],
    eatingSchedules: [
      {
        id: 2,
        class_id: 2,
        schedule: '12:00 - 13:00',
      },
    ],
    classStudents: sampleStudentList3,
    absences: [
      {
        id: 2,
        class_id: 2,
        student_id: 3,
        date: '2021-01-01',
      },
    ],
    created_at: "2024-08-21",
    updated_at: "2024-08-21",
  }
];

export const sampleStudent: ClassStudentDataType = {
  id: 1,
  class_id: 1,
  student_id: 1,
  name: 'Student 1',
  gender: 'male',
  date_of_birth: '2021-01-01',
};




