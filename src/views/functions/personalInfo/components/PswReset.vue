<template>
    <div>
        <el-card style="height: 100vh;">
            <el-form :model="resetPasswordForm" status-icon :rules="rules" ref="resetPasswordForm" label-position="left"
                label-width="80px" class="reset-password-form" style="margin:25vh 20vh 0 20vh">
                <el-form-item label="旧密码" prop="oldpsw" class="rlForm">
                    <el-input type="password" v-model="resetPasswordForm.oldpsw" show-password />
                </el-form-item>
                <el-form-item label="新密码" prop="newpsw" class="rlForm">
                    <el-input type="password" v-model="resetPasswordForm.newpsw" show-password />
                </el-form-item>
                <el-form-item label="确认密码" prop="password" class="rlForm">
                    <el-input type="password" v-model="resetPasswordForm.password" show-password />
                </el-form-item>
            </el-form>
            <div class="btnGroup" style="margin-top: 50px">
                <el-button type="primary" style="margin-left: 12vw;" @click="submitForm()">提交</el-button>
                <el-button type="success" style="margin-left: 50vw;" @click="resetForm()">清空</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入旧密码！"))
            }
            else {
                if (this.resetPasswordForm.newpsw !== "")
                    this.$refs.resetPasswordForm.validateField("newpsw")
                callback()
            }
        }
        var validatePass1 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入新密码！"))
            }
            else if (value === this.resetPasswordForm.oldpsw) {
                callback(new Error("新密码不能与旧密码相同！"))
            }
            else {
                if (this.resetPasswordForm.password !== "")
                    this.$refs.resetPasswordForm.validateField("password")
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入新密码！"))
            }
            else if (this.resetPasswordForm.newpsw !== '' && value !== this.resetPasswordForm.newpsw) {
                callback(new Error("两次输入密码不一致!"))
            }
            else
                callback()
        }
        return {
            userID: 1/*sessionStorage.getItem('userID')*/,
            identity: 0/*sessionStorage.getItem('identity')*/,
            resetPasswordForm: {
                oldpsw: "",
                newpsw: "",
                password: "",
            },
            rules: {
                oldpsw: [{ required: true, validator: validatePass, trigger: "blur" }],
                newpsw: [{ required: true, validator: validatePass1, trigger: "blur" }],
                password: [{ required: true, validator: validatePass2, trigger: "blur" }],
            },
        }
    },
    methods: {
        submitForm() {
            console.log('提交表单')
            this.$refs.resetPasswordForm.validate((valid) => {
                if (valid) {
                    this.axios({//"https://apifoxmock.com/m1/5315127-4985126-default/api/reset_password"
                        url: "/api/user/change",
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        params: {
                            IDnumber: this.userID,
                            identity: this.identity,
                            oldPassword: this.resetPasswordForm.oldpsw,
                            newPassword: this.resetPasswordForm.password,
                        }
                    }).then((res) => {
                        if (res.status === 200) {
                            this.$message({
                                message: res.data.message,
                                type: res.data.success ? 'success' : 'warning',
                            });
                        } else {
                            this.$message({
                                message: "密码修改失败！",
                                type: "warning",
                            });
                        }
                        this.resetForm()
                    })
                } else {
                    console.log("表单填写有误！")
                    return false
                }
            }).catch((error) => {
                console.error('Error:', error)
            })
        },
        resetForm() {
            this.$refs.resetPasswordForm.resetFields()
        },
    }
}
</script>

<style></style>