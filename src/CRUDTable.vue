<template>
  <base-material-card
    color="success"
    :icon="icon"
    :title="title"
    class="px-5 py-3"
  >
    <v-spacer />
    <v-data-table
      :headers="headers"
      :search="search"
      :loading="loading"
      loading-text="Загрузка... Ждите"
      :items="items"
      v-bind="$attrs"
      class="elevation-1"
      v-on="$listeners"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-row>
              <v-col cols="3">
                <v-btn
                  color="primary"
                  icon
                  large
                  :loading="loadingBtn"
                  @click="update"
                >
                  <v-icon>mdi-cached</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3">
                <div v-if="isCrud">
                  <v-dialog
                    v-model="dialogCheckPassword"
                    persistent
                    width="500"
                  >
                    <base-material-card
                      icon="mdi-key"
                      title="Потвердите права"
                    >
                      <v-card-title />
                      <v-card-text>
                        <v-row align-content="center">
                          <v-text-field
                            v-model="password"
                            label="Пароль"
                            type="password"
                          />
                        </v-row>
                      </v-card-text>
                      <v-card-actions>
                        <v-row>
                          <v-col>
                            <v-btn
                              width="160"
                              color="error"
                              class="mr-0"
                              @click="closeDialogCheckPassword"
                            >
                              Отмена
                            </v-btn>
                          </v-col>
                          <v-col class="d-flex justify-end">
                            <v-btn
                              width="160"
                              color="primary"
                              @click="confirmDialogCheckPassword"
                            >
                              Потвердить
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-actions>
                    </base-material-card>
                  </v-dialog>
                  <v-divider
                    class="mx-1"
                    inset
                    vertical
                  />
                  <v-dialog
                    v-model="dialogAdded"
                    max-width="700px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        large
                        dark
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              v-for="header in headers.filter(
                                (header) => header.edited != false
                              )"
                              :key="header.value"
                            >
                              <v-text-field
                                v-if="
                                  header.type == null || header.type == 'text'
                                "
                                v-model="editedItem[header.value]"
                                :label="header.text"
                              />
                              <div v-else-if="header.type == 'select'">
                                <v-select
                                  v-model="editedItem[header.itemSelect]"
                                  :items="itemsSelect[header.itemSelect]"
                                  :multiple="header.multiple"
                                />
                              </div>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="closeAddedDialog"
                        >
                          Отмена
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          :loading="loadingBtn"
                          text
                          @click="save"
                        >
                          Сохранить
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog
                    v-model="dialogDelete"
                    max-width="500px"
                  >
                    <v-card>
                      <v-card-title class="headline">
                        Вы уверены, что хотите удалить?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="closeDeleteDialog"
                        >
                          Нет
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          :loading="loadingBtn"
                          text
                          @click="deleteItemConfirm"
                        >
                          Да
                        </v-btn>
                        <v-spacer />
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-col>
            </v-row>
          </v-toolbar-title>
          <v-spacer />
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Поиск"
              single-line
              hide-details
            />
          </v-card-title>
        </v-toolbar>
      </template>
      <template
        v-for="slotName in Object.keys($scopedSlots)"
        #[slotName]="slotScope"
      >
        <slot
          :name="slotName"
          v-bind="slotScope"
        />
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItemAction(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItemAction(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template #no-data>
        <v-btn
          color="primary"
          @click="update"
        >
          Обновить
        </v-btn>
      </template>
    </v-data-table>
  </base-material-card>
</template>

<script>
import Axios from "axios";
import crypto from "crypto";
import BaseMaterialCard from "./componets/MaterialCard";
export default {
  name: "CRUDTable",
  compontens: { BaseMaterialCard },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    urlApi: {
      type: String,
      required: true,
    },
    itemsSelect: {
      type: Object,
      required: false,
      default: () => {
        return {};
      },
    },
    title: {
      type: String,
      default: "",
      required: true,
    },
    icon: {
      type: String,
      default: "",
      required: true,
    },
    isCrud: {
      type: Boolean,
      default: false,
    },
    isCheckPass: {
      type: Boolean,
      default: false,
    },
    query: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      search: "",
      items: [],
      loading: false,
      dialogAdded: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      selectModel: [],
      defaultItem: {},
      loadingBtn: false,
      dialogCheckPassword: false,
      password: "",
      entryPointApi: "",
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Добавление" : "Редактирование";
    },
  },
  watch: {
    // editedItem: {
    //   handler(value) {
    //     for (let key in value) {
    //       let editedItem = {key: []};
    //       if (this.editedItem[key] === Object(this.editedItem[key])){
    //         console.log(this.editedItem[key])
    //         // console.log(value, key);
    //         // this.editedItem[key] = value[key]["@id"];

    //       }
    //     }
    //   },
    //   deep: true,
    // },
    dialogAdded(val) {
      val || this.closeAddedDialog();
    },
    dialogDelete(val) {
      val || this.closeDeleteDialog();
    },
  },
  mounted() {
    this.update();
  },
  methods: {
    async update() {
      this.loading = true;
      this.loadingBtn = true;
      await this.updateItems();
      this.loadingBtn = false;
      this.loading = false;
    },

    editItemAction(item) {
      this.loadingBtn = false;
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      for (let key in this.itemsSelect){
        if(Array.isArray(item[key]))
          item[key].forEach((item) => this.editedItem[key].push(item["@id"]));
        else
          this.editedItem[key] = item[key]['@id'];
          // console.log(this.editedItem[key])
      }
      this.dialogAdded = true;
    },

    deleteItemAction(item) {
      this.loadingBtn = false;
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      if (this.checkPassword()) {
        this.loadingBtn = true;
        await this.deleteItem();
        await this.update();
        this.loadingBtn = false;
        this.closeDeleteDialog();
      }
    },
    closeAddedDialog() {
      this.dialogAdded = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDialogCheckPassword() {
      this.dialogCheckPassword = false;
      this.loadingBtn = false;
      this.password = "";
    },
    confirmDialogCheckPassword() {
      if (
        // TODO удалить
        // tls-pass
        crypto.createHash("sha512").update(this.password).digest("hex") ==
        "396d55a413d2c368e78ecefd2e818a79b09236e067ddb649a6cd24d85e3a25585bdb2f787c20a78e7b0ec8fc0ba348fc65a2fe85f674eaa67de678c6f8ade11d"
      ) {
        this.$store.commit("SET_ADMIN", true);
        this.closeDialogCheckPassword();
      } else {
        // console.log(this.$snotify);
        this.$snotify.error("Неверный пароль пароль");
        this.$store.commit("SET_ADMIN", false);
      }
    },
    closeDeleteDialog() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.loadingBtn = false;
        this.editedIndex = -1;
      });
    },

    async deleteItem() {
      const request = await Axios.delete(this.editedItem["@id"]);
      return request;
    },
    async editItem() {
      const request = await Axios.put(this.editedItem["@id"], this.editedItem);
      return request;
    },
    async updateItems() {
      this.items = [];
      // let items;
      const config = {
        params: this.query,
      };
      const request = await Axios.get(this.entryPointApi + this.urlApi, config);
      this.items = request.data["hydra:member"];

      // items.forEach((item, i, arr )=> {
      //   console.log(item, item === Object(item));
      //   for (let key in item) {
      //       if (item[key] === Object(item[key]))
      //         item[key] = item[key]["@id"];
      //   }
      //     // if( item === Object(item))
      //       // items[i] = item['@id'];
      //   });
      //   //   console.log(items[key] === Object(items[key]), items[key]);
      //   // }
      //   this.items = items;
      // for( let select in this.itemsSelect) {
      //   this.items.foreach(item => {
      //     item[select] = item[select]['@id'];
      //   })
      // }
      return request;
    },
    async addItem() {
      const request = await Axios.post(
        this.entryPointApi + this.urlApi,
        this.editedItem
      );
      return request;
    },

    checkPassword() {
      if (this.$store.getters.IS_ADMIN) return true;

      this.dialogCheckPassword = true;
    },
    removeObjectInSelect() {
      for (let key in this.editedItem) {
        // console.log(this.editedItem[key] === Object(this.editedItem[key]), this.editedItem[key] );
        if (this.editedItem[key] === Object(this.editedItem[key])) {
          this.editedItem[key] = this.editedItem[key].filter((item) => {
            return item !== Object(item);
          });
        }
      }
    },
    async save() {
      this.loadingBtn = true;
      if (this.checkPassword()) {
        if (this.editedIndex > -1) {
          this.removeObjectInSelect();
          Object.assign(this.items[this.editedIndex], this.editedItem);
          await this.editItem();
        } else {
          await this.addItem();
        }

        await this.update();
        this.closeAddedDialog();
      }
      this.loadingBtn = false;
    },
  },
};
</script>

<style></style>
