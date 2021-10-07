import React from 'react';
import Cast from 'components/APIs/Cast';

class Filmography extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <Cast id={this.props.match.params.id} />
            </>
        );
    }
}

export default Filmography;
