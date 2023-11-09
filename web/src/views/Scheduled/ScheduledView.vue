<template>
    <div>
        <select class="form-select" aria-label="Default select example">
            <option selected>选择要调整的课程</option>
            <option v-for="course in courses" :key="course.value" :value="course.value">{{ course.label }}</option>
        </select>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            courses: [
                { value: 1, label: "One" },
                { value: 2, label: "Two" },
                { value: 3, label: "Three" }
            ]
        };
    }
};
</script>
  