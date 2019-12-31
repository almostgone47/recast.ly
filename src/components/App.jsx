import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import exampleVideoData from './../data/exampleVideoData.js';
import searchYouTube from './../lib/searchYouTube.js';
import YOUTUBE_API_KEY from './../config/youtube.js';
var MAX_RESULTS = 5;
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentlyPlaying: exampleVideoData[0],
      videoListData: []
    };
  }

  // helper function to search through data and find matching video
  // based off of video title
  findVideo(title) {
    this.state.videoListData.forEach(video => {
      if (video.snippet.title === title) {
        this.setState({
          currentlyPlaying: video
        });
      }
    });
  }

  changeSongHandler(event, video) {
    this.findVideo(event.target.innerText);
  }

  liveSearchHandler(e) {
    searchYouTube({
      key: YOUTUBE_API_KEY,
      maxResults: MAX_RESULTS,
      query: e.target.parentNode.children[0].value
    }, (data)=>{
      this.searchResultsHandler(data);
    });
  }

  searchHandler(e) {
    searchYouTube({
      key: YOUTUBE_API_KEY,
      maxResults: MAX_RESULTS,
      query: e.target.parentNode.children[0].value
    }, (data)=>{
      this.searchResultsHandler(data);
    });
  }

  searchResultsHandler(videoList) {
    this.setState({
      videoListData: videoList
    });
  }

  componentDidMount() {
    searchYouTube({
      key: YOUTUBE_API_KEY,
      maxResults: MAX_RESULTS,
      query: 'rick astley'
    }, (data)=>{
      this.searchResultsHandler(data);
    });
  }

  render(props) {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search searchHandler={this.searchHandler.bind(this)} liveSearchHandler={this.liveSearchHandler.bind(this)}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentlyPlaying} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videoListData} changeSongHandler={this.changeSongHandler.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
