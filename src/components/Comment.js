import React, { useState } from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import { dbService, storageService } from 'fbase';

const Comment = ({ commentObj, owner }) => {
    const [comment, setComment] = useState(commentObj.comment);
    const [createdAt, setCreatedAt] = useState(commentObj.createdAt);
    const [userId, setUserId] = useState(commentObj.userId);
    const onDeleteClick = async () => {};

    return (
        <TableRow>
            <TableCell colSpan="3" align="center">
                "{comment}" - {userId}
                {/* {console.log(commentObj)} */}
            </TableCell>
        </TableRow>
    );
};

export default Comment;
