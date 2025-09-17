//Fetch Refactor
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function(){ 
    try{
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        updateUI(movies);
    }catch(e){
        document.querySelector('.movie-container').innerHTML =`<div class="alert alert-danger" role="alert">${e} <span class="badge bg-secondary"><h5>Error Cuy</h5></span> </div>`;
    }
});

//Ketika kita menggunakan fetch problemnya adalah error yang ditangkap oleh fetch itu hanya error yang ada pada networknya / urlnya

//for film
function getMovies(keyword){
    return fetch('https://www.omdbapi.com/?apikey=e99e9261&s='+keyword) //fetch hanya akan reject ketika networknya error
        
        .then(response => { //1. menangkap error pada API key yang eror / halaman yang salah ex : htpp
            console.log(response); // cek isi response
            if(!response.ok){ //jika respon not ok, !ok
                throw new Error(response.statusText); //melempar error yang akan ditangkap oleh catch
            }
            return response.json();
        })  //response.json() buat method ini hanya akan jalan ketika API key (datanya) nya benar / ketika filmnya ada / ketika ada yang diketikkan di kolom pencarian, jadi buat kondisinya dulu

        .then(response => { //2. menangkap error pada pencarian yang kosong / pencarian yang tidak ada
            console.log(response); //cek isi response
            if(response.Response === "False"){
                throw new Error(response.Error);
            }
            return response.Search; //jika pencarian ada nilainya maka akan mengembalikan object Search
            
        });
    }


function updateUI(movies){
    //console.log(movies)
    let cards = '';
    movies.forEach(m => cards += showCard(m));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}




//Event binding for detail
document.addEventListener('click', async function (e){
    if(e.target.classList.contains('modal-detail-button')){
        try {
            const imdbid = e.target.dataset.imdbid;
            const movieDetail = await getMovieDetail(imdbid);
            updateUIDetail(movieDetail);
        } catch (err) {
            document.querySelector('.modal-body').innerHTML =`<div class="alert alert-danger" role="alert">${err} <span class="badge bg-secondary"><h5>Error Cuy</h5></span> </div>`;
        }
        
    }
})

//for detail
function getMovieDetail(imdbid){
    return fetch('https://www.omdbapi.com/?apikey=e9e9261&i='+imdbid)
        .then(response => {
            console.log(response)
            if(!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(m => m);
}

function updateUIDetail(m){
    const movieDetail = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}





function showCard(m) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`
}


function showMovieDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
                            <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                            <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong> <br> ${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`                
}



