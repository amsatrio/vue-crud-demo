import { defineStore } from 'pinia';

export interface TResetPassword {
    id?: number;
    oldPassword: string;
    newPassword: string;
    resetFor: string;
}

let base_url = import.meta.env.VITE_BACKEND_HOSPITAL_URL + "/t-reset-password";

export const useTResetPasswordStore = defineStore('tresetpassword', {
    state: () => ({
        data: { oldPassword: '', newPassword: '', resetFor: '' } as TResetPassword,
        pagedata: [] as TResetPassword[],
        loading: false,
        pagination: {
            totalPages: 0,
            totalElements: 0,
            size: 5,
            number: 0
        },
    }),
    actions: {
        async fetchPageData(page = 0, size = 5) {
            this.loading = true;
            try {
                const res = await fetch(`${base_url}?page=${page}&size=${size}`);
                let json = await res.json();
                this.pagedata = json.data.content;
                this.pagination = {
                    totalPages: json.data.totalPages,
                    totalElements: json.data.totalElements,
                    size: json.data.size,
                    number: json.data.number
                };
            } finally {
                this.loading = false;
            }
        },
        async saveData(id: number | null) {
            this.loading = true;
            const method = id ? 'PUT' : 'POST';
            const url = base_url;


            try {
                await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: id || undefined,
                        oldPassword: this.data.oldPassword,
                    newPassword: this.data.newPassword,
                    resetFor: this.data.resetFor
                    }),
                });
                await this.fetchPageData(this.pagination.number, this.pagination.size);
            } finally {
                this.loading = false;
            }
        },
        async deleteData(id: number) {
            this.loading = true;
            try {
                await fetch(`${base_url}/${id}`, { method: 'DELETE' });
                await this.fetchPageData(this.pagination.number, this.pagination.size);
            } finally {
                this.loading = false;
            }
        }
    }
});
