import { defineStore } from 'pinia';

export interface TDoctorOfficeTreatmentPrice {
    id?: number;
    doctorOfficeTreatmentId: number | null;
    price: number | null;
    priceStartFrom: number | null;
    priceUntilFrom: number | null;
}

let base_url = import.meta.env.VITE_BACKEND_HOSPITAL_URL + "/t-doctor-office-treatment-price";

export const useTDoctorOfficeTreatmentPriceStore = defineStore('tdoctorofficetreatmentprice', {
    state: () => ({
        data: { doctorOfficeTreatmentId: null, price: null, priceStartFrom: null, priceUntilFrom: null } as TDoctorOfficeTreatmentPrice,
        pagedata: [] as TDoctorOfficeTreatmentPrice[],
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
                        doctorOfficeTreatmentId: this.data.doctorOfficeTreatmentId,
                    price: this.data.price,
                    priceStartFrom: this.data.priceStartFrom,
                    priceUntilFrom: this.data.priceUntilFrom
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
