<script>
  /*

TODO: Refactor all of this

*/
  import Sortable from "./index.svelte";
  import { flip } from "svelte/animate";
  import { crossfade } from "svelte/transition";

  import Logo from "./logo.svelte";

  let value = "";

  let options = {
    group: "people",
    draggable: ".todo"
  };
  let list = [{ id: "_dodishes", name: "Do the dishes" }];
  let list2 = [];

  function addTodo() {
    list.push({
      id: "todo_" + Math.random().toString(36),
      name: value
    });
    value = "";
    list = list;
  }
  function deleteTodo(evt) {
    const id = evt.target.getAttribute("data-id");
    list = list.filter(item => item.id !== id);
  }
</script>

<style>
  #docs {
    display: flex;
    flex-flow: column;
    align-items: stretch;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
  }

  #todos {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    overflow: auto;
  }
  .console {
    white-space: pre;
    font-family: monospace;
    font-weight: bold;
    width: 300px;
    height: 100%;
    overflow: auto;
    padding: 5px;
    background: white;
    color: #d33906;
    font-size: 12px;
  }
  #input {
    display: flex;
    justify-content: center;
    align-items: stretch;
    padding: 20px 0px;
  }
  #input > input {
    padding: 10px;
    border-right: none;
    font-size: 20px;
    margin: 0px;
  }
  #input > button {
    margin: 0px;
  }
  #input > button:not(:disabled) {
    color: #ff3e00;
  }
  :global(#incomplete) {
    flex: 1;
    height: 300px;
    transform: perspective(50px) rotateY(5deg);
    box-shadow: -9px 9px 0px rgba(0, 0, 0, 0.05);
  }
  :global(#complete > .svelte-sortable > li) {
    text-decoration: line-through;
    background: #c7ffc7;
  }
  :global(#complete) {
    flex: 1;
    height: 300px;
    transform: perspective(50px) rotateY(-5deg);
    box-shadow: 9px 9px 0px rgba(0, 0, 0, 0.05);
  }
  .todo {
    list-style: none;
    display: block;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 5px;
    user-select: none;
    cursor: grab;
    border-top: 1px solid lightgrey;
    color: grey;
  }
  .todo:last-of-type {
    border-bottom: 1px solid lightgrey;
  }

  .card {
    border: 1px solid lightgray;
    padding: 0px;
    display: flex;
    flex-flow: column;
    margin: 0px 40px;
  }
  .card > h2 {
    font-weight: 100;
    border-bottom: 1px solid lightgray;
    margin: 0px;
    padding: 10px;
    margin-bottom: 5px;
  }
  .card > :global(.svelte-sortable) {
    width: 100%;
    min-height: 50px;
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1;
  }

  .delete-button {
    padding: 0px;
    border: none;
    background: none;
    outline: none;
    fill: grey;
    margin: 0px;
    cursor: pointer;
  }
</style>

<div id="docs">
  <Logo />
  <div>

    <div id="input">
      <input bind:value placeholder="What to procrastinate" type="text" />
      <button disabled={!value} on:click={addTodo}>+</button>
    </div>

  </div>
  <div id="todos">
    <div class="console">{JSON.stringify(list, 0, 4)}</div>
    <div class="card" id="incomplete">
      <h2>Incomplete</h2>
      <Sortable {options} bind:list>
        {#each list as todo (todo.id)}
          <li
            animate:flip={{ duration: 250 }}
            sortable-id={todo.id}
            class="todo">
            {todo.name}
            <button
              class="delete-button"
              data-id={todo.id}
              on:click={deleteTodo}>
              Delete
            </button>
          </li>
        {/each}
      </Sortable>
    </div>
    <div class="card" id="complete">
      <h2>Complete</h2>
      <Sortable {options} bind:list={list2}>
        {#each list2 as todo (todo.id)}
          <li
            animate:flip={{ duration: 250 }}
            sortable-id={todo.id}
            class="todo">
            {todo.name}
          </li>
        {/each}
      </Sortable>
    </div>
    <div class="console">{JSON.stringify(list2, 0, 4)}</div>
  </div>
</div>
