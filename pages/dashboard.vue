<script lang="ts" setup>
const user = useSupabaseUser();
</script>

<script lang="ts">
const authenticate = async () => {
  const supabase = useSupabaseClient();
  const redirectTo = ["diawur.biz.id", "www.diawur.biz.id"].includes(window.location.hostname)
    ? "https://diawur.biz.id/dashboard"
    : `${window.location.origin}/dashboard`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo,
    },
  });
  if (error) {
    console.error(error);
  }
};
</script>

<template lang="pug">
ShortlinkList(v-if="user")
div.flex.flex-col.items-center.justify-center.h-screen(v-if="!user")
  button(@click="authenticate") Authenticate with GitHub
</template>
<style lang="scss">
@import "~/assets/dashboard.scss";
</style>
