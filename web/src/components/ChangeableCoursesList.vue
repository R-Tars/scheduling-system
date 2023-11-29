<template>
    <div>
        <div class="title">排课结果：</div>

        <CourseTable :courses="coursesDeliver" :CourseAdd="CourseAdd">
        </CourseTable>

        <div class="title">
            手动调课：
            <br>
            可往后调整的课程有：
            <span v-if="ChangeableCourses.length > 0">{{ ChangeableCourses.join(', ') }}</span>
            <span v-else>无</span>
            <br>
            请选择要调整的课程:
        </div>
        <select class="form-select" aria-label="Default select example" v-model="selectedCourseDown">
            <option v-for="course in coursesDown" :key="course.value" :value="course.lable">{{ course.lable }}</option>
        </select>
        <div class="button1">
            <button class="btn btn-primary" @click="ChangeCourseDown">将该课程向后调整一学期</button>
        </div>

        <div>
            <div class="card">
                <div class="card-body">
                    <TopoGraph :courses="coursesDeliver" :courseAdd="CourseAdd">
                    </TopoGraph>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CourseTable from './CourseTable'
import deepCopy from '../assets/Scripts/deepCopy.js'
import TopoGraph from './TopoGraph.vue'

export default {
    name: "ChangeableCoursesList",
    components: {
        CourseTable,
        TopoGraph,
    },
    props: {
        ChangeableCourses: {
            type: Array,
            required: true,
        },
        courses: {
            type: Object,
            required: true,
        },
        CourseAdd: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            coursesDown: [{ value: 1, lable: "暂无可向后调整的课程" }],//可向后调整的的课程
            coursesUp: [{ value: 1, lable: "暂无可向前调整的课程" }],//可向前调整的课程
            selectedCourseDown: "暂无可向后调整的课程",
            coursesDeliver: [],
        };
    },
    watch: {
        ChangeableCourses: function ListDataUpdate() {
            //alert("yes");
            if (this.ChangeableCourses) {
                //alert("yes1");
                //alert(this.ChangeableCourses);

                let newCourses = []
                for (let i = 0; i < this.ChangeableCourses.length; i++) {
                    const newRow = {
                        value: i + 1,
                        lable: this.ChangeableCourses[i],
                    };
                    newCourses.push(newRow);
                }
                this.coursesDown = newCourses;

            }
        },

        courses: function updateCourses() {
            this.coursesDeliver = deepCopy(this.courses);
        },

        deep: true
    },

    methods: {
        ChangeCourseDown() {
            if (this.selectedCourseDown == "暂无可向后调整的课程") alert("当前无课程可以向前调整或未选择要向前调整的课程！");
            else {
                let fg = 0;
                let newcoursesDeliver = deepCopy(this.coursesDeliver);
                for (let i = 0; i < newcoursesDeliver.length; i++) {
                    for (let j = 0; j < newcoursesDeliver[i].length; j++)
                        if (this.selectedCourseDown == newcoursesDeliver[i][j]) {
                            if (i + 1 < 8) {
                                newcoursesDeliver[i].splice(j, 1);
                                if (Array.isArray(this.coursesDeliver[i + 1]) && newcoursesDeliver[i + 1][0] == "暂无课程") {
                                    newcoursesDeliver[i + 1] = [this.selectedCourseDown];
                                }
                                else if (Array.isArray(newcoursesDeliver[i + 1])) {
                                    newcoursesDeliver[i + 1].push(this.selectedCourseDown);
                                }
                                else newcoursesDeliver[i + 1] = [this.selectedCourseDown];
                                //alert("已将课程" + this.selectedCourseDown + "向后调整一学期！");
                            }
                            else alert("该课程已无法再向后调整！")

                            fg = 1;
                            break;
                        }
                    if (fg == 1) break;
                }
                this.coursesDeliver = newcoursesDeliver;
            }
        },

        ChangeCourseUp() {

        }
    }
}
</script>

<style scoped>
.button1 {
    margin: 5px
}

.form-select {
    margin: 5px
}

.title {
    margin: 5px
}
</style>