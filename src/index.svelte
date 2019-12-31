<script context="module">
  let dragginglist;
</script>

<script>
  import sortablejs from "sortablejs";
  import { onMount } from "svelte";
  import {
    createCustoms,
    removeNodes,
    insertNodes,
    getMode,
    handleStateRemove,
    handleStateAdd,
    ID,
    handleStateChanges
  } from "./utils";
  export let id = undefined;
  export let list = [];
  export let setList = () => {};
  export let clone = (item, evt) => ({ ...item, id: ID() });
  export let options = {};
  let el, sortable;

  onMount(() => {
    sortable = sortablejs.create(el, {
      ...options,
      onStart(evt) {
        dragginglist = list;
      },

      onEnd(evt) {
        dragginglist = null;
      },
      onAdd(evt) {
        const otherList = [...dragginglist];
        const customs = createCustoms(evt, otherList);
        removeNodes(customs);
        const newList = handleStateAdd(customs, list);
        setList(newList);
      },
      onRemove(evt) {
        const mode = getMode(evt);
        const customs = createCustoms(evt, list);
        insertNodes(customs);

        let newList = [...list];
        // remove state if not in clone mode. otherwise, keep.
        if (evt.pullMode !== "clone")
          newList = handleStateRemove(customs, newList);
        // if clone, it doesn't really remove. instead it clones in place.
        // @todo -
        else {
          // switch used to get the clone
          let customClones = customs;
          switch (mode) {
            case "multidrag":
              customClones = customs.map((item, index) => ({
                ...item,
                element: evt.clones[index]
              }));
              break;
            case "normal":
              customClones = customs.map((item, index) => ({
                ...item,
                element: evt.clone
              }));
              break;
            case "swap":
            default: {
              invariant(
                true,
                `mode "${mode}" cannot clone. Please remove "props.clone" from <ReactSortable/> when using the "${mode}" plugin`
              );
            }
          }
          removeNodes(customClones);

          // replace selected items with cloned items
          customs.forEach(curr => {
            const index = curr.oldIndex;
            const newItem = clone(curr.item, evt);
            newList.splice(index, 1, newItem);
          });
        }

        // remove item.selected from list
        newList = newList.map(item => ({ ...item, selected: false }));
        setList(newList);
      },
      onUpdate(evt) {
        const customs = createCustoms(evt, list);
        removeNodes(customs);
        insertNodes(customs);
        const newList = handleStateChanges(customs, list);
        return setList(newList);
      }
    });
  });
</script>

<style>

</style>

<div {id} class="svelte-sortable" bind:this={el}>
  <slot />
</div>
