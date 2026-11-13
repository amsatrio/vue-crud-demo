import { defineStore } from 'pinia';

export interface MMedicalFacilitySchedule {
    id?: number;
    medicalFacilityId: number | null;
    day: string;
    timeScheduleStart: string;
    timeScheduleEnd: string;
}

let base_url = import.meta.env.VITE_BACKEND_HOSPITAL_URL + "/m-medical-facility-schedule";

export const useMMedicalFacilityScheduleStore = defineStore('mmedicalfacilityschedule', {
    state: () => ({
        data: { medicalFacilityId: null, day: '', timeScheduleStart: '', timeScheduleEnd: '' } as MMedicalFacilitySchedule,
        pagedata: [] as MMedicalFacilitySchedule[],
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
                        medicalFacilityId: this.data.medicalFacilityId,
                    day: this.data.day,
                    timeScheduleStart: this.data.timeScheduleStart,
                    timeScheduleEnd: this.data.timeScheduleEnd
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
