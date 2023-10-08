<template>
    <div>
        <input v-model="userInput" placeholder="请输入数据" />
        <button @click="readData">读取数据</button>
        <p>输入的数据：{{ inputData }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInput: '', // 用户输入的数据将存储在这里
            inputData: '' // 用于显示用户输入的数据
        };
    },
    methods: {
        readData() {
            // 在这个方法中读取用户输入的数据
            this.inputData = this.userInput;
        }
    }
};
</script>
