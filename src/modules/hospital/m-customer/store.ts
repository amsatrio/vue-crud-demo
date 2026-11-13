import { defineStore } from 'pinia';

export interface MCustomer {
    id?: number;
    biodataId: number | null;
    dob: string;
    gender: string;
    bloodGroupId: number | null;
    rhesusType: string;
    height: number | null;
    weight: number | null;
}

let base_url = import.meta.env.VITE_BACKEND_HOSPITAL_URL + "/m-customer";

export const useMCustomerStore = defineStore('mcustomer', {
    state: () => ({
        data: { biodataId: null, dob: '', gender: '', bloodGroupId: null, rhesusType: '', height: null, weight: null } as MCustomer,
        pagedata: [] as MCustomer[],
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
                        biodataId: this.data.biodataId,
                    dob: this.data.dob,
                    gender: this.data.gender,
                    bloodGroupId: this.data.bloodGroupId,
                    rhesusType: this.data.rhesusType,
                    height: this.data.height,
                    weight: this.data.weight
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
