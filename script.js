$('.search-button').on('click', function () {
    
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=e99e9261&s='+$('.input-keyword').val(), //parameter s yang artinya search digunakan untuk mencari judul film, bisa juga menggunakan parameter i untuk mencari berdasarkan id film
        success: result => {
            const movies = result.Search;
            let cards = '';
            movies.forEach(m => {
                cards += showCard(m);
            });
            $('.movie-container').html(cards);
    
    
            //ketika tombol show detail di klik
            $('.modal-detail-button').on('click', function () {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=e99e9261&i='+ $(this).data('imdbid'), //menggunakan data attribute untuk mengambil imdbid 
                    success : m => {
                        const movieDetail = showMovieDetail(m);
    
                        //tampilkan di modal
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.error(e.responseText);
                    }
                });
            });
        },
        error:(e)=>{
            console.error(e.responseText);
        }
    });
});






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




//dengan menggunakan callback, mungkin aja kalian masuk ke dalam callback hell, untuk menghindari hal itu, kalian bisa menggunakan promise, atau async await, atau generator function
//jadi callback itu adalah sebuah function yang dipanggil ketika proses asynchronous selesai