import YOUTUBE_API_KEY from './../config/youtube.js';

var searchYouTube = (options, callback) => {
  $.ajax({
    url: "https://www.googleapis.com/youtube/v3/search",
    data: {
      key: options.key,
      part: 'snippet',
      maxResults: options.max,
      q: options.query,
      type: 'video'
    },
    success: (data) => callback(data.items),
    // dataType: dataType
  });
};

export default searchYouTube;
