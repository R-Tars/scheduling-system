<template>
    <div class="card-body">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">课程序号</th>
                    <th scope="col">课程名称</th>
                    <th scope="col">学时</th>
                    <th scope="col">学分</th>
                    <th scope="col">先修课</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in tableData" :key="row.id">
                    <td>{{ row.courseId }}</td>
                    <td>{{ row.courseName }}</td>
                    <td>{{ row.courseHour }}</td>
                    <td>{{ row.courseCredit }}</td>
                    <td v-if="row.preCourses.length > 0">{{ row.preCourses.join(', ') }}</td>
                    <td v-else>无</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "CourseAddTable",
    props: {
        CourseInfo: {
            type: Object,
            required: true,
        }
    },

    data() {
        return {
            tableData: [],
            courseCount: 0,
        };
    },

    watch: {
        CourseInfo: function TableDataUpdate() {
            if (this.CourseInfo) {
                for (let i = this.courseCount; i < this.CourseInfo.length; i++) {
                    const newRow = {
                        courseId: this.courseCount + 1,
                        courseName: this.CourseInfo[this.courseCount].name,
                        courseHour: this.CourseInfo[this.courseCount].class_hour,
                        preCourses: this.CourseInfo[this.courseCount].pre_courses,
                        courseCredit: this.CourseInfo[this.courseCount].course_credit,
                    };
                    this.tableData.push(newRow);
                    this.courseCount++;
                }
            }
        }
    }
}

</script>

<style scoped></style>