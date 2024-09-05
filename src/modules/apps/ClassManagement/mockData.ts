import { ClassDataType, ClassScheduleDataType, ClassStudentDataType, TeacherDataType } from '@/@crema/types/models/apps/ClassManagement';


export const sampleClassData: ClassDataType | any = {
  id: 1232,
  name: 'Magic Class',
  teacher_id: 1,
  teacher_name: 'Dumbledore',
  class_room: 'Room 1',
  school_year: '2021-2022',
};

export const sampleStudent: ClassStudentDataType = {
  id: 1,
  class_id: 1232,
  student_id: 1,
  name: 'Harry Potter',
  date_of_birth: '2010-07-31',
  gender: 'Male',
};

export const sampleTeacher: TeacherDataType = {
  id: 1,
  name: 'Dumbledore',
  gender: 'Male'
};

export const sampleClassSchedule: ClassScheduleDataType = {
    id: 1,
    start: '2024-08-24T08:30:00',
    end: '2024-08-24T09:00:00',
    title: 'Magic Class',
    class_id: 1232,
    class_name: 'Magic Class',
    teacher_id: 1,
    teacher_name: 'Dumbledore',
    location_id: 1,
    location_name: 'Room 1',
}

export const sampleClassScheduleList: ClassScheduleDataType[] = [
    sampleClassSchedule,
    {
        id: 2,
        start: '2024-08-21T08:30:00',
        end: '2024-08-21T09:00:00',
        title: 'Magic Class',
        class_id: 1232,
        class_name: 'Magic Class',
        teacher_id: 1,
        teacher_name: 'Dumbledore',
        location_id: 1,
        location_name: 'Room 1',
    }
];

export const sampleClassList: ClassDataType[] | any = [sampleClassData];

export const sampleStudentList: ClassStudentDataType[] = [sampleStudent];

export const sampleTeacherList: TeacherDataType[] = [sampleTeacher];
