export default function TopSort(courses) {
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

    return {
        result: result,
        semester_count: semester_count
    };
}