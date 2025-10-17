
const statusStyles = {0: "btn-danger", 1: "btn-warning", 2: "btn-success"}

let videosContainer = document.querySelector("#videos")

let videos = [
    {"title": "Hello world!", "status": 0},
    {"title": "Big dew", "status": 1},
    {"title": "Haha yes", "status": 2}
]

function addVideo(index) {
    let video_data = videos[index]
    const statusCSS = statusStyles[video_data["status"]] + " btn video"

    html = `
    <button type="button" class="`+statusCSS+`">
        <div class="video-column">
            <h3>`+video_data["title"]+`</h3>
            <p>Status: </p>
        </div>
        <p>TEST</p>

    </button>`

    videosContainer.innerHTML += html
}

addVideo(0)
addVideo(1)
addVideo(2)