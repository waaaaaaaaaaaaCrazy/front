<template>
    <div>
        <h1>课程详情</h1>
        <p>课程名: {{ $route.params.courseId }}</p>
        <p>课程号: {{ $route.query.courseNumber }}</p>
        <p>课序号: {{ $route.query.classNumber }}</p>
    </div>
</template>

<script>
export default {
    name: 'CourseDetail'
}
</script>

<style scoped></style>