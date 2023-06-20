<template>
 <div>
  <h2 class="text-center mb-3">Daftar Siswa</h2>
  <table class="table">
   <thead>
    <tr class="text-center">
     <th class="border align-middle">No Induk Siswa</th>
     <th class="border align-middle">Nama Siswa</th>
     <th class="border align-middle">Nilai Tugas 1</th>
     <th class="border align-middle">Nilai Tugas 2</th>
     <th class="border align-middle">Nilai Tugas 3</th>
     <th class="border align-middle">Rata-rata Nilai</th>
    </tr>
   </thead>
   <tbody>
    <tr v-for="(siswa, index) in siswaList" :key="index" class="text-center">
     <td class="border align-middle">{{ siswa.noInduk }}</td>
     <td class="border align-middle">{{ siswa.nama }}</td>
     <td class="border align-middle">{{ siswa.tugas1 }}</td>
     <td class="border align-middle">{{ siswa.tugas2 }}</td>
     <td class="border align-middle">{{ siswa.tugas3 }}</td>
     <td class="border align-middle">{{ hitungRataRataTugas(siswa) }}</td>
    </tr>
   </tbody>
  </table>
  <h3>Rata-rata Nilai Tugas Seluruhnya : {{ hitungRataRataTugasTotal() }}</h3>
 </div>
</template>

<script>
export default {
 props: {
  siswaList: {
   type: Array,
   default: () => [],
  },
 },
 methods: {
  hitungRataRataTugasTotal() {
   if (this.siswaList.length === 0) return 0;

   const totalNilaiTugas = this.siswaList.reduce((sum, siswa) => {
    const nilaiTugas = [siswa.tugas1, siswa.tugas2, siswa.tugas3];
    const totalNilai = nilaiTugas.reduce((sum, nilai) => sum + parseInt(nilai), 0);
    return sum + totalNilai;
   }, 0);

   const jumlahNilaiTugas = this.siswaList.length * 3;
   const rataRataTugas = totalNilaiTugas / jumlahNilaiTugas;
   return rataRataTugas.toFixed(2);
  },
  hitungRataRataTugas(siswa) {
   const nilaiTugas = [siswa.tugas1, siswa.tugas2, siswa.tugas3];
   const totalNilai = nilaiTugas.reduce((sum, nilai) => sum + parseInt(nilai), 0);
   const rataRata = totalNilai / nilaiTugas.length;
   return rataRata.toFixed(2);
  },
 },
};
</script>
