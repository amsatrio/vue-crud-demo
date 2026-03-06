<template>
    <div>
        <h1>INDEX</h1>
        <div>
            <label for="first_name" class="">First name</label>
            <input type="text" class="input" id="first_name" placeholder="John" required />
        </div>
        <button type="button" class="btn" @click="showModal()">show modal</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2'


const firstName = ref('');
const firstNameError = ref('');

function showModal() {
    Swal.fire({
        theme: 'bootstrap-5',
        title: "Do you want to save the changes?",
        showConfirmButton: true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
        cancelButtonText: `Cancel`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
}
</script>

<style lang="scss" scoped></style>