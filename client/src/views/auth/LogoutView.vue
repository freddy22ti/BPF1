<template>
    
</template>

<script setup>
import { logout } from "@/services/auth.service";
import { useRouter } from "vue-router";

const router = useRouter();
logout();
router.push("/login");
</script>
