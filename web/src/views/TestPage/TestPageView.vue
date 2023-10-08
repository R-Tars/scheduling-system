<template>
    <ContentField>
        <div>
            测试页面：
        </div>

        课程数据录入：
        <div>
            <div class="card">
                <div class="card-body">
                    <div class="row g-3 align-items-center">
                        <div class="col-auto">
                            <label for="ClassName" class="col-form-label">课程名称：</label>
                        </div>
                        <div class="col-auto">
                            <input type="text" id="ClassName" class="form-control" v-model="ClassName" />
                        </div>

                        <div class="col-auto">
                            <label for="ClassHour" class="col-form-label">课程总课时：</label>
                        </div>
                        <div class="col-auto">
                            <input type="text" id="ClassHour" class="form-control" v-model="ClassHour">
                        </div>

                        <div class="col-auto">
                            <label for="PreCourseCount" class="col-form-label">课程先修课数量：</label>
                        </div>
                        <div class="col-auto">
                            <input type="text" id="PreCourseCount" class="form-control" v-model="PreCourseCount">
                        </div>
                    </div>
                    <div class="text1">
                        先修课：
                    </div>
                    <div class="pre">
                        <div class="row g-3 align-items-center">
                            <div class="col-auto">
                                <label for="Pre1" class="col-form-label">第一门：</label>
                            </div>
                            <div class="col-auto">
                                <input type="text" id="Pre1" class="form-control" v-model="Pre1">
                            </div>

                            <div class="col-auto">
                                <label for="Pre2" class="col-form-label">第二门：</label>
                            </div>
                            <div class="col-auto">
                                <input type="text" id="Pre2" class="form-control" v-model="Pre2">
                            </div>

                            <div class="col-auto">
                                <label for="Pre3" class="col-form-label">第三门：</label>
                            </div>
                            <div class="col-auto">
                                <input type="text" id="Pre3" class="form-control" v-model="Pre3">
                            </div>

                            <div class="col-auto">
                                <label for="Pre4" class="col-form-label">第四门：</label>
                            </div>
                            <div class="col-auto">
                                <input type="text" id="Pre4" class="form-control" v-model="Pre4">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button1">
                    <button class="btn btn-primary" @click="addCourse">添加</button>
                </div>
            </div>
        </div>

        <div>
            <div class="card">
                <div class="card-body">
                    已经添加的课程数量：{{ output }}
                </div>
            </div>
        </div>

        <button type="button" class="btn btn-primary" @click="executeScript">运行排课程序</button>

        <div>
            <div class="card">
                <div class="card-body">
                    <div class="title">
                        输出结果：
                    </div>
                    <CourseTable :courses="courses">
                    </CourseTable>
                </div>
            </div>
        </div>

    </ContentField>
</template>

<script>
import ContentField from '../../components/ContentField.vue'
import CourseTable from '../../components/CourseTable'
import course_info from '../../assets/Scripts/CourseClass.js'
import TopSort from '../../assets/Scripts/TopSort.js'
//import { reactive } from 'vue';
import { ref } from 'vue';



let course_result = [];
let CourseAdd = []

export default {

    name: "CourseResult",
    components: {
        ContentField,
        CourseTable,
    },
    data() {
        return {
            ClassName: '',
            ClassHour: '',
            PreCourseCount: '',
            Pre1: '',
            Pre2: '',
            Pre3: '',
            Pre4: '',
            output: 0,
        };
    },
    setup() {
        const courses = ref({
            course1: "暂无课程",
            course2: "暂无课程",
            course3: "暂无课程",
            course4: "暂无课程",
            course5: "暂无课程",
            course6: "暂无课程",
            course7: "暂无课程",
            course8: "暂无课程",

        });

        const updateData = () => {
            courses.value = {
                course1: course_result[0],
                course2: course_result[1],
                course3: course_result[2],
                course4: course_result[3],
                course5: course_result[4],
                course6: course_result[5],
                course7: course_result[6],
                course8: course_result[7],
            };
        }
        return {
            courses,
            updateData,
        }
    },

    methods: {
        executeScript() {
            let CourseAddCopy = CourseAdd;
            let res = TopSort(CourseAddCopy);
            let cnt = 0;
            for (let i = 0; i < res.semester_count.length; i++) {
                course_result.push(res.result.slice(cnt, cnt + res.semester_count[i]));
                cnt += res.semester_count[i];
            }
            //alert(res.result);
            //alert(res.semester_count);
            //alert(course_result);
            for (let i = res.semester_count.length; i < 8; i++) course_result[i] = "暂无课程";
            this.updateData();
            alert('排课程序已运行完成！');
            //alert(course_result);
            // alert(CourseAdd.length);
            // alert(res.result);
            // alert(CourseAdd[1].name);
            // alert(CourseAdd[1].pre_courses)
        },
        addCourse() {
            let PreCourses = [];
            if (Number(this.PreCourseCount) >= 1) PreCourses.push(this.Pre1);
            if (Number(this.PreCourseCount) >= 2) PreCourses.push(this.Pre2);
            if (Number(this.PreCourseCount) >= 3) PreCourses.push(this.Pre3);
            if (Number(this.PreCourseCount) >= 4) PreCourses.push(this.Pre4);
            let course = new course_info(this.ClassName, Number(this.ClassHour), Number(this.PreCourseCount), PreCourses);
            CourseAdd.push(course);
            this.output = CourseAdd.length;

        }
    }
}





</script>

<style scoped>
.card {
    margin-top: 20px
}

.btn {
    margin-top: 15px
}
</style>