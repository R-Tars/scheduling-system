<template>
    <div class="button1">
        <button class="btn btn-primary" @click="UpdateGraph">生成拓扑图</button>
    </div>
    <div>
        <div ref="chart" style="width: 1230px; height: 650px;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import deepCopy from '../assets/Scripts/deepCopy.js'

export default {
    name: "TopoGraph",
    components: {
    },
    props: {
        courses: {
            type: Object,
            required: true,
        },

        courseAdd: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            fg: 0,
            myChart: null,
            chartData: {
                title: {
                    text: '课程拓扑图'
                },
                tooltip: {},
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [
                    {
                        type: 'graph',
                        layout: 'none',
                        symbolSize: 50,
                        roam: true,
                        label: {
                            show: true
                        },
                        edgeSymbol: ['circle', 'arrow'],
                        edgeSymbolSize: [4, 10],
                        edgeLabel: {
                            fontSize: 20
                        },
                        data: [],//节点信息
                        links: [],//边信息
                        lineStyle: {
                            opacity: 1,
                            width: 2,
                            curveness: 0
                        }
                    }
                ]
            },
        };
    },

    mounted() {
        this.initChart();
    },


    watch: {
        courses: function updatGraphdata() {//更新节点信息并重新渲染表格
            //alert(this.courses[0][0]);
            //将点和边的信息清空
            this.chartData.series[0].data = [
                {
                    name: "大一上学期",
                    x: 100,
                    y: 30,
                    symbol: 'arrow',
                    itemStyle: {
                        color: '#4fc172', // 设置节点颜色为橙色
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 5
                    },
                    symbolRotate: 180,

                },
                {
                    name: "大一下学期",
                    x: 350,
                    y: 30,
                    symbol: 'arrow',
                    itemStyle: {
                        color: '#4fc172', // 设置节点颜色为橙色
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 5
                    },
                    symbolRotate: 180,

                },
                {
                    name: "大二上学期",
                    x: 600,
                    y: 30,
                    symbol: 'arrow',
                    itemStyle: {
                        color: '#4fc172', // 设置节点颜色为橙色
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 5
                    },
                    symbolRotate: 180,

                },
                {
                    name: "大二下学期",
                    x: 850,
                    y: 30,
                    symbol: 'arrow',
                    itemStyle: {
                        color: '#4fc172', // 设置节点颜色为橙色
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 5
                    },
                    symbolRotate: 180,

                },
                {
                    name: "大三上学期",
                    x: 1100,
                    y: 30,
                    symbol: 'arrow',
                    itemStyle: {
                        color: '#4fc172', // 设置节点颜色为橙色
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 5
                    },
                    symbolRotate: 180,

                },
                {
                    name: "大三下学期",
                    x: 1350,
                    y: 30,
                    symbol: 'arrow',
                    itemStyle: {
                        color: '#4fc172', // 设置节点颜色为橙色
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 5
                    },
                    symbolRotate: 180,

                },
                {
                    name: "大四上学期",
                    x: 1600,
                    y: 30,
                    symbol: 'arrow',
                    itemStyle: {
                        color: '#4fc172', // 设置节点颜色为橙色
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 5
                    },
                    symbolRotate: 180,

                },
                {
                    name: "大四下学期",
                    x: 1850,
                    y: 30,
                    symbol: 'arrow',
                    itemStyle: {
                        color: '#4fc172', // 设置节点颜色为橙色
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 5
                    },
                    symbolRotate: 180,

                },
            ];
            this.chartData.series[0].links = [];
            let coursesCopy = deepCopy(this.courses);
            for (let i = 0; i < 8; i++) {//添加节点信息
                for (let j = 0; j < coursesCopy[i].length; j++) {
                    const newNode = {
                        name: coursesCopy[i][j],
                        x: 100 + i * 250,
                        y: 100 + j * 100,
                        itemStyle: {
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowBlur: 5
                        },
                    }
                    this.chartData.series[0].data.push(newNode);
                }
            }

            //添加边信息
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < coursesCopy[i].length; j++) {
                    let start = coursesCopy[i][j];//取出当前课程
                    for (let k = 0; k < this.courseAdd.length; k++) {
                        for (let l = 0; l < this.courseAdd[k].pre_courses.length; l++) {
                            let pre_course = this.courseAdd[k].pre_courses[l];
                            if (start == pre_course) {//如果该门课程某一门先修课等于该门课程，则将该信息添加到边中
                                const newEdge = {
                                    source: start,
                                    target: this.courseAdd[k].name,
                                    lineStyle: {
                                        curveness: -0.3
                                    },
                                }
                                this.chartData.series[0].links.push(newEdge);//添加边
                                break;
                            }
                        }
                    }
                }
            }

            if (this.fg == 1) this.UpdateGraph();
        },

        deep: true
    },

    methods: {
        initChart() {
            const chartDom = this.$refs.chart;
            this.myChart = echarts.init(chartDom);
            this.myChart.setOption(this.chartData);
        },

        UpdateGraph() {
            this.myChart.setOption(this.chartData);
            this.fg = 1;
        },
    },
};
</script>