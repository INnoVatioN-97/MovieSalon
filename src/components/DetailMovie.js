import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TableRow, TableCell, TableBody } from '@material-ui/core';

function DetailMovie({ id, year, title, poster, rating, director, actor }) {
    const actors = actor.split('|');

    /**
     * 출연진 배열을 가져와 예쁘게 텍스트로 return 시키는 함수.
     * (예: {'송강호', '송지효', '이정재', ''} 일 경우 끝에 null은 제거, 마지막 배우 나열 시 ',' 제거해서 나오도록.)
     */
    const printActors = (actors) => {
        // console.log(actors);
        let text = '';
        for (let i = 0; i < actors.length - 1; i++) {
            if (actors[i] === '') continue;
            if (i === actors.length - 2) text += actors[i];
            else text += actors[i] + ',';
        }
        return text;
    };
    return (
        <TableBody>
            <TableRow>
                <TableCell colSpan="4">
                    <a href={id} rel="norefferer">
                        <img src={poster} alt={title} titlt={title} />
                    </a>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan="4">{title.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan="2">개봉: {year}</TableCell>
                <TableCell>평점: {rating}</TableCell>
                <TableCell>감독: {director.replace('|', '')}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>출연진</TableCell>
                <TableCell colSpan="3">
                    {console.log('actors.length: ', actors.length)}
                    {/* {actors.map((actor) => {
                        if (actor !== null) return actor + ',';
                    }, actors.length - 2)} */}
                    {printActors(actors)}
                </TableCell>
            </TableRow>
        </TableBody>

        //     <div className="movie">
        //     {' '}
        //     <a href={id} target="_blank">
        //         {' '}
        //         {' '}
        //         <div className="movie__data">
        //             {' '}
        //             <h3 className="movie__title">{title.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}</h3>{' '}
        //             <p className="movie__rating">
        //                 {' '}
        //                 <span>평점</span> {rating}/10{' '}
        //             </p>{' '}
        //             <p className="movie__year">
        //                 {' '}
        //                 <span>개봉일</span> {year}{' '}
        //             </p>{' '}
        //             <p className="movie__director">
        //                 {' '}
        //                 <span>감독</span> {director}{' '}
        //             </p>{' '}
        //             <p className="movie__actor">
        //                 {' '}
        //                 <span>배우</span> {actor}{' '}
        //             </p>{' '}
        //         </div>{' '}
        //     </a>{' '}
        // </div>
    );
}
DetailMovie.propTypes = {
    id: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actor: PropTypes.string.isRequired,
};
export default DetailMovie;
