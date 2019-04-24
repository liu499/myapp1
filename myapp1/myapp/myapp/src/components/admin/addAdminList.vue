<template>
    <el-dialog title="添加管理员" :visible="dialogFormVisible" @update:visible="v=>$emit('update:dialogFormVisible',false)">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="添加用户" prop="adminName" >
                <el-input v-model="ruleForm2.adminName" ref="adminName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass" >
                <el-input type="password" v-model="ruleForm2.pass" ref="passWord" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addAdmin">添加</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

</template>

<script>
    export default {
        props:["dialogFormVisible","getAdminLogList"],
        name: "add-admin-list",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    adminName: ''
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    adminName:[
                        { required: true, message: '请输入管理员账号', trigger: 'blur' },
                        {min:3,max:10,message: '长度为3到10位',trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            addAdmin(){
                console.log(this.$refs.adminName.$data.currentValue,this.$refs.passWord.$data.currentValue,22222222222);
                var adminName = this.$refs.adminName.$data.currentValue;
                var passWord = this.$refs.passWord.$data.currentValue;
                this.$ajax.post("/adminList",{
                    adminName,
                    passWord
                }).then(data=>{
                    this.$emit('update:dialogFormVisible',false)
                    this.getAdminLogList()
                    console.log(data);
            })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
