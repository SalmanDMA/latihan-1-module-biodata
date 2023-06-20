<template>
 <div>
  <h2 class="text-center mb-3">Form Input Nilai Tugas Siswa</h2>
  <form @submit.prevent="submitForm" class="needs-validation">
   <div class="mb-3">
    <label for="noInduk" class="form-label">No Induk Siswa:</label>
    <input type="text" id="noInduk" v-model="siswa.noInduk" class="form-control" required />
   </div>
   <div class="mb-3">
    <label for="nama" class="form-label">Nama Siswa:</label>
    <input type="text" id="nama" v-model="siswa.nama" class="form-control" required />
   </div>
   <div class="mb-3">
    <label for="tugas1" class="form-label">Nilai Tugas 1:</label>
    <input type="number" id="tugas1" v-model="siswa.tugas1" class="form-control" required />
   </div>
   <div class="mb-3">
    <label for="tugas2" class="form-label">Nilai Tugas 2:</label>
    <input type="number" id="tugas2" v-model="siswa.tugas2" class="form-control" required />
   </div>
   <div class="mb-3">
    <label for="tugas3" class="form-label">Nilai Tugas 3:</label>
    <input type="number" id="tugas3" v-model="siswa.tugas3" class="form-control" required />
   </div>
   <div>
    <button type="submit" class="btn btn-primary">Submit</button>
   </div>
  </form>
 </div>
</template>

<script>
export default {
 data() {
  return {
   siswa: {
    noInduk: '',
    nama: '',
    tugas1: '',
    tugas2: '',
    tugas3: '',
   },
  };
 },
 methods: {
  submitForm() {
   this.$emit('siswa-added', this.siswa);
   this.resetForm();
  },
  resetForm() {
   this.siswa = {
    noInduk: '',
    nama: '',
    tugas1: '',
    tugas2: '',
    tugas3: '',
   };
  },
 },
};
</script>
