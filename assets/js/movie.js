const movieContainer = document.getElementById("movieContainer");
const backicon = document.getElementById("backicon");
const movieTrailerSlider = document.getElementById("movieTrailerSlider");
const iframe = document.getElementById("iframe");
const backdrop = document.getElementById("backdrop");
const movieTrailer = document.getElementById("movieTrailer");

const movietemplating = (movieobj,moviecast) => {
    let result = `
                <figure class="movieimg pl-1 pl-md-5 h-100 d-flex align-items-center">
                    <img src="${imgBaseUrl}${movieobj.production_companies[0].logo_path || movieobj.production_companies[1].logo_path || movieobj.production_companies[2].logo_path}" 
                    alt="${movieobj.title || movieobj.original_title}" 
                    title="${movieobj.title || movieobj.original_title}" class="logo">
                    <figcaption>
                        <h2 class="text-capitalize m-0">${movieobj.title || movieobj.original_title}</h2>
                        <h6 class="text-muted mb-3">${movieobj.tagline}</h6>
                        <ul class="movieinfo">
                        <li>${movieobj.release_date}</li>
                        <li>
                            <span>${movieobj.adult ? "A" : "U"}</span>
                        </li>
                        <li>${movieobj.original_language}</li>
                        <li>${mintohr(movieobj.runtime)}</li>
                        <li>
                            ${movieobj.genres.map(eve => eve.name)}
                        </li>
                        </ul>
                        <p>
                            ${movieobj.overview}
                        </p>
                        <p class="staring text-capitalize">
                        <strong>starring : </strong>
                        ${moviecast.cast.filter(castobj => castobj.order >= 0 && castobj.order <= 7).map(eve => eve.name)}
                        </p>
                    </figcaption>
                </figure>
    `
    movieContainer.innerHTML = result;
}

const mintohr = eve => {
    let hours = parseInt((eve/60))
    let minutes = (eve/60 - Math.floor(eve/60));
    let min = parseFloat(minutes.toString().split(".")[1].slice(0,2))
    if(min == 60){
        return `${hours + 1}h`
    }else if(min > 60){
        return `${hours + 1}h ${min - 60}m`
    }else{
        return `${hours}h ${min}m`
    }
}

const getTrailerId = (eve) => {
    // cl(eve);
    // $("#backdrop", "#movieTrailer").removeClass('d-none')
    backdrop.classList.remove('d-none');
    movieTrailer.classList.remove('d-none');
    let id = eve.dataset.id; // return DOMStringMap with key id
    cl(id);
    iframe.src = `https://youtube.com/embed/${id}`;
}

const trailerSlidertemp = eve => {
    let result = " ";
    eve.forEach(ele => {
        result += `
                <div class="item" data-id="${ele.key}" onclick="getTrailerId(this)">
                    <figure>
                    <img src="https://img.youtube.com/vi/${ele.key}/0.jpg" alt="${ele.name}" title="${ele.name}">
                    <figcaption>
                        <i class="fa-solid fa-circle-play fa-4x"></i>
                    </figcaption>
                    </figure>
                    <p>
                    ${ele.name}
                    </p>
                </div>
        `
    });
    movieTrailerSlider.innerHTML = result;
}

// $("backdrop", "movieTrailer").removeClass('d-none');

const removebackd = () => {
    backdrop.classList.add("d-none");
    movieTrailer.classList.add("d-none");
    iframe.src = " ";
}

backdrop.addEventListener("click", removebackd)

document.addEventListener("DOMContentLoaded", async () => {
    let currentUrl = new URL(window.location.href);
    let queryparams = new URLSearchParams(currentUrl.search);
    let movieId = queryparams.get("movieid"); //here we get movie id
    
    let movieUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;
    let movieVideosUrl = `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`;
    let movieCreditsUrl = `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`;

    // let movieobj = await makeApiCall(movieUrl, "GET");
    // let movieVideosobj = await makeApiCall(movieVideosUrl, "GET");
    // let movieCreditsobj = await makeApiCall(movieCreditsUrl, "GET");

    let allMovieData = await Promise.all([makeApiCall(movieUrl, "GET"), makeApiCall(movieVideosUrl, "GET"), makeApiCall(movieCreditsUrl, "GET")])
    let [moviedata, movievideos, movieCredits] = allMovieData;
    movietemplating(moviedata,movieCredits);
    const heroimg = document.getElementById("hero-img");
    heroimg.style.backgroundImage = `url(${imgBaseUrl}${moviedata.backdrop_path})`
    trailerSlidertemp(movievideos.results);
    $('#movieTrailerSlider').owlCarousel({
        loop: false,
        margin: 15,
        dots: false,
        responsive:{
            0:{
                items:1
            },
            500:{
                items:2
            },
            800:{
                items:3,
                nav: true,
            },
            1100:{
                items:4,
                nav: true,
            }
        }
    })

})

backicon.addEventListener("click", () => {
    history.back();
})