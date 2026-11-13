import { defineStore } from 'pinia';

export interface TToken {
    id?: number;
    email: string;
    userId: number | null;
    token: string;
    expiredOn: string;
    isExpired: boolean;
    usedFor: string;
}

let base_url = import.meta.env.VITE_BACKEND_HOSPITAL_URL + "/t-token";

export const useTTokenStore = defineStore('ttoken', {
    state: () => ({
        data: { email: '', userId: null, token: '', expiredOn: '', isExpired: false, usedFor: '' } as TToken,
        pagedata: [] as TToken[],
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
                        email: this.data.email,
                    userId: this.data.userId,
                    token: this.data.token,
                    expiredOn: this.data.expiredOn,
                    isExpired: this.data.isExpired,
                    usedFor: this.data.usedFor
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
