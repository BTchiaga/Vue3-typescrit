<script lang="ts" setup>
import { userInjectKey } from "@/injectionKeys";
import DateDisplay from "./DateDisplay.vue";
import UseEmojis from "@/composables/UseEmojis";
import Emoji from "@/types/Emojis";
import type Entry from "@/types/Entry";

import { inject } from "vue";
const { findEmoji } = UseEmojis();
/* const props = defineProps({
  entry:{type:Enty},
}) */ // runtime declaration , wont work here because of type interface

//Type base declaration with reactivity transform feature to allow dfault value for props
/* const {entry,randomProp="default value"} = defineProps<{
  entry:Entry
  randomProp:string
}>() */
defineProps<{
  entry:Entry;

}>()
const injectUser = inject(userInjectKey)
</script>
<template>
  <div class="entry-card">
    <div class="entry-card-body">
      <component width="75" :is="findEmoji(entry.emoji as Emoji)"></component>
      <div class="entry-text">{{entry.body }}</div>
    </div>
    <div class="entry-footer">
      <DateDisplay :date="entry.createAt" class="mr-2" />
      |
      <span class="ml-2">{{ injectUser?.username }}</span>
    </div>
  </div>
</template>
