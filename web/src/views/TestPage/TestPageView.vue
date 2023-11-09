<template>
    <ContentField>
        <div>
            测试页面：
        </div>

        <div>
            <div class="card">
                <div class="card-body">
                    课程数据录入：
                    <div class="row g-2 align-items-center">
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

                    <div class="row g-3 align-items-center">

                        <div class="col-auto">
                            <label for="PreCourseCount" class="col-form-label">课程总学分：</label>
                        </div>
                        <div class="col-auto">
                            <input type="text" id="CourseCredit" class="form-control" v-model="CourseCredit">
                        </div>
                    </div>

                    先修课：

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

                        </div>

                        <div class="row g-3 align-items-center">
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
                <div class="title">
                    已经添加的课程数量：{{ CourseCount }}
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label">请选择输入文件：</label>
                    <input class="form-control" type="file" id="formFile" @change="handleFileUpload">
                </div>
                <div class="button1">
                    <button class="btn btn-primary" @click="readFileContent">读取文件内容</button>
                </div>

                <CourseAddTable :CourseInfo="CourseInfo">
                </CourseAddTable>
            </div>
        </div>

        <button type="button" class="btn btn-primary" @click="executeScript">运行排课程序</button>

        <div>
            <div class="card">
                <div class="card-body">
                    <!-- <div class="title">
                        可往后调整的课程有：
                        <span v-if="ChangeableCourses.length > 0">{{ ChangeableCourses.join(', ') }}</span>
                        <span v-else>无</span>
                        <br>
                        请选择要调整的课程:
                    </div> -->
                    <ChangeableCoursesList :ChangeableCourses="ChangeableCourses" :courses="courses"
                        :CourseAdd="CourseInfo">
                    </ChangeableCoursesList>

                    <!-- <CourseTable :courses="courses">
                    </CourseTable> -->

                </div>
            </div>
        </div>

        <div>
            <div class="card">
                <div class="card-body">
                    课程拓扑图如下：
                    <TopoGraph>
                    </TopoGraph>
                </div>
            </div>
        </div>
    </ContentField>
</template>

<script>
import ContentField from '../../components/ContentField.vue'
//import CourseTable from '../../components/CourseTable'
import course_info from '../../assets/Scripts/CourseClass.js'
import TopSort from '../../assets/Scripts/TopSort.js'
import deepCopy from '../../assets/Scripts/deepCopy.js'
import FindChangeableCourses from '../../assets/Scripts/FindChangeableCourses.js'
import CourseAddTable from '../../components/CourseAddTable.vue'
import ChangeableCoursesList from '../../components/ChangeableCoursesList.vue'
import TopoGraph from '../../components/TopoGraph.vue'
//import { reactive } from 'vue';
import { ref } from 'vue';



let course_result = [];
let CourseAdd = [];
let ChangeableCourses_ = [];



export default {

    name: "CourseResult",
    components: {
        ContentField,
        //CourseTable,
        CourseAddTable,
        ChangeableCoursesList,
        TopoGraph,
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
            CourseCredit: '',
            CourseCount: 0,
            selectedFile: null,
            fileContent: null,
            ChangeableCourses_: []
        };
    },




    setup() {
        const CourseInfo = ref([])

        const CourseUpdate = () => {
            CourseInfo.value = CourseAdd
        }

        const ChangeableCourses = ref([])

        const ChangeableCoursesUpdate = () => {
            ChangeableCourses.value = ChangeableCourses_;
        }

        const courses = ref([
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ]);

        const updateData = () => {//更新表格中显示的数据
            courses.value = [
                course_result[0],
                course_result[1],
                course_result[2],
                course_result[3],
                course_result[4],
                course_result[5],
                course_result[6],
                course_result[7],
                course_result[8],
            ];
        }
        return {
            courses,
            updateData,
            CourseInfo,
            CourseUpdate,
            ChangeableCoursesUpdate,
            ChangeableCourses,
        }
    },

    methods: {
        executeScript() {
            let CourseAddCopy = deepCopy(CourseAdd);
            ChangeableCourses_ = FindChangeableCourses(CourseAddCopy);
            this.ChangeableCoursesUpdate();//更新可调整课程的列表
            //alert(ChangeableCourses_);
            let res = TopSort(CourseAddCopy);
            let cnt = 0;
            course_result.length = 0;
            for (let i = 0; i < res.semester_count.length; i++) {
                course_result.push(res.result.slice(cnt, cnt + res.semester_count[i]));
                cnt += res.semester_count[i];
            }

            for (let i = res.semester_count.length; i < 8; i++) course_result[i] = [];
            this.updateData();//更新结果表格中显示的数据
            alert('排课程序已运行完成！');

        },
        addCourse() {
            let PreCourses = [];
            if (Number(this.PreCourseCount) >= 1) PreCourses.push(this.Pre1);
            if (Number(this.PreCourseCount) >= 2) PreCourses.push(this.Pre2);
            if (Number(this.PreCourseCount) >= 3) PreCourses.push(this.Pre3);
            if (Number(this.PreCourseCount) >= 4) PreCourses.push(this.Pre4);
            let course = new course_info(this.ClassName, Number(this.ClassHour), Number(this.PreCourseCount), PreCourses, Number(this.CourseCredit));
            CourseAdd.push(course);
            this.CourseCount = CourseAdd.length;
            this.CourseUpdate();
        },

        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
        },

        readFileContent() {
            if (this.selectedFile) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.fileContent = event.target.result;
                };
                reader.readAsText(this.selectedFile);

                //文件数据读入
                if (this.fileContent) {
                    let lines = this.fileContent.split('\n');
                    //将每一行的结尾回车字符转义序列删除
                    const cleanLines = lines.map((line) => {
                        return line.replace(/\r$/, '');
                    });

                    for (let i = 0; i < lines.length; i++) {
                        const line = cleanLines[i].split(' ');
                        let PreCourses = [];
                        for (let j = 0; j < Number(line[2]); j++) {
                            PreCourses.push(line[4 + j]);
                        }
                        let course = new course_info(line[0], Number(line[1]), Number(line[2]), PreCourses, Number(line[3]));
                        CourseAdd.push(course);
                        this.CourseCount = CourseAdd.length;
                        this.CourseUpdate();
                    }
                }

            } else {
                alert('请先选择文件');
            }
        },
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

.title {
    margin-left: 5px;
    margin-top: 5px;
    margin-bottom: 5px
}

.button1 {
    margin-left: 20px;
    margin-bottom: 20px
}

.mb-3 {
    margin-left: 20px
}

.row {
    margin-top: 5px
}

.col-auto {
    margin-left: 30px
}
</style>