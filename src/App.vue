<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "./components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";
import {provide, reactive} from "vue"
import type User from "@/types/User"
import type Entry from "@/types/Entry"
import { userInjectKey } from "./injectionKeys";
//data
const user:User = reactive({id:1,
username:"Btchiaga",settings:[]})
const entries = reactive([] as Array<Entry>)
  //create a symbol to ensure injection key is uniquue

provide(userInjectKey,user)
//Methods
const handleCreateEntry = (entry:Entry)=>{
  entries.unshift(entry)
  console.table(entry)

}
</script> 

<template>
  <main class="container m-auto p-10">
    <TheHeader />
    <EntryEditor @@create="handleCreateEntry"/>
    <ul>
      <li v-for="entry in entries" :key="entry.id" class="mb-4">
        <EntryCard  :entry="entry"/>
       
      </li>
    </ul>
  </main>
</template>
