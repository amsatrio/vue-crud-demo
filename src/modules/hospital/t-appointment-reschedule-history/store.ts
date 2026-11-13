import { defineStore } from 'pinia';

export interface TAppointmentRescheduleHistory {
    id?: number;
    appointmentId: number | null;
    doctorOfficeScheduleId: number | null;
    doctorOfficeTreatmentId: number | null;
    appointmentDate: string;
}

let base_url = import.meta.env.VITE_BACKEND_HOSPITAL_URL + "/t-appointment-reschedule-history";

export const useTAppointmentRescheduleHistoryStore = defineStore('tappointmentreschedulehistory', {
    state: () => ({
        data: { appointmentId: null, doctorOfficeScheduleId: null, doctorOfficeTreatmentId: null, appointmentDate: '' } as TAppointmentRescheduleHistory,
        pagedata: [] as TAppointmentRescheduleHistory[],
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
                        appointmentId: this.data.appointmentId,
                    doctorOfficeScheduleId: this.data.doctorOfficeScheduleId,
                    doctorOfficeTreatmentId: this.data.doctorOfficeTreatmentId,
                    appointmentDate: this.data.appointmentDate
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
