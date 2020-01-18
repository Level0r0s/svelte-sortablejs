<p align="center">
  <img  src="https://github.com/solidsnail/svelte-sortablejs/raw/master/docs/logo.png">
</p>


```
yarn add svelte-sortablejs
```

```js
<script>
import { flip } from "svelte/animate";
import Sortable from "svelte-sortablejs";

let list = [{ id: "_dodishes", name: "Do the dishes" }];
let options = {
  group: "people",
  draggable: ".todo"
};
</script>


<Sortable {options} bind:list>
        {#each list as todo (todo.id)}
          <li
            animate:flip={{ duration: 250 }}
            sortable-id={todo.id}
            class="todo">
            {todo.name}
          </li>
        {/each}
</Sortable>
```
