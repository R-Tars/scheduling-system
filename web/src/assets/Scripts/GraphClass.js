class Node {
    constructor(name, class_hour, pre_course_count, pre_courses, course_credit) {
        this.name = name;
        this.class_hour = class_hour;
        this.pre_course_count = pre_course_count;
        this.pre_courses = pre_courses || [];
        this.course_credit = course_credit;
    }
}

class Graph {
    constructor() {
        this.nodes = new Map(); // 用于存储节点
        this.edges = new Map(); // 用于存储边
    }

    // 添加节点
    addNode(node) {
        if (!(node instanceof Node)) {
            console.error("Invalid node");
            return;
        }
        this.nodes.set(node.name, node);
    }

    // 添加边
    addEdge(node1, node2) {
        if (!this.nodes.has(node1) || !this.nodes.has(node2)) {
            console.error("Nodes not found");
            return;
        }

        this.edges.set(`${node1}-${node2}`, true);
        this.edges.set(`${node2}-${node1}`, true);

        this.nodes.get(node1).pre_courses.push(node2.name);
    }

    // 获取节点的邻居
    getNeighbors(nodeName) {
        if (!this.nodes.has(nodeName)) {
            console.error("Node not found");
            return [];
        }

        return this.nodes.get(nodeName).pre_courses;
    }

    // 打印图的结构
    printGraph() {
        for (const [nodeName, node] of this.nodes) {
            const preCoursesString = node.pre_courses.join(", ");
            console.log(`${nodeName}: Class Hour - ${node.class_hour}, Pre-course Count - ${node.pre_course_count}, Pre-courses - [${preCoursesString}], Course Credit - ${node.course_credit}`);
        }
    }

    // 拓扑排序算法
    topologicalSort() {
        let result = [];
        let st = [];
        for (let i = 0; i < this.nodes.size; i++) st.push(0);

        for (let i = 0; i < this.nodes.size; i++) {
            let qu = [];
            for (const [nodeName, node] of this.nodes) {
                if (node.pre_course_count === 0 && !st[nodeName]) {
                    qu.push(nodeName);
                    st[nodeName] = 1;
                }
            }

            if (!qu.length) break;

            result.push(...qu);

            while (qu.length) {
                let t = qu.pop();
                for (const [nodeName, node] of this.nodes) {
                    for (let k = 0; k < node.pre_courses.length; k++) {
                        let pre_course = node.pre_courses[k];
                        if (t === pre_course) {
                            node.pre_course_count--;
                            break;
                        }
                    }
                }
            }
        }

        return result;
    }

    topologicalSortWithConstraints(
        hourRestrict,
        restrictedHour,
        creditRestrict,
        restrictedCredit
    ) {
        let isHourRestricted = 1;
        let isCreditRestricted = 1;
        const originCourses = deepCopy(Array.from(this.nodes.values()));

        let result = [];
        let semester_count = [];
        let st = new Array(this.nodes.size).fill(0);

        for (let i = 0; i < 8; i++) {
            let qu = [];
            for (const [nodeName, node] of this.nodes) {
                if (node.pre_course_count == 0 && !st[nodeName]) {
                    qu.push(nodeName);
                    st[nodeName] = 1;
                }
            }

            if (!qu.length) break;

            semester_count.push(qu.length);

            for (let j = 0; j < qu.length; j++) {
                result.push(qu[j]);
            }

            while (qu.length) {
                let t = qu.pop();
                for (const [nodeName, node] of this.nodes) {
                    for (let k = 0; k < node.pre_courses.length; k++) {
                        let pre_course = node.pre_courses[k];
                        if (t == pre_course) {
                            node.pre_course_count--;
                            break;
                        }
                    }
                }
            }
        }

        let cnt = 0;
        let courses_ = [];
        for (let i = 0; i < semester_count.length; i++) {
            courses_.push(result.slice(cnt, cnt + semester_count[i]));
            cnt += semester_count[i];
        }
        for (let i = semester_count.length; i < 8; i++) courses_[i] = [];

        let courses_Copy = deepCopy(courses_);

        function isHourRestrict() {
            let stHour = new Array(8).fill(0);
            for (let i = 0; i < 8; i++) {
                let cntHour = 0;
                for (let j = 0; j < courses_[i].length; j++) {
                    for (const [nodeName, node] of myGraph.nodes) {
                        if (courses_[i][j] == nodeName) {
                            cntHour += node.class_hour;
                            break;
                        }
                    }
                }
                if (cntHour > Number(restrictedHour)) stHour[i] = 1;
            }
            return stHour;
        }

        function isCreditRestrict() {
            let stCredit = new Array(8).fill(0);
            for (let i = 0; i < 8; i++) {
                let cntCredit = 0;
                for (let j = 0; j < courses_[i].length; j++) {
                    for (const [nodeName, node] of myGraph.nodes) {
                        if (courses_[i][j] == nodeName) {
                            cntCredit += node.course_credit;
                            break;
                        }
                    }
                }
                if (cntCredit > Number(restrictedCredit)) stCredit[i] = 1;
            }
            return stCredit;
        }

        if (hourRestrict == '是') {
            let ChangeableCourses = FindChangeableCourses(originCourses);
            let stHour = isHourRestrict();

            for (let i = 0; i < 8; i++) {
                if (stHour[i] == 0) continue;

                let courseCanChange = [];
                for (let j = 0; j < courses_[i].length; j++) {
                    for (let k = 0; k < ChangeableCourses.length; k++) {
                        if (courses_[i][j] == ChangeableCourses[k]) {
                            courseCanChange.push(ChangeableCourses[k]);
                        }
                    }
                }

                for (let k = 0; k < courseCanChange.length; k++) {
                    let fg = 0;
                    let newcourses_ = deepCopy(courses_);
                    for (let i = 0; i < newcourses_.length; i++) {
                        for (let j = 0; j < newcourses_[i].length; j++) {
                            if (courseCanChange[k] == newcourses_[i][j]) {
                                if (i + 1 < 8) {
                                    newcourses_[i].splice(j, 1);
                                    if (Array.isArray(newcourses_[i + 1]) && newcourses_[i + 1][0] == "暂无课程") {
                                        newcourses_[i + 1] = [courseCanChange[k]];
                                    }
                                    else if (Array.isArray(newcourses_[i + 1])) {
                                        newcourses_[i + 1].push(courseCanChange[k]);
                                    }
                                    else newcourses_[i + 1] = [courseCanChange[k]];
                                }
                                fg = 1;
                                break;
                            }
                        }
                        if (fg == 1) break;
                    }
                    courses_ = newcourses_;
                    stHour = isHourRestrict();
                    if (stHour[i] == 0) break;
                }
            }

            for (let i = 0; i < 8; i++) {
                if (stHour[i] == 1) {
                    isHourRestricted = 0;
                    courses_ = courses_Copy;
                    break;
                }
            }
            courses_Copy = courses_;
        }

        if (creditRestrict == '是') {
            let ChangeableCourses = FindChangeableCourses(originCourses);
            let stCredit = isCreditRestrict();

            for (let i = 0; i < 8; i++) {
                if (stCredit[i] == 0) continue;

                let courseCanChange = [];
                for (let j = 0; j < courses_[i].length; j++) {
                    for (let k = 0; k < ChangeableCourses.length; k++) {
                        if (courses_[i][j] == ChangeableCourses[k]) {
                            courseCanChange.push(ChangeableCourses[k]);
                        }
                    }
                }

                for (let k = 0; k < courseCanChange.length; k++) {
                    let fg = 0;
                    let newcourses_ = deepCopy(courses_);
                    for (let i = 0; i < newcourses_.length; i++) {
                        for (let j = 0; j < newcourses_[i].length; j++) {
                            if (courseCanChange[k] == newcourses_[i][j]) {
                                if (i + 1 < 8) {
                                    newcourses_[i].splice(j, 1);
                                    if (Array.isArray(newcourses_[i + 1]) && newcourses_[i + 1][0] == "暂无课程") {
                                        newcourses_[i + 1] = [courseCanChange[k]];
                                    }
                                    else if (Array.isArray(newcourses_[i + 1])) {
                                        newcourses_[i + 1].push(courseCanChange[k]);
                                    }
                                    else newcourses_[i + 1] = [courseCanChange[k]];
                                }
                                fg = 1;
                                break;
                            }
                        }
                        if (fg == 1) break;
                    }
                    courses_ = newcourses_;
                    stCredit = isCreditRestrict();
                    if (stCredit[i] == 0) break;
                }
            }

            for (let i = 0; i < 8; i++) {
                if (stCredit[i] == 1) {
                    isCreditRestricted = 0;
                    courses_ = courses_Copy;
                    break;
                }
            }
            courses_Copy = courses;
        }

        return {
            result: result,
            semester_count: semester_count,
            courses_: courses_,
            isHourRestricted: isHourRestricted,
            isCreditRestricted: isCreditRestricted,
        };
    }
}

// 模拟 deepCopy 函数
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// // 使用示例
// const myGraph = new Graph();

// const nodeA = new Node("A", 3, 0, [], 4);
// const nodeB = new Node("B", 4, 1, ["A"], 3);
// const nodeC = new Node("C", 3, 1, ["B"], 2);

// myGraph.addNode(nodeA);
// myGraph.addNode(nodeB);
// myGraph.addNode(nodeC);
// myGraph.addEdge("A", "B");
// myGraph.addEdge("B", "C");

// const result = myGraph.topologicalSortWithConstraints("是", 10, "是", 8);
// console.log("Result:", result);
