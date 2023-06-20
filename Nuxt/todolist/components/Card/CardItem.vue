<template>
 <div :class="['item-task', 'd-flex', 'align-items-start', 'border-bottom', 'pt-3', 'pb-4', isGrid ? 'col-12 col-md-6 col-lg-4' : 'col-12']" v-for="(task, index) of tasks" :key="index">
  <input type="checkbox" name="status" :id="'task-' + index" class="me-2 mt-2" v-model="task.isDone" />
  <div class="d-flex flex-column">
   <div class="title-task mb-1" :class="{ 'text-decoration-line-through': task.isDone, 'fst-italic': task.isDone }">{{ task.title }}</div>
   <div class="description-task small text-muted">{{ task.description }}</div>
   <a href="#" class="add-button" @click="deleteTask(index)">Delete</a>
  </div>
 </div>
</template>

<script>
export default {
 props: {
  tasks: {
   type: Object,
   default: 'Untitled',
  },
  isGrid: {
   type: Boolean,
   required: true,
   default: false,
  },
 },
 methods: {
  deleteTask(index) {
   this.tasks.splice(index, 1);
  },
 },
};
</script>
