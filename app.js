
const STATES_STYLES = {0: "btn-danger", 1: "btn-warning", 2: "btn-success"};

let videosContainer = document.querySelector("#videos");
let videos = [];

function addVideo(index) {
    let video_data = videos[index];
    const statusCSS = STATES_STYLES[video_data["state"]] + " btn video";

    html = `
    <button type="button" class="${statusCSS}">
        <img class="video-img"/>
        <h3 class="video-title">${video_data["title"]}</h3>
        <p class="video-info">Creator: </p>
        <p class="video-info">Status: </p>
    </button>`;

    videosContainer.innerHTML += html;
};

async function refreshVideos(query=false) {
    videosContainer.innerHTML = ""
    if (query) {
        videos = await getVideos()
    } else {
        videos = JSON.parse(sessionStorage.getItem("videos_cache"))
        if (videos === null) {
            videos = await getVideos()
        }
    }
    
    for (let i = 0; i < videos.length; i++) {
        addVideo(i)
    }
    sessionStorage.setItem("videos_cache", JSON.stringify(videos))
}

refreshVideos(false);
