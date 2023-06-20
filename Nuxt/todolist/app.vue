<template>
 <div class="container">
  <h1 class="mt-3">Todo List</h1>
  <div class="list-task" :class="{ 'd-flex gap-3 flex-wrap': isGrid }">
   <p v-if="tasks.length === 0" class="text-muted">Belum ada task</p>
   <CardItem :tasks="tasks" :isGrid="isGrid" />
  </div>
  <div class="action py-2">
   <a href="#" class="add-button" v-if="!isCreating" @click="isCreating = true">Add Task</a>
   <a href="#" class="add-button ms-3" v-if="!isCreating" @click="isGrid = !isGrid">Grid Task</a>
   <div class="add-card" v-if="isCreating">
    <div class="card border-0 mb-2">
     <div class="card-body d-flex flex-column p-0">
      <input v-model="titleValue" class="form-control border-2 mb-2" placeholder="Title" type="text" />
      <textarea v-model="descriptionValue" class="form-control border-2 small" placeholder="Description" rows="3"></textarea>
     </div>
    </div>
    <div class="button-wrapper d-flex">
     <button class="btn btn-primary me-2" @click="saveTask">Save</button>
     <button class="btn btn-outline-secondary" @click="cancelTask">Cancel</button>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import CardItem from './components/Card/CardItem.vue';

export default {
 components: {
  CardItem,
 },
 head: {
  title: 'Todo List',
 },
 data() {
  return {
   // Daftar task
   tasks: [
    {
     title: 'Task 1',
     description: 'ini deskripsi 1',
     isDone: false,
    },
   ],
   isCreating: false,
   titleValue: '',
   descriptionValue: '',
   isGrid: false,
  };
 },
 methods: {
  saveTask() {
   if (this.titleValue.trim() !== '') {
    this.tasks.push({
     title: this.titleValue,
     description: this.descriptionValue,
     isDone: false,
    });
    this.titleValue = '';
    this.descriptionValue = '';
    this.isCreating = false;
   }
  },
  cancelTask() {
   this.titleValue = '';
   this.descriptionValue = '';
   this.isCreating = false;
  },
 },
};
</script>
