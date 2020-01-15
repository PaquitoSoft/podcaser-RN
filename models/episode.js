export default class Episode {
    constructor(raw) {
        if (raw) {
            this.id = raw.id;
            this.audioUrl = raw.audio;
            this.cover = raw.image;
            this.title = raw.title;
            this.thumbnail = raw.thumbnail;
            this.description = raw.description;
            this.publicationDate = new Date(raw.pub_date_ms);
            this.duration = raw.audio_length_sec;
            // explicit_content
            // maybe_audio_invalid
            // listennotes_url
            // listennotes_edit_url
        }
    }
}