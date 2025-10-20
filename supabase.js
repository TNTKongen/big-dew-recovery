// I AM AWARE THIS IS A BAD IDEA TO PUT THE API KEY INTO THE GITHUB REPO
const supabaseUrl = "https://ogepwndefxyzwxeuvegs.supabase.co";
const supabaseKey = "sb_publishable_XUKwD25UnuJBB5xwu88oFw_CQXu3whu";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
const videosSelectData = `
    id,
    title,
    author,
    state
`

async function getVideos() {
    const { data, error } = await supabaseClient
        .from("videos")
        .select(videosSelectData)
        .order("state", { ascending: true });
    
    if (error) {
        console.warn(`Failed to get videos: ${error.message}`)
        return []
    }
    return data;
};
async function insertNewVideo(url, url_valid, title, notes, state) {
    const { data, error } = await supabaseClient
        .from("videos")
        .insert({url: url, url_valid: url_valid, title: title, notes: notes, state: state})
        .select(videosSelectData)
    if (error) {
        console.warn(`Failed to insert video: ${error.message}`)
        return {}
    }
    return data.data
}