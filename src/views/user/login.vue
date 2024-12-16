<template>
    <v-container class="fill-height "  fluid>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="4" >
                <v-card class="red--text  ">
                    <v-card-title  class="headline text-center " >
                        Login
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                v-model="email"
                                label="Email"
                                type="email"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                label="Password"
                                type="password"
                                required
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="userlogin">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import router from '@/router';
import axios from 'axios';
import {EventBus } from '@/EventBus'

export default {
    data() {
        return {
            email: '',
            password: '',
           
        };
    },
    methods: {
        
        async userlogin() {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/login', {
                    email: this.email,
                    password: this.password,
                    
                    
                });
             
                const token = (response.data.data.token);
                const status = (response.data.data.user.isstatus);
                const name = (response.data.data.user.name);
                const email = (response.data.data.user.email);
                console.log("เข้าสู่ระบบสำเร็จ");
                // บันทึก token ลง localStorage
                localStorage.setItem('status', (status));
                localStorage.setItem('userToken', (token));
                localStorage.setItem('name', (name));
                localStorage.setItem('email', (email));
                // console.log(localStorage.getItem('userToken'));
                // console.log(localStorage.getItem('status'));
                EventBus.$emit('user-logged-in', { token, status, name, email });
                router.push('/');

            } catch (error) {
                console.error(error);
            }
    
          } 
        }
};
</script>

<style scoped>
.fill-height {
    height: 100vh;
}
</style>