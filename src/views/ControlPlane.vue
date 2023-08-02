<template>
    <h1>Control Plane</h1>
</template>

<script setup>
import httpClient from '@/http-service';
setTimeout(async function() {
    const response = await httpClient.get('/agent');
    console.log(response.data)
}, 5000)
</script>