<template>
 <div class="container">
  <h1 class="my-5 text-center">Tugas XII - Form, Event Handling, dan List Rendering</h1>
  <div class="row">
   <div class="col-md-5">
    <FormSiswa @siswa-added="addSiswa" />
   </div>
   <div class="col-md-7">
    <DaftarSiswa :siswaList="siswaList" />
   </div>
  </div>
 </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import FormSiswa from './components/FormSiswa.vue';
import DaftarSiswa from './components/DaftarSiswa.vue';

export default {
 components: {
  FormSiswa,
  DaftarSiswa,
 },
 data() {
  return {
   siswaList: [],
  };
 },
 methods: {
  addSiswa(siswa) {
   this.siswaList.push(siswa);
  },
 },
};
</script>
