<template>
  <view class="container">
    <TopSearchBar />
    <AnnularPlayBar/>
    <TabBar/>
  </view>
</template>

<script setup lang="ts">
import TopSearchBar from "@/components/TopSearchBar";
import TabBar from "@/components/TabBar";
import AnnularPlayBar from "@/components/AnnularPlayBar";

import { ref, onBeforeUnmount } from "vue";



</script>

<style lang="scss" scoped></style>
