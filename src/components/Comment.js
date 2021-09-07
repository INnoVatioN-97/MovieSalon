import React, { useState } from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import { dbService, storageService } from 'fbase';

const Comment = ({ commentObj, owner, colSpan }) => {
    // const [comment, setComment] = useState(commentObj.comment);
    // const [createdAt, setCreatedAt] = useState(commentObj.createdAt);
    // const [userId, setUserId] = useState(commentObj.userId);

    const { comment, createdAt, userId } = commentObj;

    const onDeleteClick = async (event) => {
        console.log(event.target.id);
        // 이 commentObj가 생성된 일자를 가지고 해당 필드를 삭제시키는 코드 구현해야.
    };

    return (
        <TableRow align="center">
            <TableCell colSpan={colSpan} align="center">
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
