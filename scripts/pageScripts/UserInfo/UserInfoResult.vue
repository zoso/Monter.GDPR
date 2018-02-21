<template>
    <div class="row">
        <div class="col-sm">
            <label for="email">Epost:</label>
            <div class="input-group mb-3">
                <input id="email" type="text" class="form-control" placeholder="Din epostadresse" aria-label="Din epostadresse" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-dark" type="button" v-on:click="fetchData">Finn info</button>
                </div>
            </div>
            <div v-html="msg">{{ msg }}</div>
        </div>
        <div class="col-sm-12">
            <!-- <div class="row" v-if="showDelete">
                <div class="col-sm-12">
                    Er du sikker på at du vil slette all informasjon?
                    <div>
                        <button class="btn btn-danger" type="button" v-on:click="doDeleteUser">
                            Ja, slett informasjonen
                        </button>
                        <button class="btn btn-success" type="button" v-on:click="doAbortDeleteUser">
                            Nei, jeg angrer
                        </button>
                    </div>
                </div>
            </div> -->
            <p>
                Antall personer i database: {{ posts.length }}
            </p>
            <div class="row">
                <SearchResult v-on:delete-user="doDeleteUser" v-on:update-user="updateUser" v-for="post in posts" :post.sync="post" :key="post.id"></SearchResult>
            </div>
        </div>
    </div>

</template>

<script>
    import SearchResult from './UserInfoSearchResult.vue'
    import Axios from 'axios'

    export default {
        data() {
            return {
                msg: '',
                edit: false,
                posts: [],
                currentId: 0,
                showDelete: false,
            }
        },
        components: { SearchResult },
        methods: {
            validate(email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            fetchData() {
                this.posts.users = {};
                const val = document.getElementById("email").value;
                if (val === '') {
                    this.msg = '<p>Det skal ikke være mulig med tomt søk. Kun for testing</p>';
                    Axios.get(`http://localhost:3000/users`).then(res => {
                        this.posts = res.data;
                    });
                } else if (!this.validate(val)) {
                    this.msg = '<p>Nja, kanskje ikke en epostadresse, men prøver et søk da</p>';
                    this.posts = [];
                    Axios.get(`http://localhost:3000/users?q=${val}`).then(res => {
                        if (res.data.length > 0) {
                            let str = '<p>Fant disse resultatene:</p>';
                            for (var i = 0; i < res.data.length; i++) {
                                str += `<p>Name: ${res.data[i].firstName} ${res.data[i].lastName}</p>`;
                            }
                            this.msg = str;
                        } else {
                            this.msg = '<p>Ingen treff</p>';
                        }
                        
                    });
                } else {
                    this.msg = '';
                    Axios.get(`http://localhost:3000/users?email=${val}`).then(res => {
                        if (res.data.length > 0) {
                            this.posts = res.data;
                        } else {
                            this.msg = `<p>Fant ikke noe data knyttet til denne eposten: ${val}</p>`;
                        }
                    });
                }
            },
            /* deleteUser(id) {
                this.currentId = id;
                this.showDelete = true;
            }, */
            doDeleteUser(id) {
                this.showDelete = false;
                Axios.delete(`http://localhost:3000/users/${id}`).then(res => {
                    this.posts = this.posts.filter(function(item) {
                        return item.id !== id;
                    });
                });
            },
            /* doAbortDeleteUser() {
                this.showDelete = false;
            }, */
            updateUser(id, callback) {
                let obj;
                for (var i = 0; i < this.posts.length; i++) {
                    if (this.posts[i].id === id) {
                        obj = this.posts[i];
                        break;
                    }
                }
                Axios.patch(`http://localhost:3000/users/${id}`, obj).then(res => {
                    // if statusText...?
                    callback(true);
                });
            },
            saveUser(id) {
                /* const updated = {
                    name: this.post.name,
                    username: this.post.username
                }
                this.$emit('change-user', id, updated) */
            }
        }
    }

    window.onbeforeunload = function(e) {
        var dialogText = 'Dialog text here';
        e.returnValue = dialogText;
        return dialogText;
    };
</script>
