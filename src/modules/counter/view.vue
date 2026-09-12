<template>
    <div>
        <p :innerHTML="counterStore.value"></p>
        <button type="button" class="btn" @click="increment()">increment</button>
        <button type="button" class="btn" @click="decrement()">decrement</button>
    </div>
</template>

<script setup>
import { useCounterStore } from '@/modules/counter/store';

const counterStore = useCounterStore();
function increment() {
    counterStore.increment();
}
function decrement() {
    counterStore.decrement();
}
</script>

<style lang="scss" scoped>

</style>