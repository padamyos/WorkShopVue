<template>
    <v-app>
        <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" class="pt-10" height="1000">

            <v-container justify='start'>
                <v-row>
                    <v-col cols="6" md="6" >
                        <h1 class="text-uppercase  " >
                            About me
                        </h1>
                        <h4 class="pt-10 ">
                            ชื่อ-นามสกุล: เผดิมยศ ภาคภูมิพงศ์<br>
                            ชื่อเล่น: ต๊ะ<br>
                            อายุ: 21 ปี<br>
                            จบการศึกษาจาก: มหาวิทยาลัยราชมงคลศรีวิชัย สงขลา<br>
                            สาขา: วิศวกรรมคอมพิวเตอร์<br>
                            งานอดิเรก: ดูหนัง  อ่านหนังสือ ออกกำลังกาย และเล่นเกมส์<br>
                            จุดแข็ง: มีความอดทน รับผิดชอบ แก้ไขปัญหาเฉพาะหน้า<br>
                            ทีมที่ชอบ: ทีมลิเวอร์พูล<br>
                        </h4>

                    </v-col>
                    <v-col cols="6" md="6">
                        <v-img src="../../assets/profile.jpg"  class="rounded-circle"></v-img>
                    </v-col>


                </v-row>
            </v-container>

        </v-parallax>
    </v-app>
</template>

<script>
export default {
    name: 'Workshop1',
};
</script>

<style scoped>

</style>