import FindChangeableCourses from './FindChangeableCourses.js'
import deepCopy from './deepCopy.js'

export default function TopSort(courses, hourRestrict, restrictedHour, creditRestrict, restrictedCredit,) {

    let isHourRestricted = 1;//课表是否满足学时限制，1满足0不满足
    let isCreditRestricted = 1;//课表是否满足学分限制，1满足0不满足
    let originCourses = deepCopy(courses);
    //利用拓扑排序进行求解
    let result = [];
    let semester_count = [];//记录每个学期有多少节课
    let st = [];//记录那些课程已经加入到结果当中
    for (let i = 0; i < courses.length; i++) st.push(0);//初始化

    //求解
    for (let i = 0; i < 8; i++) {
        //let result_this_semster = [];
        let qu = [];//用来存当前入度为0的点
        for (let j = 0; j < courses.length; j++) {
            if (courses[j].pre_course_count == 0 && !st[j]) {
                //result_this_semster.push(courses[j].name);
                qu.push(courses[j].name);
                st[j] = 1;
            }
        }
        if (!qu.length) break;
        semester_count.push(qu.length);
        //alert(qu);
        //result.push(qu[0]);
        for (let j = 0; j < qu.length; j++)
            result.push(qu[j]);
        while (qu.length) {
            let t = qu.pop();
            for (let j = 0; j < courses.length; j++) {
                for (let k = 0; k < courses[j].pre_courses.length; k++) {
                    let pre_course = courses[j].pre_courses[k];
                    if (t == pre_course) {
                        courses[j].pre_course_count--;
                        break;
                    }
                }
            }
        }
    }
    //如果课程需要调整

    let cnt = 0;
    let courses_ = [];//courses_[i]分别存放i学期有哪些课
    for (let i = 0; i < semester_count.length; i++) {
        courses_.push(result.slice(cnt, cnt + semester_count[i]));
        cnt += semester_count[i];
    }
    for (let i = semester_count.length; i < 8; i++) courses_[i] = [];

    let courses_Copy = deepCopy(courses_);

    function isHourRestrict() {
        let stHour = [];//表示八个学期每个学期课程是否超时限
        for (let i = 0; i < 8; i++) stHour.push(0);//初始化，0表示未超时限
        for (let i = 0; i < 8; i++) {//先找出八个学期哪个学期的学时超过限制
            let cntHour = 0;
            for (let j = 0; j < courses_[i].length; j++) {
                for (let k = 0; k < courses.length; k++) {
                    if (courses_[i][j] == courses[k].name) {
                        cntHour += courses[k].class_hour;
                        break;
                    }
                }
            }
            if (cntHour > Number(restrictedHour)) stHour[i] = 1;//如果当前学期的学时大于限制学时则将stHour[i]置1
        }
        return stHour;
    }

    function isCreditRestrict() {
        let stCredit = [];//表示八个学期每个学期课程是否超学分限
        for (let i = 0; i < 8; i++) stCredit.push(0);//初始化，0表示未超时限
        for (let i = 0; i < 8; i++) {//先找出八个学期哪个学期的学时超过限制
            let cntCredit = 0;
            for (let j = 0; j < courses_[i].length; j++) {
                for (let k = 0; k < courses.length; k++) {
                    if (courses_[i][j] == courses[k].name) {
                        cntCredit += courses[k].course_credit;
                        break;
                    }
                }
            }
            if (cntCredit > Number(restrictedCredit)) stCredit[i] = 1;//如果当前学期的学时大于限制学时则将stHour[i]置1
        }
        return stCredit;
    }

    if (hourRestrict == '是')//如果有学时限制
    {
        let ChangeableCourses = FindChangeableCourses(originCourses);
        let stHour = isHourRestrict();//表示八个学期每个学期课程是否超时限


        for (let i = 0; i < 8; i++) {
            if (stHour[i] == 0) continue;//如果当前学期课程无需调整则跳过

            let courseCanChange = [];//当前学期可以向后调整的课程
            for (let j = 0; j < courses_[i].length; j++) {
                for (let k = 0; k < ChangeableCourses.length; k++) {
                    if (courses_[i][j] == ChangeableCourses[k]) {
                        courseCanChange.push(ChangeableCourses[k]);
                    }
                }
            }
            //alert(courseCanChange);
            for (let k = 0; k < courseCanChange.length; k++) {
                let fg = 0;
                let newcourses_ = deepCopy(courses_);
                for (let i = 0; i < newcourses_.length; i++) {
                    for (let j = 0; j < newcourses_[i].length; j++)
                        if (courseCanChange[k] == newcourses_[i][j]) {
                            if (i + 1 < 8) {
                                newcourses_[i].splice(j, 1);
                                if (Array.isArray(newcourses_[i + 1]) && newcourses_[i + 1][0] == "暂无课程") {
                                    newcourses_[i + 1] = [courseCanChange[k]];
                                }
                                else if (Array.isArray(newcourses_[i + 1])) {
                                    newcourses_[i + 1].push(courseCanChange[k]);
                                }
                                else newcourses_[i + 1] = [courseCanChange[k]];
                            }

                            fg = 1;
                            break;
                        }
                    if (fg == 1) break;
                }
                courses_ = newcourses_;
                stHour = isHourRestrict();
                if (stHour[i] == 0) break;
            }

        }

        for (let i = 0; i < 8; i++)
            if (stHour[i] == 1) {
                isHourRestricted = 0;
                courses_ = courses_Copy;
                break;
            }
        courses_Copy = courses_
    }

    if (creditRestrict == '是')//如果有学分限制
    {
        let ChangeableCourses = FindChangeableCourses(originCourses);
        let stCredit = isCreditRestrict();//表示八个学期每个学期课程是否超时限


        for (let i = 0; i < 8; i++) {
            if (stCredit[i] == 0) continue;//如果当前学期课程无需调整则跳过

            let courseCanChange = [];//当前学期可以向后调整的课程
            for (let j = 0; j < courses_[i].length; j++) {
                for (let k = 0; k < ChangeableCourses.length; k++) {
                    if (courses_[i][j] == ChangeableCourses[k]) {
                        courseCanChange.push(ChangeableCourses[k]);
                    }
                }
            }
            //alert(courseCanChange);
            for (let k = 0; k < courseCanChange.length; k++) {
                let fg = 0;
                let newcourses_ = deepCopy(courses_);
                for (let i = 0; i < newcourses_.length; i++) {
                    for (let j = 0; j < newcourses_[i].length; j++)
                        if (courseCanChange[k] == newcourses_[i][j]) {
                            if (i + 1 < 8) {
                                newcourses_[i].splice(j, 1);
                                if (Array.isArray(newcourses_[i + 1]) && newcourses_[i + 1][0] == "暂无课程") {
                                    newcourses_[i + 1] = [courseCanChange[k]];
                                }
                                else if (Array.isArray(newcourses_[i + 1])) {
                                    newcourses_[i + 1].push(courseCanChange[k]);
                                }
                                else newcourses_[i + 1] = [courseCanChange[k]];
                            }

                            fg = 1;
                            break;
                        }
                    if (fg == 1) break;
                }
                courses_ = newcourses_;
                stCredit = isCreditRestrict();
                if (stCredit[i] == 0) break;
            }

        }

        for (let i = 0; i < 8; i++)
            if (stCredit[i] == 1) {
                isCreditRestricted = 0;
                courses_ = courses_Copy;
                break;
            }
        courses_Copy = courses;
    }


    return {
        result: result,
        semester_count: semester_count,
        courses_: courses_,
        isHourRestricted: isHourRestricted,
        isCreditRestricted: isCreditRestricted,
    };
}