<template>
    <ContentField>
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

    </ContentField>
</template>

<script>
import ContentField from '../../components/ContentField.vue'
import course_info from '../../assets/Scripts/CourseClass.js'

let courses = [];

export default {
    components: {
        ContentField
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
    methods: {
        addCourse() {
            let PreCourses = [];
            PreCourses.push(this.pre1);
            PreCourses.push(this.pre2);
            PreCourses.push(this.pre3);
            PreCourses.push(this.pre4);
            let course = new course_info(this.ClassName, this.ClassHour, this.PreCourseCount, PreCourses);
            courses.push(course);
            this.output = courses.length;

        }
    }
};
</script>

<style>
.pre {
    margin-top: 10px
}

.text1 {
    margin-top: 10px
}

.button1 {
    margin: 5px
}
</style>