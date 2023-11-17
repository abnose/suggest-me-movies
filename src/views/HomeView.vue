<script setup lang="ts">
import FaveMovie from "../ts/movies/str";
import { KEY } from "../secrets/key";
import Api from "../ts/api/movieApi";
import { ref } from "vue";
const loading = ref(false);

const selectedCities: any = ref();
const movieName = ref("");
const cities = ref(["Horror", "Action", "Comedy", "Romance", "Fiction"]);
const Movies = ref([]);

function addMovie() {
  FaveMovie.addMovie(movieName.value, selectedCities._rawValue);
  selectedCities.value = [];
  movieName.value = "";
  Movies.value = FaveMovie.getMovie();
}

function removeItem(id: number) {
  FaveMovie.removeMovie(id);
  Movies.value = FaveMovie.getMovie();
}

// const load = () => {
//   loading.value = true;
//   setTimeout(() => {
//     loading.value = false;
//   }, 2000);
// };

///////////////////////////////////////////////////////////////////////

const isValid = ref();

function checkMovie() {
  const reqContent = new senReq();
  reqContent.get(movieName.value);
  loading.value = true;
  setTimeout(() => {}, 3000);
}

class senReq extends Api {
  constructor() {
    super();
  }
  get(name: string) {
    this.request(KEY)
      .get(
        `/search/movie?query=${name}&include_adult=false&language=en-US&page=1`
      )
      .then((result) => {
        loading.value = false;
        if (result.data.results.length == 0) {
          isValid.value = false;
        } else {
          isValid.value = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<template>
  <div class="home">
    <h1>Suggest Movies To Me</h1>
    <div class="main">
      <InputGroup class="main--inputs">
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText placeholder="Enter Movie" v-model="movieName" />
        <div class="flex justify-content-center btnCon">
          <Button
            type="button"
            label="Check Movie"
            icon="pi pi-search"
            :loading="loading"
            @click="checkMovie"
          />
        </div>
      </InputGroup>
      <div class="with100">
        <MultiSelect
          v-model="selectedCities"
          :options="cities"
          optionLabel=""
          placeholder="Select Genres"
          :maxSelectedLabels="3"
          class="with100 w-full md:w-20rem"
        />
      </div>
      <Button label="Add" class="btnStyle" @click="addMovie" />
    </div>
    <div v-if="Movies.length" class="formGroup">
      <div v-for="movie in Movies" :key="movie.id" class="formGroup--card">
        <div class="card">
          <h3>{{ movie.name }}</h3>

          <Button
            :disabled="true"
            icon="pi pi-times"
            severity="danger"
            text
            rounded
            aria-label="Cancel"
            @click="removeItem(movie.id)"
          />
        </div>
        <img class="formGroup--card-img" src="../assets/7.jpg" />
        <div class="gen">
          <p class="genItem" v-for="gen in movie.genre" :key="'id' + gen">
            {{ gen }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
h3 {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 2em;
  padding: 0.25em 0.75em;
  border-radius: 5px;
  margin-left: 1em;
  color: gold;
}
.gen {
  position: absolute;
  right: 50%;
  bottom: 10%;
  transform: translate(50%, 10%);
  z-index: 5;
  color: #000;
  display: flex;
}
.genItem {
  border-radius: 5px;
  padding: 0.2em 0.4em;
  font-size: 1em;
  margin-left: 0.5em;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: black;
  text-shadow: 0 0 1px 1px black;
}
.card {
  background-image: linear-gradient(
    to right top,
    #05193744,
    #004d7a4f,
    #00879334,
    #00bf733d,
    #1216eb52
  );
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
}
.formGroup--card {
  width: 100%;
  background: #111827;
  height: 120px;
  border-radius: 5px;
  margin: 0.5em 1em;
  overflow: hidden;
  position: relative;
}
.formGroup--card {
  width: 100%;
  background: #111827;
  height: 120px;
  border-radius: 5px;
  margin: 0.5em 1em;
  overflow: hidden;
  position: relative;
}
.formGroup--card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.btnStyle {
  margin-top: 1em;
}
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2em;
}
.formGroup--inputs {
  margin-bottom: 1em;
}
.main--inputs {
  margin-bottom: 1em;
}
.with100 {
  width: 100%;
}
h1 {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  padding: 1em 2em;
}
.btnCon {
  margin: 0em 0em 0 1em;
}
.formGroup {
  /* background: #818cf8; */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 70%;
  height: auto;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: 5px;
  box-shadow: 0 0 1px rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.main {
  /* background: #818cf8; */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 70%;
  height: auto;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: 5px;
  box-shadow: 0 0 1px rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
