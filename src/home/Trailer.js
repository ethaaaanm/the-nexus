import React from "react";
import Youtube from "react-youtube"

class Trailer extends React.Component {
    render() {
        const options = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 1,
                controls: 1,
            },
        };

        return <Youtube videoId="xBwzppW2RoE" opts={options} onReady={this._onReady} id="video" />;
    }

    _onReady(event) {
        event.target.pauseVideo();
    }
}

export default Trailer;
