<script setup>
    import { computed, ref,onMounted } from 'vue'
    import axios from 'axios'
    const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='
    let movies = ref([])
    const movieName = ref("")
        getMovies(API_URL).then((_movies) => {
        movies.value = _movies
        })
    
    const getMoviePosterPath = computed(() => (imgPath) => IMG_PATH + imgPath)
    const getRate = computed(() => (vote) => {
      if(vote >= 8) {
            return 'green'
        } else if(vote >= 5) {
            return 'orange'
        } else {
            return 'red'
        }
    })
    
    async function getMovies(url) {
        const res = await fetch(url)
        const data = await res.json()
        return data.results
    }
    function searchMovies(){
        axios({
            url:SEARCH_API+movieName.value,
            method: "get"
        }).then((res)=>{
            movies.value = res.data.results
            // console.log(movies.value)
        })
    }
    
    
</script>
    
    <template>
        <div>
      <header>
        <div id="form">
          <input type="text" id="search" class="search" placeholder="Search" v-model="movieName"
          @keydown.enter.native="searchMovies">
          <!-- <button type="submit" @click="searchMovies">search</button> -->
        </div>
        <!-- <form id="form" >
          <input type="text" id="search" class="search" placeholder="Search" v-model="movieName"
          @keydown.enter.native="searchMovies">
        </form> -->
      </header>
      <main id="main">
        <div v-for="movie in movies" :key="movie.id" class="movie">
          <img :src="getMoviePosterPath(movie.poster_path)" alt="movie.title">
          <div class="movie-info">
            <h3>{{movie.title}}</h3>
            <span :class="getRate(movie.vote_average)">{{movie.vote_average}}</span>
          </div>
          <div class="overview">
            <h3>Overview</h3>
            {{movie.overview}}
          </div>
        </div>
    
      </main>
    </div>
    </template>
    
    <style scoped>
    :root {
        --primary-color: #22254b;
        --secondary-color: #373b69;
      }
      
      * {
        box-sizing: border-box;
      }
      
      body {
        background-color: var(--primary-color);
        font-family: 'Poppins', sans-serif;
        margin: 0;
      }
      
      header {
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
        background-color: var(--secondary-color);
      }
      
      .search {
        background-color: transparent;
        border: 2px solid var(--primary-color);
        border-radius: 50px;
        font-family: inherit;
        font-size: 1rem;
        padding: 0.5rem 1rem;
        color: #fff;
      }
      
      .search::placeholder {
        color: #7378c5;
      }
      
      .search:focus {
        outline: none;
        background-color: var(--primary-color);
      }
      
      main {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .movie {
        width: 300px;
        margin: 1rem;
        background-color: var(--secondary-color);
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
        position: relative;
        overflow: hidden;
        border-radius: 3px;
      }
      
      .movie img {
        width: 100%;
      }
      
      .movie-info {
        color: #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap:0.2rem;
        padding: 0.5rem 1rem 1rem;
        letter-spacing: 0.5px;
      }
      
      .movie-info h3 {
        margin-top: 0;
      }
      
      .movie-info span {
        background-color: var(--primary-color);
        padding: 0.25rem 0.5rem;
        border-radius: 3px;
        font-weight: bold;
      }
      
      .movie-info span.green {
        color: lightgreen;
      }
      
      .movie-info span.orange {
        color: orange;
      }
      
      .movie-info span.red {
        color: red;
      }
      
      .overview {
        background-color: #fff;
        padding: 2rem;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        max-height: 100%;
        transform: translateY(101%);
        overflow-y: auto;
        transition: transform 0.3s ease-in;
      }
      
      .movie:hover .overview {
        transform: translateY(0);
      }
    </style>
    