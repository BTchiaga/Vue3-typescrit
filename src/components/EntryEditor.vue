<script lang="ts" setup>
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";
import { computed,inject,onMounted,ref} from "vue"
import Emoji from "@/types/Emojis"
import Entry  from "@/types/Entry"
import { userInjectKey } from "@/injectionKeys";

//data
const body = ref("")
const emoji = ref<Emoji|null> (null)
const maxChars = 280
const charCount = computed(()=>body.value.length)
//events
// defineEmits(["@create"]); runtime declaration


// template refs
const textarea =  ref<HTMLTextAreaElement | null>(null) // null is becessary here since the text  element wont exist till the text area is mounted

onMounted(() => 
  textarea.value?.focus()
)

//type base declaration
const emit = defineEmits<{
  (e:"@create",entry:Entry):void

}>(); 
 const user= inject(userInjectKey)
//Methods
const handleTextInput= (e:Event)=>{
const textarea= e.target as HTMLTextAreaElement;
if(textarea.value.length <= 280){
  body.value= textarea.value
}else {
 body.value = textarea.value = textarea.value.substring(0,maxChars)
}
}
const handleSubmit = ()=>{
emit('@create',{
    body:body.value,
    emoji:emoji.value,
    createAt:new Date(),
    userId:1,
    id:Math.random()
    })
    body.value=""
    emoji.value=null
    textarea.value?.focus()
}
</script> 
<template>
  <form class="entry-form" @submit.prevent="handleSubmit">
    <textarea :value="body" ref="textarea" @keyup="handleTextInput" :placeholder="`New Journal Entry for ${user?.username || 'Anonymous'}`"></textarea>
    <EmojiField v-model="emoji"/>
    <div class="entry-form-footer">
      <span>{{ charCount }}/ {{maxChars}}</span>
      <button>Remember <ArrowCircleRight width="20" /></button>
    </div>
  </form>
</template>
