<template>
  <div class="file-upload-container">
    <el-container style="height: 50vh;font-weight: bold">

      <el-header style="height: 10vh;background-color:cornflowerblue;align-content: center;justify-content: center;font-size: 25px;font-weight: bold;">
        <lable> 文件上传</lable>
      </el-header>

      <el-main>

        <el-container>

          <el-header>
            支持ppt、pptx、doc、docx、pdf、txt、xls、xlsx、jpg、jpeg、png、bmp、gif、mp3、mp4、avi、wmv、mov、rmvb、flv、f4v、rar、zip、7z等格式文件
          </el-header>


              <el-form :inline="true" label-position="top" style="display: flex;justify-content: center;align-items: center;">


                    <el-form-item flex="1">
                      <el-upload
                          class="upload-demo"
                          :action="uploadAction"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :before-remove="beforeRemove"
                          :on-success="handleSuccess"
                          :file-list="fileList"
                          list-type="picture"
                          :http-request="customRequest">
                        <el-button type="primary">点击上传</el-button>
                      </el-upload>
                    </el-form-item>


                    <el-form-item flex="1">
                      <el-button type="primary" @click="submitForm">提交</el-button>
                    </el-form-item>


                    <el-form-item flex="1">
                      <el-button type="primary" @click="resetForm">重置</el-button>
                    </el-form-item>

              </el-form>




        </el-container>
      </el-main>


    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const uploadForm = ref({});
const fileList = ref([]);
const uploadAction = 'https://jsonplaceholder.typicode.com/posts/';

const handlePreview = (file) => {
  // 预览文件
};

const handleRemove = (file, fileList) => {
  // 移除文件
};

const beforeRemove = (file, fileList) => {
  // 上传前移除文件
  return true;
};

const handleSuccess = (response, file, fileList) => {
  // 上传成功
};

const submitForm = () => {
  // 提交表单
};

const resetForm = () => {
  // 重置表单
};

const customRequest = (options) => {
  // 自定义上传逻辑
  console.log(options);
};
</script>

<style scoped>
.file-upload-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.box-card {
  overflow: hidden;
}

.el-upload__tip {
  font-size: 14px;
  color: #606266;
}

.el-button {
  margin-top: 10px;
}

.el-row {
  margin-bottom: 20px;
}

.el-col:last-child {
  text-align: right;
}
.el-header{
  box-shadow: none;
}
.el-main{
  overflow: hidden;
}
.el-card{
  background-color: transparent;
}
.form-inline .el-form-item {
  display: flex;
  flex:1;
}
</style>