<template>
    <v-container >
      <v-row class=" d-flex justify-end "> 
        <v-col cols="4 " class="d-flex">
          <v-text-field
            
            v-model="score"
            label="Enter score"
            type="text"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="4" >
          <v-btn @click="calculateGrade" color="primary">Get Grade</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-alert v-if="grade" type="success">{{ grade }}</v-alert>
          <v-alert v-if="error" type="error">{{ error }}</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        score: '',
        grade: '',
        error: ''
      };
    },
    methods: {
      calculateGrade() {
        const score = parseFloat(this.score);
        if (isNaN(score) || score < 0 || score > 100) {
          this.error = 'Please enter a valid score between 0 and 100.';
          this.grade = '';
        } else {
          this.error = '';
          if (score >= 80) {
            this.grade = 'A';
          } else if (score >= 70) {
            this.grade = 'B';
          } else if (score >= 60) {
            this.grade = 'C';
          } else if (score >= 50) {
            this.grade = 'D';
          } else {
            this.grade = 'F';
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any styles you need here */
  </style>