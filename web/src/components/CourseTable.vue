<template>
    <div class="WholeTable">
        <table class="table table-bordered">
            <thead>
                <tr class="table-dark">
                    <th scope="col">序号</th>
                    <th scope="col">学期</th>
                    <th scope="col">课程</th>
                    <th scope="col">总学时</th>
                    <th scope="col">总学分</th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-info">
                    <th scope="row">1</th>
                    <td>大一上</td>
                    <td v-if="courses[0] && courses[0].length > 0">{{ courses[0].join(', ') }}</td>
                    <td v-else>暂无课程</td>
                    <td v-if="CourseHourSum[0]">{{ CourseHourSum[0] }}</td>
                    <td v-else>无</td>
                    <td v-if="CourseCreditSum[0]">{{ CourseCreditSum[0] }}</td>
                    <td v-else>无</td>
                </tr>
                <tr class="table-info">
                    <th scope="row">2</th>
                    <td>大一下</td>
                    <td v-if="courses[1] && courses[1].length > 0">{{ courses[1].join(', ') }}</td>
                    <td v-else>暂无课程</td>
                    <td v-if="CourseHourSum[1]">{{ CourseHourSum[1] }}</td>
                    <td v-else>无</td>
                    <td v-if="CourseCreditSum[1]">{{ CourseCreditSum[1] }}</td>
                    <td v-else>无</td>
                </tr>
                <tr class="table-info">
                    <th scope="row">3</th>
                    <td>大二上</td>
                    <td v-if="courses[2] && courses[2].length > 0">{{ courses[2].join(', ') }}</td>
                    <td v-else>暂无课程</td>
                    <td v-if="CourseHourSum[2]">{{ CourseHourSum[2] }}</td>
                    <td v-else>无</td>
                    <td v-if="CourseCreditSum[2]">{{ CourseCreditSum[2] }}</td>
                    <td v-else>无</td>
                </tr>
                <tr class="table-info">
                    <th scope="row">4</th>
                    <td>大二下</td>
                    <td v-if="courses[3] && courses[3].length > 0">{{ courses[3].join(', ') }}</td>
                    <td v-else>暂无课程</td>
                    <td v-if="CourseHourSum[3]">{{ CourseHourSum[3] }}</td>
                    <td v-else>无</td>
                    <td v-if="CourseCreditSum[3]">{{ CourseCreditSum[3] }}</td>
                    <td v-else>无</td>
                </tr>
                <tr class="table-info">
                    <th scope="row">5</th>
                    <td>大三上</td>
                    <td v-if="courses[4] && courses[4].length > 0">{{ courses[4].join(', ') }}</td>
                    <td v-else>暂无课程</td>
                    <td v-if="CourseHourSum[4]">{{ CourseHourSum[4] }}</td>
                    <td v-else>无</td>
                    <td v-if="CourseCreditSum[4]">{{ CourseCreditSum[4] }}</td>
                    <td v-else>无</td>
                </tr>
                <tr class="table-info">
                    <th scope="row">6</th>
                    <td>大三下</td>
                    <td v-if="courses[5] && courses[5].length > 0">{{ courses[5].join(', ') }}</td>
                    <td v-else>暂无课程</td>
                    <td v-if="CourseHourSum[5]">{{ CourseHourSum[5] }}</td>
                    <td v-else>无</td>
                    <td v-if="CourseCreditSum[5]">{{ CourseCreditSum[5] }}</td>
                    <td v-else>无</td>
                </tr>
                <tr class="table-info">
                    <th scope="row">7</th>
                    <td>大四上</td>
                    <td v-if="courses[6] && courses[6].length > 0">{{ courses[6].join(', ') }}</td>
                    <td v-else>暂无课程</td>
                    <td v-if="CourseHourSum[6]">{{ CourseHourSum[6] }}</td>
                    <td v-else>无</td>
                    <td v-if="CourseCreditSum[6]">{{ CourseCreditSum[6] }}</td>
                    <td v-else>无</td>
                </tr>
                <tr class="table-info">
                    <th scope="row">8</th>
                    <td>大四下</td>
                    <td v-if="courses[7] && courses[7].length > 0">{{ courses[7].join(', ') }}</td>
                    <td v-else>暂无课程</td>
                    <td v-if="CourseHourSum[7]">{{ CourseHourSum[7] }}</td>
                    <td v-else>无</td>
                    <td v-if="CourseCreditSum[7]">{{ CourseCreditSum[7] }}</td>
                    <td v-else>无</td>
                </tr>


            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "CourseTable",
    props: {
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
            CourseCreditSum: [0, 0, 0, 0, 0, 0, 0, 0],
            CourseHourSum: [0, 0, 0, 0, 0, 0, 0, 0],
        };
    },

    watch: {
        courses: function updateSumData() {
            //alert("change");
            for (let i = 0; i < 8; i++) {
                this.CourseCreditSum[i] = 0;
                this.CourseHourSum[i] = 0;
            }
            for (let k = 0; k < 8; k++) {
                if (Array.isArray(this.courses[k])) {
                    for (let i = 0; i < this.courses[k].length; i++) {
                        for (let j = 0; j < this.CourseAdd.length; j++) {
                            if (this.courses[k][i] == this.CourseAdd[j].name) {
                                this.CourseCreditSum[k] += Number(this.CourseAdd[j].course_credit);
                                this.CourseHourSum[k] += Number(this.CourseAdd[j].class_hour);
                            }
                        }
                    }

                }
            }
        },


        deep: true,
    },
}
</script>

<style scoped>
.WholeTable {
    margin: 5px
}

table {
    font-size: 12px;
    /* 设置表格字体大小 */
}
</style>