import { defineStore } from 'pinia';

export interface MDoctorEducation {
    id?: number;
    doctorId: number | null;
    educationLevelId: number | null;
    institutionName: string;
    major: string;
    startYear: string;
    endYear: string;
    isLastEducation: boolean;
}

let base_url = import.meta.env.VITE_BACKEND_HOSPITAL_URL + "/m-doctor-education";

export const useMDoctorEducationStore = defineStore('mdoctoreducation', {
    state: () => ({
        data: { doctorId: null, educationLevelId: null, institutionName: '', major: '', startYear: '', endYear: '', isLastEducation: false } as MDoctorEducation,
        pagedata: [] as MDoctorEducation[],
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
                        doctorId: this.data.doctorId,
                    educationLevelId: this.data.educationLevelId,
                    institutionName: this.data.institutionName,
                    major: this.data.major,
                    startYear: this.data.startYear,
                    endYear: this.data.endYear,
                    isLastEducation: this.data.isLastEducation
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
