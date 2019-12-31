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
  function setList(newList) {
    list = newList;
  }
  function setList2(newList) {
    list2 = newList;
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
  <div id="console-a">{JSON.stringify(list, 0, 4)}</div>
  <Sortable id="sortable-a" {options} {list} {setList}>
    {#each list as item}
      <li data-id={item.id} class="item" style="background:{item.color};">
        {item.name}
      </li>
    {/each}
  </Sortable>
  <Sortable id="sortable-b" options={options2} list={list2} setList={setList2}>
    {#each list2 as item}
      <li data-id={item.id} class="item" style="background:{item.color};">
        {item.name}
      </li>
    {/each}
  </Sortable>
  <div id="console-b">{JSON.stringify(list2, 0, 4)}</div>
</div>
