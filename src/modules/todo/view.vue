<script setup>
import { ref, onMounted } from 'vue';
import { useTodoStore } from '@/modules/todo/store';

const store = useTodoStore();
const newTodoTitle = ref('');

onMounted(() => store.fetchTodos());

const submitTodo = () => {
  if (!newTodoTitle.value.trim()) return;
  store.addTodo(newTodoTitle.value);
  newTodoTitle.value = '';
};

const handleDelete = (id) => {
  if (confirm('Are you sure you want to delete this task?')) {
    store.deleteTodo(id);
  }
};

const handleToggleStatus = (todo) => {
  store.updateTodo(todo.id, { completed: !todo.completed });
};
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <button class="btn btn-primary mb-6" onclick="todo_modal_create.showModal()">create</button>
    <dialog id="todo_modal_create" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-lg font-bold">Create data</h3>
        <input v-model="newTodoTitle" type="text" placeholder="Type new todo..." class="input input-bordered w-full"
          @keyup.enter="submitTodo" />
        <div class="modal-action">
          <form method="dialog" class="flex gap-2 mb-6">
            <button class="btn btn-primary" @click="submitTodo">Submit</button>
            <button class="btn btn-secondary">Close</button>
          </form>
        </div>
      </div>
    </dialog>

    <div class="overflow-x-auto border border-base-300 rounded-box">
      <table class="table table-zebra w-full table-pin-rows">
        <thead>
          <tr class="bg-base-200">
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>User ID</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="todo in store.todos" :key="todo.id" class="hover">
            <th>{{ todo.id }}</th>
            <td :class="{ 'line-through opacity-50': todo.completed }">
              {{ todo.title }}
            </td>
            <td>
              <div class="badge" :class="todo.completed ? 'badge-success' : 'badge-ghost'">
                {{ todo.completed ? 'Completed' : 'Pending' }}
              </div>
            </td>
            <td>{{ todo.userId }}</td>
            <td>
              <div class="flex justify-center gap-2">
                <button @click="handleToggleStatus(todo)" class="btn btn-sm btn-outline btn-info">
                  {{ todo.completed ? 'Undo' : 'Done' }}
                </button>

                <button @click="handleDelete(todo.id)" class="btn btn-sm btn-square btn-outline btn-error">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>