<template>
    <div class="card-body">

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">课程序号</th>
                    <th scope="col">课程名称</th>
                    <th scope="col">学时</th>
                    <th scope="col">先修课</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>{{ t = (CourseInfo.Courses[0] == undefined ? '' : CourseInfo.Courses[0].name) }}</td>
                    <td>{{ t = (CourseInfo.Courses[0] == undefined ? '' : CourseInfo.Courses[0].class_hour) }}</td>
                    <td>{{ t = (CourseInfo.Courses[0] == undefined ? '' : CourseInfo.Courses[0].pre_courses) }}</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>{{ t = (CourseInfo.Courses[1] == undefined ? '' : CourseInfo.Courses[1].name) }}</td>
                    <td>{{ t = (CourseInfo.Courses[1] == undefined ? '' : CourseInfo.Courses[1].class_hour) }}</td>
                    <td>{{ t = (CourseInfo.Courses[1] == undefined ? '' : CourseInfo.Courses[1].pre_courses) }}</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>{{ t = (CourseInfo.Courses[2] == undefined ? '' : CourseInfo.Courses[2].name) }}</td>
                    <td>{{ t = (CourseInfo.Courses[2] == undefined ? '' : CourseInfo.Courses[2].class_hour) }}</td>
                    <td>{{ t = (CourseInfo.Courses[2] == undefined ? '' : CourseInfo.Courses[2].pre_courses) }}</td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>{{ t = (CourseInfo.Courses[3] == undefined ? '' : CourseInfo.Courses[3].name) }}</td>
                    <td>{{ t = (CourseInfo.Courses[3] == undefined ? '' : CourseInfo.Courses[3].class_hour) }}</td>
                    <td>{{ t = (CourseInfo.Courses[3] == undefined ? '' : CourseInfo.Courses[3].pre_courses) }}</td>
                </tr>
                <tr>
                    <th scope="row">5</th>
                    <td>{{ t = (CourseInfo.Courses[4] == undefined ? '' : CourseInfo.Courses[4].name) }}</td>
                    <td>{{ t = (CourseInfo.Courses[4] == undefined ? '' : CourseInfo.Courses[4].class_hour) }}</td>
                    <td>{{ t = (CourseInfo.Courses[4] == undefined ? '' : CourseInfo.Courses[4].pre_courses) }}</td>
                </tr>
                <tr>
                    <th scope="row">6</th>
                    <td>{{ t = (CourseInfo.Courses[5] == undefined ? '' : CourseInfo.Courses[5].name) }}</td>
                    <td>{{ t = (CourseInfo.Courses[5] == undefined ? '' : CourseInfo.Courses[5].class_hour) }}</td>
                    <td>{{ t = (CourseInfo.Courses[5] == undefined ? '' : CourseInfo.Courses[5].pre_courses) }}</td>
                </tr>
                <tr>
                    <th scope="row">7</th>
                    <td>{{ t = (CourseInfo.Courses[6] == undefined ? '' : CourseInfo.Courses[6].name) }}</td>
                    <td>{{ t = (CourseInfo.Courses[6] == undefined ? '' : CourseInfo.Courses[6].class_hour) }}</td>
                    <td>{{ t = (CourseInfo.Courses[6] == undefined ? '' : CourseInfo.Courses[6].pre_courses) }}</td>
                </tr>
                <tr>
                    <th scope="row">8</th>
                    <td>{{ t = (CourseInfo.Courses[7] == undefined ? '' : CourseInfo.Courses[7].name) }}</td>
                    <td>{{ t = (CourseInfo.Courses[7] == undefined ? '' : CourseInfo.Courses[7].class_hour) }}</td>
                    <td>{{ t = (CourseInfo.Courses[7] == undefined ? '' : CourseInfo.Courses[7].pre_courses) }}</td>
                </tr>
                <tr>
                    <th scope="row">9</th>
                    <td>{{ t = (CourseInfo.Courses[8] == undefined ? '' : CourseInfo.Courses[8].name) }}</td>
                    <td>{{ t = (CourseInfo.Courses[8] == undefined ? '' : CourseInfo.Courses[8].class_hour) }}</td>
                    <td>{{ t = (CourseInfo.Courses[8] == undefined ? '' : CourseInfo.Courses[8].pre_courses) }}</td>
                </tr>
                <tr>
                    <th scope="row">10</th>
                    <td>{{ t = (CourseInfo.Courses[9] == undefined ? '' : CourseInfo.Courses[9].name) }}</td>
                    <td>{{ t = (CourseInfo.Courses[9] == undefined ? '' : CourseInfo.Courses[9].class_hour) }}</td>
                    <td>{{ t = (CourseInfo.Courses[9] == undefined ? '' : CourseInfo.Courses[9].pre_courses) }}</td>
                </tr>
                <tr>
                    <th scope="row">11</th>
                    <td>{{ t = (CourseInfo.Courses[10] == undefined ? '' : CourseInfo.Courses[10].name) }}</td>
                    <td>{{ t = (CourseInfo.Courses[10] == undefined ? '' : CourseInfo.Courses[10].class_hour) }}</td>
                    <td>{{ t = (CourseInfo.Courses[10] == undefined ? '' : CourseInfo.Courses[10].pre_courses) }}</td>
                </tr>
                <tr>
                    <th scope="row">12</th>
                    <td>{{ t = (CourseInfo.Courses[11] == undefined ? '' : CourseInfo.Courses[11].name) }}</td>
                    <td>{{ t = (CourseInfo.Courses[11] == undefined ? '' : CourseInfo.Courses[11].class_hour) }}</td>
                    <td>{{ t = (CourseInfo.Courses[11] == undefined ? '' : CourseInfo.Courses[11].pre_courses) }}</td>
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
    }
}

</script>

<style></style>