import React from 'react';
import axios from 'axios';


import videojs from 'video.js';
import './videojs.css';
import { Row } from 'antd';


class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      videoJsOptions: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/videoList', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' 
      }
    }).then(res => {
      res.data.map(video => {
        if (video.upload_title === this.props.match.params.videoTitle) {
          this.setState({
            loaded: true,
            videoJsOptions: {
              autoplay: false,
              controls: true,
              sources: [{
                src: video.video_path
              }],
              fluit: true
            }
          }, () => {
             this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
              // console.log('onPlayerReady', this)
            });
          });
        }
      });
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
        <Row style={{ width: "100vw" }}>
          <div style={{marginLeft: "330px", marginTop: "100px"}}>
            {this.state.loaded ? (
              <div style={{width: "1300px", height: "700px"}} data-vjs-player>
                <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered" />
              </div>
            ) : ' Loading ... '}
          </div>
        </Row>
    );
  }
}

export default VideoPlayer;