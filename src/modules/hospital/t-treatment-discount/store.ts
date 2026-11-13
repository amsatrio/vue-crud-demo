import { defineStore } from 'pinia';

export interface TTreatmentDiscount {
    id?: number;
    doctorOfficeTreatmentPriceId: number | null;
    value: number | null;
}

let base_url = import.meta.env.VITE_BACKEND_HOSPITAL_URL + "/t-treatment-discount";

export const useTTreatmentDiscountStore = defineStore('ttreatmentdiscount', {
    state: () => ({
        data: { doctorOfficeTreatmentPriceId: null, value: null } as TTreatmentDiscount,
        pagedata: [] as TTreatmentDiscount[],
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
                        doctorOfficeTreatmentPriceId: this.data.doctorOfficeTreatmentPriceId,
                    value: this.data.value
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
