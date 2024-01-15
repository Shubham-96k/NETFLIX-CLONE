const cl = console.log;

const baseUrl = `https://api.themoviedb.org/3`;
const imgBaseUrl = `https://image.tmdb.org/t/p/original`;
const apiKey = `cfa77074bc2f78bfac9906341ab24814`;


const makeApiCall = async (apiUrl, methodname, msgbody = null) => {
    try {
        let respdata = await fetch(apiUrl, {
            method : methodname,
            body : msgbody,
            "content-type" : "application/json"
        })
        return respdata.json();
    } catch (error) {
        alert(error)
    }
}