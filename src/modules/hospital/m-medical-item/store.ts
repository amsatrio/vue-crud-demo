import { defineStore } from 'pinia';

export interface MMedicalItem {
    id?: number;
    name: string;
    medicalItemCategoryId: number | null;
    composition: string;
    medicalItemSegmentationId: number | null;
    manufacturer: string;
    indication: string;
    dosage: string;
    directions: string;
    contraindication: string;
    caution: string;
    packaging: string;
    priceMax: number | null;
    priceMin: number | null;
    image: File | string | null;
    imagePath: string;
}

let base_url = import.meta.env.VITE_BACKEND_HOSPITAL_URL + "/m-medical-item";

export const useMMedicalItemStore = defineStore('mmedicalitem', {
    state: () => ({
        data: { name: '', medicalItemCategoryId: null, composition: '', medicalItemSegmentationId: null, manufacturer: '', indication: '', dosage: '', directions: '', contraindication: '', caution: '', packaging: '', priceMax: null, priceMin: null, image: null, imagePath: '' } as MMedicalItem,
        pagedata: [] as MMedicalItem[],
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
            if (this.data.name) formData.append('name', this.data.name);
            if (this.data.medicalItemCategoryId) formData.append('medicalItemCategoryId', String(this.data.medicalItemCategoryId));
            if (this.data.composition) formData.append('composition', this.data.composition);
            if (this.data.medicalItemSegmentationId) formData.append('medicalItemSegmentationId', String(this.data.medicalItemSegmentationId));
            if (this.data.manufacturer) formData.append('manufacturer', this.data.manufacturer);
            if (this.data.indication) formData.append('indication', this.data.indication);
            if (this.data.dosage) formData.append('dosage', this.data.dosage);
            if (this.data.directions) formData.append('directions', this.data.directions);
            if (this.data.contraindication) formData.append('contraindication', this.data.contraindication);
            if (this.data.caution) formData.append('caution', this.data.caution);
            if (this.data.packaging) formData.append('packaging', this.data.packaging);
            if (this.data.priceMax) formData.append('priceMax', String(this.data.priceMax));
            if (this.data.priceMin) formData.append('priceMin', String(this.data.priceMin));
            if (this.data.image) formData.append('image', this.data.image);
            if (this.data.imagePath) formData.append('imagePath', this.data.imagePath);
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
