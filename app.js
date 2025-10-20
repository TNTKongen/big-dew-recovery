
const STATES_STYLES = {0: "btn-danger", 1: "btn-warning", 2: "btn-success"};

const videosContainer = document.querySelector("#videos");
const newVideoPopup = document.querySelector("#new-video-popup");

const newVideoForm = document.querySelector("#new-video-form");
const newVideoFormUrl = document.querySelector("#new-video-url");
const newVideoFormTitle = document.querySelector("#new-video-title");
const newVideoFormNotes = document.querySelector("#new-video-notes");
const newVideoFormState = document.querySelector("#new-video-state");

let videos = [];

function addVideoHTML(index) {
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
    videosContainer.innerHTML = "";
    if (query) {
        videos = await getVideos();
    } else {
        videos = JSON.parse(sessionStorage.getItem("videos_cache"));
        if (videos === null) {
            videos = await getVideos();
        };
    };
    
    for (let i = 0; i < videos.length; i++) {
        addVideoHTML(i);
    };
    sessionStorage.setItem("videos_cache", JSON.stringify(videos));
};

function setOpenPopup(popupId, setOpen) {
    let popup = document.getElementById(popupId);
    if (setOpen) {
        popup.classList.remove("closed-popup");
    } else {
        popup.classList.add("closed-popup");
    };
};

newVideoForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target)

    setOpenPopup("new-video-popup", false);
    const data = await insertNewVideo(
        formData.get("new-video-url"),
        formData.get("new-video-state") == "3",
        formData.get("new-video-title"),
        formData.get("new-video-notes"),
        formData.get("new-video-state")
    );
    if (data == {}) {
        alert("Failed to add video (if you're seeing this, please tell me on signal)")
        setOpenPopup("new-video-popup", true);
        return
    }
    addVideoDataToVideos(data)
    refreshVideos()
    newVideoForm.reset();
});

function addVideoDataToVideos(data) {
    for (let i=0; i<videos.length; i++) {
        const video = videos[i];
        if (video.id == data.id) {
            videos[i] = Object.assign(video, data)
            break
        };
    };
};

refreshVideos(false);
