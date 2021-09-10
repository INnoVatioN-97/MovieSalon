import React, { useState } from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import { dbService, firebaseInstance, storageService } from 'fbase';
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
const Comment = ({ commentObj, owner, colSpan, code }) => {
    // const [comment, setComment] = useState(commentObj.comment);
    // const [createdAt, setCreatedAt] = useState(commentObj.createdAt);
    // const [userId, setUserId] = useState(commentObj.userId);
    const classes = styles();
    const { comment, createdAt, userId } = commentObj;

    const onDeleteClick = async (event) => {
        // console.log(event.target.id);
        // console.log(event.target.email);

        if (owner === event.target.id) {
            console.log('code:', code);
            // alert('이 댓글 주인!');
            const isDelete = window.confirm(`이 댓글을 삭제하시겠습니까?, 영화 코드: ${code}`);
            if (isDelete === true) {
                const commentRef = dbService.collection(`comment_movieCode=${code}`);
                await commentRef
                    .doc(owner)
                    .delete() // insert
                    .then(() => {
                        console.log('Document successfully Deleted!');
                        alert('제대로 삭제됨!');
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.error('Error writing document: ', error);
                    });
            }
            //     const cityRef = dbService.collection('cities').doc('BJ');

            //     // Remove the 'capital' field from the document
            //     var removeCapital = cityRef.update({
            //         capital: firebaseInstance.firestore.FieldValue.delete(),
            //     });
        } else if (owner !== event.target.id) {
            alert('주인 아님!');
        }
        // 이 commentObj가 생성된 일자를 가지고 해당 필드를 삭제시키는 코드 구현해야.
    };

    return (
        <TableRow align="center" className={classes.commentsRow}>
            <TableCell colSpan={colSpan} align="center" className={classes.commentsCell}>
                "{comment}" - {userId}{' '}
                <button id={userId} onClick={onDeleteClick}>
                    삭제
                </button>
                {/* {console.log(commentObj)} */}
            </TableCell>
        </TableRow>
    );
};

export default Comment;
