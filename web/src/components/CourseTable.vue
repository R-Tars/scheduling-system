<template>
    <table class="table table-bordered">
        <thead>
            <tr class="table-dark">
                <th scope="col">学期序号</th>
                <th scope="col">学期名称</th>
                <th scope="col">课程</th>
            </tr>
        </thead>
        <tbody>
            <tr class="table-info">
                <th scope="row">1</th>
                <td>大一上学期</td>
                <td>{{ courses.course1 }}</td>
            </tr>
            <tr class="table-info">
                <th scope="row">2</th>
                <td>大一下学期</td>
                <td>{{ courses.course2 }}</td>
            </tr>
            <tr class="table-info">
                <th scope="row">3</th>
                <td>大二上学期</td>
                <td>{{ courses.course3 }}</td>
            </tr>
            <tr class="table-info">
                <th scope="row">4</th>
                <td>大二下学期</td>
                <td>{{ courses.course4 }}</td>
            </tr>
            <tr class="table-info">
                <th scope="row">5</th>
                <td>大三上学期</td>
                <td>{{ courses.course5 }}</td>
            </tr>
            <tr class="table-info">
                <th scope="row">6</th>
                <td>大三下学期</td>
                <td>{{ courses.course6 }}</td>
            </tr>
            <tr class="table-info">
                <th scope="row">7</th>
                <td>大四上学期</td>
                <td>{{ courses.course7 }}</td>
            </tr>
            <tr class="table-info">
                <th scope="row">8</th>
                <td>大四下学期</td>
                <td>{{ courses.course8 }}</td>
            </tr>


        </tbody>
    </table>
</template>

<script>
export default {
    name: "CourseTable",
    props: {
        courses: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style></style>