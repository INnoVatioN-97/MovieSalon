import React from 'react';
import axios from 'axios';
import { TableCell, TableRow } from '@material-ui/core';

class Cast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            castMember: [],
            ids: props.id
        };
    }

    getMovieCasts = async (id) => {
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: { cast },
        } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`);
        this.setState({ castMember: cast.slice(0, 5), isLoading: false }); // 출연진 5명만 추출(slice())
    };

    componentDidMount() {
        this.getMovieCasts(this.state.ids);
    }

    render() {
        const { castMember } = this.state;
        return(
            <>
            <TableRow>
                <TableCell>{castMember.map((c) => (c.name))}</TableCell>
            </TableRow>
            </>
        )
    }
}

export default Cast;