export default class course_info {
    constructor(name = '', class_hour = '', pre_course_count = '', pre_courses = '', course_credit = '') {
        this.name = name;//课程名称
        this.class_hour = class_hour;//课时
        this.pre_course_count = pre_course_count;//先修课数量，在拓扑排序中会改变，当作入度
        this.pre_courses = pre_courses;//先修课，用来存每门课都有哪些先修课
        this.course_credit = course_credit;
    }
}

