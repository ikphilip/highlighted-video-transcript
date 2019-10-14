import React, { Component } from 'react'

class Video extends Component {
  constructor (props) {
    super(props)

    this.videoRef = React.createRef()
    this.trackRef = React.createRef()

    this.state = {
      cueList: null,
    }
  }

  _createAndUpdateTracks (event = {}) {
    let tracks = []

    for (let i = 0; i < this.trackRef.current.track.cues.length; i++) {
      let active = false

      if (this.trackRef.current.track.activeCues.length > 0) {
        active = (this.trackRef.current.track.cues[i].text === this.trackRef.current.track.activeCues[0].text
          && this.trackRef.current.track.cues[i].startTime === this.trackRef.current.track.activeCues[0].startTime
        )
      }

      tracks.push(<span key={i} className={active ? 'active' : null}>{this.trackRef.current.track.cues[i].text + ' '}</span>)
    }

    this.setState({
      cueList: tracks
    })
  }

  componentDidMount () {
    // Get a string list of the entire track and render it.
    this.trackRef.current.addEventListener('cuechange', (e) => this._createAndUpdateTracks(e))

    // This is a hack to get the WebVTT to display before the video plays.
    this.trackRef.current.track.mode = 'showing'

    this.videoRef.current.currentTime = '0.01'

    this._createAndUpdateTracks()
  }

  render () {
    return (
      <div>
        <video id='source' width='640' height='480' controls preload='metadata' ref={this.videoRef} >
          <source src={this.props.videoSrc} type={this.props.videoType} />
          <track
            kind={this.props.trackKind}
            label={this.props.trackLabel}
            srcLang={this.props.trackLang}
            src={this.props.trackSrc}
            ref={this.trackRef}
          />
        </video>
        <div>
          {this.state.cueList}
        </div>
      </div>

    )
  }
}

export default Video