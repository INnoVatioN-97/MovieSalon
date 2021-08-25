import React from 'react';
import axios from 'axios';
import Cast from 'components/Cast';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';

class Filmography extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        return(
            <>
            <Cast id={this.props.match.params.id}/>
            </>
            );

    }
}

export default Filmography;