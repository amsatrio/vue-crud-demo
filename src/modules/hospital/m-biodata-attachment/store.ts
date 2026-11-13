import { defineStore } from 'pinia';

export interface MBiodataAttachment {
    id?: number;
    biodataId: number | null;
    fileName: string;
    filePath: string;
    fileSize: number | null;
    file: File | string | null;
}

let base_url = import.meta.env.VITE_BACKEND_HOSPITAL_URL + "/m-biodata-attachment";

export const useMBiodataAttachmentStore = defineStore('mbiodataattachment', {
    state: () => ({
        data: { biodataId: null, fileName: '', filePath: '', fileSize: null, file: null } as MBiodataAttachment,
        pagedata: [] as MBiodataAttachment[],
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

            // Build multipart form data
            const formData = new FormData();
            if (id) formData.append('id', id.toString());
            if (this.data.biodataId) formData.append('biodataId', String(this.data.biodataId));
            if (this.data.fileName) formData.append('fileName', this.data.fileName);
            if (this.data.filePath) formData.append('filePath', this.data.filePath);
            if (this.data.fileSize) formData.append('fileSize', String(this.data.fileSize));
            if (this.data.file) formData.append('file', this.data.file);
            try {
                await fetch(url, {
                    method: method,
                    body: formData,
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
