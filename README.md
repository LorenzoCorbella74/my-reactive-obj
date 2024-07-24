# my-reactive-obj

A super basic implementation of the reactivity system used in Vue.js based on this [article](https://ryangjchandler.co.uk/posts/the-magic-behind-reactivity-proxies):

```typescript
import { computed, effect, reactive } from "./reactive";

const lore = reactive({
  name: "Lorenzo",
  age: 50,
  address: {
    city: "Rome"
  }
});

// to track changes of specific properties
effect(() => {
  if (lore.address.city !== "Rome") {
    console.log("City has changed!");
  };
});
effect(() => {
  if (lore.name !== "Lorenzo") {
    console.log("Name has changed!");
  };
});

// to calculate dependant values
let sum = computed(() => lore.age + 10);

lore.address.city = "Firenze";
lore.name = "Batman";
lore.age = 60;

console.log("Computed value:", sum.value); // 70
```
