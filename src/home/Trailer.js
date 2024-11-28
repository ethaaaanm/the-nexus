import React from "react";
import Youtube from "react-youtube"

class Trailer extends React.Component {
    render() {
        const options = {
            height: '450',
            width: '800',
            playerVars: {
                autoplay: 1,
                controls: 1,
            },
        };

        return <Youtube videoId="mp7M8g4QFsc" opts={options} onReady={this._onReady} id="video" />;
    }

    _onReady(event) {
        event.target.pauseVideo();
    }
}

export default Trailer;
