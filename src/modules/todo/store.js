import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        todos: [],
        loading: false,
    }),
    actions: {
        async fetchTodos() {
            this.loading = true;
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
                this.todos = await res.json();
            } finally {
                this.loading = false;
            }
        },
        async addTodo(title) {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    completed: false,
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            if(this.todos == undefined) {
                this.todos = []
            }
            // JSONPlaceholder returns the new ID. We unshift to show it at the top.
            this.todos.unshift(await res.json());
        },
        async updateTodo(id) {
            const todo = this.todos.find(t => t.id === id);
            if (!todo) return;

            const oldStatus = todo.completed;
            todo.completed = !todo.completed; // Local update

            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ completed: todo.completed }),
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
                });
                if (!response.ok) throw new Error('Toggle failed');
            } catch (err) {
                // Rollback if server fails
                todo.completed = oldStatus;
                console.error(err);
            }
        },
        async deleteTodo(id) {
            try {
                // Optimistic UI update: remove from list immediately
                this.todos = this.todos.filter(t => t.id !== id);

                const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) throw new Error('Delete failed on server');
            } catch (err) {
                console.error(err);
            }
        }
    }
});