export default class PodcastSummary {

	constructor(raw) {
		if (raw && raw['im:name']) {
			this.id = raw.id.attributes['im:id'];
			this.name = raw['im:name'].label;
			this.author = raw['im:artist'].label;
			this.description = raw.summary ? raw.summary.label : '';
			this.cover = raw['im:image'].filter((imageData) => imageData.attributes.height === '170')[0].label;

			if (raw['im:releaseDate']) {
				this.releaseDate = raw['im:releaseDate'].attributes.label; // raw['im:releaseDate'].label => zulu date
				this.lastEpisodeDate = (new Date(raw['im:releaseDate'].label)).getTime();
			}
		} else if (raw && raw.listennotes_url) {
			this.id = raw.id;
			this.name = raw.title_original || raw.title;
			this.author = raw.publisher_original || raw.publisher;
			this.description = raw.description_original;
			this.cover = raw.thumbnail;
			this.releaseDate = raw.earliest_pub_date_ms;
			this.lastEpisodeDate = raw.latest_pub_date_ms;
			this.totalEpisodes = raw.total_episodes;
		}
	}

}
