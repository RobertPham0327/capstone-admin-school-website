import {
  AbsenceDataType,
  ClassDataType,
  ClassStudentDataType,
  DailyScheduleDataType,
  EatingScheduleDataType,
  SchoolDataType,
  TeacherDataType,
} from '@crema/types/models/class/Class';
// Mock Data for Teachers
export const teachers: TeacherDataType[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Emily Johnson' },
];

// Mock Data for Schools
export const schools: SchoolDataType[] = [
  { id: 1, name: 'Greenwood High' },
  { id: 2, name: 'Maple Leaf School' },
  { id: 3, name: 'River Valley School' },
];

// Mock Data for DailySchedules
export const dailySchedules: DailyScheduleDataType[] = [
  { id: 1, class_id: 1, schedule: 'Math - 9:00 AM' },
  { id: 2, class_id: 1, schedule: 'Science - 10:00 AM' },
  { id: 3, class_id: 2, schedule: 'English - 9:00 AM' },
];

// Mock Data for EatingSchedules
export const eatingSchedules: EatingScheduleDataType[] = [
  { id: 1, class_id: 1, schedule: 'Breakfast - 8:00 AM' },
  { id: 2, class_id: 1, schedule: 'Lunch - 12:00 PM' },
  { id: 3, class_id: 2, schedule: 'Breakfast - 8:30 AM' },
];

// Mock Data for ClassStudents
export const classStudents: ClassStudentDataType[] = [
  { id: 1, class_id: 1, student_id: 1, name: 'Student A' },
  { id: 2, class_id: 1, student_id: 2, name: 'Student B' },
  { id: 3, class_id: 2, student_id: 3, name: 'Student C' },
];

// Mock Data for Absences
export const absences: AbsenceDataType[] = [
  { id: 1, class_id: 1, student_id: 1, date: '2023-01-01' },
  { id: 2, class_id: 1, student_id: 2, date: '2023-01-02' },
  { id: 3, class_id: 2, student_id: 3, date: '2023-01-03' },
];

// Mock Data for Classes
export const classes: ClassDataType[] = [
  {
    id: 1,
    name: 'Class A',
    teacher_id: 1,
    teacher: teachers[0],
    school_id: 1,
    school: schools[0],
    dailySchedules: dailySchedules.filter(ds => ds.class_id === 1),
    eatingSchedules: eatingSchedules.filter(es => es.class_id === 1),
    classStudents: classStudents.filter(cs => cs.class_id === 1),
    absences: absences.filter(a => a.class_id === 1),
    created_at: new Date('2023-01-01T00:00:00Z'),
    updated_at: new Date('2023-01-01T00:00:00Z'),
  },
  {
    id: 2,
    name: 'Class B',
    teacher_id: 2,
    teacher: teachers[1],
    school_id: 2,
    school: schools[1],
    dailySchedules: dailySchedules.filter(ds => ds.class_id === 2),
    eatingSchedules: eatingSchedules.filter(es => es.class_id === 2),
    classStudents: classStudents.filter(cs => cs.class_id === 2),
    absences: absences.filter(a => a.class_id === 2),
    created_at: new Date('2023-01-02T00:00:00Z'),
    updated_at: new Date('2023-01-02T00:00:00Z'),
  },
];
