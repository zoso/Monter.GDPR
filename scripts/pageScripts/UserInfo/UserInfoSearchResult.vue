<template>
    <div class="col-sm-6">
        <div class="person">
            <h2 class="h2">
                Person info
            </h2>
            <div class="row">
                <div class="col-sm-6">
                    <div>Id: {{ post.id }}</div>
                    <div>Navn: {{ post.firstName }} {{ post.lastName }}</div>
                    <div>Phone: {{ post.phone }}</div>
                    <div>Address: {{ post.zipCode }} {{ post.city }}</div>
                    <div>Email: {{ post.email }}</div>
                </div>
                <div class="col-sm-6 text-right">
                    <img :src="post.avatar" />
                </div>
            </div>
            <h2 class="h2">
                Newsletter:
            </h2>
            <div>
                Reg. date: {{ timestamp(post.newsletter.regDate )}}
                <ul>
                    <li>
                        <input type="checkbox" :id="['tips' + post.id]" v-model="post.newsletter.options.tips">
                        <label :for="['tips' + post.id]">Tips</label>
                    </li>
                    <li>
                        <input type="checkbox" :id="['competition' + post.id]" v-model="post.newsletter.options.competition">
                        <label :for="['competition' + post.id]">Competition</label>
                    </li>
                    <li>
                        <input type="checkbox" :id="['campaign' + post.id]" v-model="post.newsletter.options.campaign">
                        <label :for="['campaign' + post.id]">Campaign</label>
                    </li>
                    <li>
                        <input type="checkbox" :id="['news' + post.id]" v-model="post.newsletter.options.news">
                        <label :for="['news' + post.id]">News</label>
                    </li>
                    <li>
                        <input type="checkbox" :id="['inspiration' + post.id]" v-model="post.newsletter.options.inspiration">
                        <label :for="['inspiration' + post.id]">Inspiration</label>
                    </li>
                    <!-- <li>All:  {{ post.newsletter.options.all }}</li> -->
                </ul>
            </div>
            <div>
                <h2 class="h2">
                    Calculations:
                </h2>
                <ul>
                    <li>Garage: {{ post.calculations.garage }}</li>
                    <li>Roof: {{ post.calculations.roof }}</li>
                    <li>Terrasse: {{ post.calculations.terrasse }}</li>
                </ul>
            </div>
            <div>
                <h2 class="h2">
                    Trailer:
                </h2>
                <div class="trailer-info" v-for="d in post.trailer.dates" :key="d.date">
                    <div>Type: {{ d.type }}</div>
                    <div>When: {{ timestamp(d.date) }}</div>
                    <div>Warehouse: {{ d.warehouse }}</div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12" v-if="isUpdating">
                    <p>Oppdaterer...</p>
                </div>
                <div class="col-sm-12" v-if="showDelete">
                    <p><strong>Er du sikker på at du vil slette all informasjon?</strong></p>
                    <div>
                        <button class="btn btn-danger" type="button" v-on:click="doDeleteUser(post.id)">
                            Ja, slett informasjonen
                        </button>
                        <button class="btn btn-success" type="button" v-on:click="doAbortDeleteUser()">
                            Nei, jeg angrer
                        </button>
                    </div>
                </div>
                <div class="col-sm-12" v-if="!showDelete">
                    <button class="btn btn-success" type="button" v-on:click="doUpdate(post.id)" :disabled="isUpdating">
                        Save/update changes
                    </button>
                    <button class="btn btn-danger" type="button" v-on:click="doDelete()" :disabled="isUpdating">
                        Delete my info
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="col-sm-4 text-right">
        <img :src="post.avatar" />
    </div> -->
</template>

<script>
import moment from "moment";
export default {
  props: ["post"],
  data() {
      return {
          showDelete: false,
          isUpdating: false,
      }
  },
  methods: {
    timestamp(d) {
      return moment(d).format("DD.MM.YYYY - hh.mm");
    },
    doDelete(id) {
      this.showDelete = true;
    },
    doUpdate(id) {
      this.isUpdating = true;
      this.$emit("update-user", id, res => {
        setTimeout(() => {
            this.isUpdating = false;
        }, 1000);
      });
    },
    doDeleteUser(id) {
        this.$emit("delete-user", id);
    },
    doAbortDeleteUser() {
        this.showDelete = false;
    }
  }
};
</script>