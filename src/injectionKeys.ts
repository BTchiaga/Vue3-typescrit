import type { InjectionKey } from "vue"; //sync injected value accross provider and consumer
import User from "@/types/User"  
  
  export  const userInjectKey= Symbol() as InjectionKey<User>