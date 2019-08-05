<template>
    <section>
    </section>
</template>

<script>
import api from '@/api/common/login'

export default {
    name: "AppHome",
    mounted() {
        api.getRules().then(({ data }) => {
            this.$router.push('/home');
        }).catch(() => {
            this.$message.closeAll();
        });
    }
};
</script>
