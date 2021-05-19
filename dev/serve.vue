<template>
  <div id="app">
    <tlc-front-components-crud-table
      title="Причины простоя"
      url-api="/downtime_causes"
      :itemsSelect="cause.itemsSelect"
      icon="mdi-comment-question-outline"
      :headers="cause.headers"
      is-crud
      isCheckPass
    />
  </div>
</template>

<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
import { TlcFrontComponentsCrudTable } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  components: {
   TlcFrontComponentsCrudTable,
  },
  data() {
    return {
      cause: {
        headers: [
          { text: "Имя", value: "name" },
          {
            text: "Группа",
            value: "groups.name",
            type: "select",
            itemSelect: "groups",
          },
          { text: "Действия", value: "actions", edited: false },
        ],
        loadingSelect: false,
        itemsSelect: {
          groups: null,
        },
      },
    }
  }
});
</script>
