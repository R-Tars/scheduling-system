//找出哪些课程是可以调整的
export default function FindChangeableCourses(courses) {
    let ChangeableCourses = [];
    for (let i = 0; i < courses.length; i++) {
        let CurCourse = courses[i].name;
        let flag = true;
        for (let j = 0; j < courses.length; j++) {
            for (let k = 0; k < courses[j].pre_course_count; k++) {
                if (CurCourse == courses[j].pre_courses[k]) {
                    flag = false;
                    break;
                }
            }
            if (!flag) break;
        }
        if (flag) ChangeableCourses.push(CurCourse);
    }
    return ChangeableCourses;
}