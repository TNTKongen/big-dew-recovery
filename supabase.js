// I AM AWARE THIS IS A BAD IDEA TO PUT THE API KEY INTO THE GITHUB REPO
const supabaseUrl = "https://ogepwndefxyzwxeuvegs.supabase.co";
const supabaseKey = "sb_publishable_XUKwD25UnuJBB5xwu88oFw_CQXu3whu";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);


async function getVideos() {
    const { data, error } = await supabaseClient
        .from('videos')
        .select(
            `
            title,
            author,
            state
            `,
        )
        .order('state', { ascending: true });
    
    if (error) {
        console.warn(`Failed to get videos: ${error.message}`)
        return []
    }
    return data;
};