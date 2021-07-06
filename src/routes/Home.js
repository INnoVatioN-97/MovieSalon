import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// 협업 Testing..!!
const styles = (theme) => ({
    movieNm: {
        justifyContent: 'center',
        fontSize: '5.0rem',
    },
});

class Home extends React.Component {
    render() {
        return (
            <>
                <div>Home 페이지.</div>
                <div>흐에!</div>
            </>
        );
    }
}

export default withStyles(styles)(Home);
