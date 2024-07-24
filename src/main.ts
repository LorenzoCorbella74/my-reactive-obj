import './style.css'

import { computed, effect, reactive } from "./reactive";

const lore = reactive({
  name: "Lorenzo",
  age: 50,
  address: {
    city: "Rome"
  }
});

effect(() => {
  if(lore.address.city !== "Rome"){
    console.log("City has changed!");
  };
});
effect(() => {
  if(lore.name !== "Lorenzo"){
    console.log("Name has changed!");
  };
});

// dependant values
let sum = computed(() => lore.age + 10);

lore.address.city = "Firenze";

lore.name = "Paperinik";

lore.age = 60;
console.log("Computed value:",sum.value);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = ``


