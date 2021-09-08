import React, { useState } from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import { dbService, storageService } from 'fbase';
import { makeStyles } from '@material-ui/core';

const styles = makeStyles({
    commentsRow: {
        // padding: '300px',
    },
    commentsCell: {
        backgroundColor: '#2d3436',
        color: '#10FF00',
        borderBottom: 'none',
        // textDecoration: 'none',
    },
});
const Comment = ({ commentObj, owner, colSpan }) => {
    // const [comment, setComment] = useState(commentObj.comment);
    // const [createdAt, setCreatedAt] = useState(commentObj.createdAt);
    // const [userId, setUserId] = useState(commentObj.userId);
    const classes = styles();
    const { comment, createdAt, userId } = commentObj;

    const onDeleteClick = async (event) => {
        console.log(event.target.id);
        // 이 commentObj가 생성된 일자를 가지고 해당 필드를 삭제시키는 코드 구현해야.
    };

    return (
        <TableRow align="center" className={classes.commentsRow}>
            <TableCell colSpan={colSpan} align="center" className={classes.commentsCell}>
                "{comment}" - {userId}{' '}
                <button id={createdAt} onClick={onDeleteClick}>
                    삭제
                </button>
                {/* {console.log(commentObj)} */}
            </TableCell>
        </TableRow>
    );
};

export default Comment;
