<template>
    <div>
        <h1>课程详情</h1>
        <p>课程名: {{ $route.query.cname }}</p>
        <p>课程号: {{ $route.params.cid }}</p>
        <p>课序号: {{ $route.query.cnumber }}</p>
    </div>
</template>

<script>
export default {
    name: 'CourseDetail'
}
</script>

<style scoped></style>