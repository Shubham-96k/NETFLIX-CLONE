

const trendingmovieContainer = document.getElementById("trendingmovieSlider");
const trendingMoviesUrl = `${baseUrl}/trending/all/week?api_key=${apiKey}`;


const loader = eve => {
    let movieId = eve.closest(".moviecard").id;
    let currentUrl = new URL(window.location.href);
    let queryParams = new URLSearchParams();
    queryParams.set("movieid", movieId);//here we set movieId
    currentUrl.search = queryParams;
    let movieUrl = `${currentUrl.origin}/movie.html${currentUrl.search}`;
    window.location.href = movieUrl;
    
    // let queryParams = new URLSearchParams(currentUrl.search);
    //after set currentUrl.search = queryparams.toString()
}
const trendmovietemp = arr => {
    let result = " ";
    arr.forEach(movieobj => {
        result += `
            <div class="item">
                <figure class="moviecard" id="${movieobj.id}">
                    <img src="https://image.tmdb.org/t/p/original${movieobj.poster_path}" alt="${movieobj.title || movieobj.name}" title="${movieobj.title || movieobj.name}">
                    <figcaption class="moviecaption d-flex justify-content-end justify-content-md-center flex-column">
                        <h2 class="display-3 mb-7 mb-md-3">${movieobj.original_title || movieobj.original_name}</h2>
                        <em class="d-none d-md-block">${movieobj.overview}</em>
                        <button class="btn btn-outline-danger" onclick="loader(this)">Watch Now</button>
                    </figcaption>
                </figure>
            </div>
        `
    });
    trendingmovieContainer.innerHTML = result;
}
const getTrendingMoviesData =  async () => {
    try {
        let data = await makeApiCall(trendingMoviesUrl, "GET");
        cl(data.results)
        trendmovietemp(data.results)
        $('#trendingmovieSlider').owlCarousel({
            loop:true,
            margin:10,
            nav:true,
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true,
            responsive:{
                0:{
                    items:1,
                    dots:false
                },
                768:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        })
    } catch (error) {
        alert(error)
    }
}
getTrendingMoviesData()