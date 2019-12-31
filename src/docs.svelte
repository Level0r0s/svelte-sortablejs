<script>
  import Sortable from "./index.svelte";

  let options = {
    group: "people",
    draggable: ".item"
  };
  let options2 = {
    group: "people",
    draggable: ".item"
  };
  let list = [
    { id: "_mario", name: "mario", color: "red" },
    { id: "_luigi", name: "luigi", color: "greenyellow" }
  ];
  let list2 = [
    { id: "_wario", name: "wario", color: "yellow" },
    { id: "_waluigi", name: "waluigi", color: "purple" }
  ];

  function addtoList() {
    list.push({
      id: "add_" + Math.random().toString(36),
      name: "new item",
      color: "orange"
    });
    list = list;
  }
  function addtoList2() {
    list2.push({
      id: "add_" + Math.random().toString(36),
      name: "new item",
      color: "pink"
    });
    list2 = list2;
  }
</script>

<style>
  #docs {
    display: flex;
  }
  #console-a {
    white-space: pre;
    font-family: monospace;
    font-weight: bold;
  }
  #console-b {
    white-space: pre;
    font-family: monospace;
    font-weight: bold;
  }
  :global(#sortable-a) {
    flex: 1;
  }
  :global(#sortable-b) {
    flex: 1;
  }
  .item {
    list-style: none;
    display: block;
    box-shadow: 0 0 0 2px black;
    padding: 5px;
  }
</style>

<div id="docs">
  <div id="console-a">
    <button on:click={addtoList}>Add</button>
    {JSON.stringify(list, 0, 4)}
  </div>
  <Sortable id="sortable-a" {options} bind:list>
    {#each list as item}
      <li data-id={item.id} class="item" style="background:{item.color};">
        {item.name}
      </li>
    {/each}
  </Sortable>
  <Sortable id="sortable-b" options={options2} bind:list={list2}>
    {#each list2 as item}
      <li data-id={item.id} class="item" style="background:{item.color};">
        {item.name}
      </li>
    {/each}
  </Sortable>
  <div id="console-b">
    <button on:click={addtoList2}>Add</button>
    {JSON.stringify(list2, 0, 4)}
  </div>
</div>
