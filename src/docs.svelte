<script>
  import Sortable from "./index.svelte";
  import { quintOut } from "svelte/easing";
  import { flip } from "svelte/animate";
  import { crossfade } from "svelte/transition";

  import Logo from "./logo.svelte";

  const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 250,
        easing: quintOut,
        css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
      };
    }
  });

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
    flex-flow: column;
    align-items: stretch;
    justify-content: space-around;
    height: 100%;
  }

  #todos {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }
  #console-a {
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
  #console-b {
    white-space: pre;
    font-family: monospace;
    font-weight: bold;
  }
  .item {
    list-style: none;
    display: block;
    box-shadow: 0 0 0 2px black;
    padding: 5px;
    user-select: none;
    cursor: grab;
  }
</style>

<div id="docs">
  <Logo />
  <div id="todos">
    <div id="console-a">
      <button on:click={addtoList}>Add</button>
      {JSON.stringify(list, 0, 4)}
    </div>
    <Sortable id="sortable-a" {options} bind:list>
      {#each list as item (item.id)}
        <li
          in:receive={{ key: item.id }}
          out:send={{ key: item.id }}
          animate:flip={{ duration: 250 }}
          data-id={item.id}
          class="item"
          style="background:{item.color};">
          {item.name}
        </li>
      {/each}
    </Sortable>
    <Sortable id="sortable-b" options={options2} bind:list={list2}>
      {#each list2 as item (item.id)}
        <li
          in:receive={{ key: item.id }}
          out:send={{ key: item.id }}
          animate:flip={{ duration: 250 }}
          data-id={item.id}
          class="item"
          style="background:{item.color};">
          {item.name}
        </li>
      {/each}
    </Sortable>
    <div id="console-b">
      <button on:click={addtoList2}>Add</button>
      {JSON.stringify(list2, 0, 4)}
    </div>
  </div>
</div>
