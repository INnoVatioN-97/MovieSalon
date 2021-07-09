import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

//https://material-ui.com/system/flexbox/#flex-wrap 에서
// Box 좀 보고 Home 화면에서 순위 세개 이쁘게 띄워야 함.
const styles = (theme) => ({
    pageTitle: {
        textAlign: 'center',
        fontSize: '4.2rem',
        marginTop: 15,
        marginBottom: 15,
    },
    top3List: {
        listStyle: 'none',
        justifyContent: 'center',
    },
    box: {
        display: 'flex',
        flexWrap: 'nowrap',
        p: 1,
        m: 1,
        backgroundColor: '#f2f2f2',
        sx: { maxWidth: 300 },
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: props.movies.movies,
        };
    }

    printTop3Movies = (movies) => {
        // console.log('movies from printTop3Movies:', movies);
        let tmpMovies = [];
        for (let i = 0; i < 3; i++) {
            tmpMovies[i] = movies[i];
        }
        // console.log('tmpMovies:', tmpMovies);
        return tmpMovies.map((m) => (
            <Box>
                {m.rank}위, {m.movieNm}{' '}
            </Box>
        ));
    };

    render() {
        const { movies } = this.state;
        const { classes } = this.props;
        // console.log('movies:', movies);
        return (
            <>
                <div className={classes.pageTitle}>어제의 Top 3 영화들</div>
                <Box className={classes.box}>{this.printTop3Movies(movies)}</Box>
            </>
        );
    }
}

export default withStyles(styles)(Home);
