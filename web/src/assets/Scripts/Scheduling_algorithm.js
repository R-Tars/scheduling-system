class course_info {
    constructor(name, class_hour, pre_course_count, pre_courses) {
        this.name = name;//课程名称
        this.class_hour = class_hour;//课时
        this.pre_course_count = pre_course_count;//先修课数量，在拓扑排序中会改变，当作入度
        this.pre_courses = pre_courses;//先修课，用来存每门课都有哪些先修课
    }
}

//let res = [[1, 3], [2, 4]];
//alert(res);

//读入数据
let course_count = prompt('请输入课程数量：', '');
course_count = Number(course_count)
let courses = [];
for (let i = 1; i <= course_count; i++) {
    let name = prompt('请输入第' + i + '门课程的名称', '');

    let class_hour = prompt('请输入第' + i + '门课程的课时', '');
    class_hour = Number(class_hour);

    let pre_course_count = prompt('请输入第' + i + '门课程的先修课的数量', '');
    pre_course_count = Number(pre_course_count)

    let pre_courses = [];
    for (let j = 1; j <= pre_course_count; j++) {
        let pre_course = prompt('请输入第' + i + '门课程的第' + j + '门先修课', '');
        pre_courses.push(pre_course);
    }

    let course = new course_info(name, class_hour, pre_course_count, pre_courses)
    courses.push(course);

}

//for (let i = 0; i < course_count; i++) {
//    alert(courses[i].name);
//}

//利用拓扑排序进行求解
let result = [];
let semester_count = [];//记录每个学期有多少节课
let st = [];//记录那些课程已经加入到结果当中
for (let i = 0; i < course_count; i++) st.push(0);//初始化

//result.push(['语文', '数学'], ['物理', '化学']);
//alert(result[0][0]);
for (let i = 0; i < 8; i++) {
    //let result_this_semster = [];
    let qu = [];//用来存当前入度为0的点
    for (let j = 0; j < course_count; j++) {
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
        for (let j = 0; j < course_count; j++) {
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

//alert(st);

//输出结果
/*for (let i = 1; i <= 8; i++) {
    alert(result[i - 1]);
    //alert('第' + i + '学期的排课结果为' + String(result[i - 1]));
}*/
let cnt = 0;
let course_result = [];
for (let i = 0; i < semester_count.length; i++) {
    alert("第" + (i + 1) + "学期的课程为：" + result.slice(cnt, cnt + semester_count[i]));
    course_result.push(result.slice(cnt, cnt + semester_count[i]));
    cnt += semester_count[i];
}
//alert(result)