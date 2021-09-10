import React, { useState, useEffect } from 'react';
import { TableRow, TableCell, TextField } from '@material-ui/core';
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
    },
    inputComment: {
        backgroundColor: '#2d3436',
        color: '#10FF00',
    },
});
const Comment = ({ owner, colSpan, code }) => {
    const classes = styles();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    // const []

    useEffect(() => {
        console.log(comments);
        if (comments.length === 0 && code > 0) {
            const getData = dbService
                .collection(`comment_movieCode=${code}`)
                .orderBy('createdAt', 'desc')
                .onSnapshot((snapshot) => {
                    const commentsArray = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setComments(commentsArray);
                    console.log('dbService 접근!', comments);
                });
            return () => getData();
        }
    }, [code, comments]);

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const addComment = async (event) => {
        console.log('event.keyCode:', event.code);
        if (event.code === 'Enter') {
            //Enter 키를 누르면 입력된 한줄평을 파이어베이스 DB에 넣고,
            //한줄평 필드를 비운다.
            if (comment === '') {
                return;
            }
            event.preventDefault();

            const commentObj = {
                comment: comment,
                userId: owner,
                createdAt: Date.now(),
            };
            await dbService
                .collection(`comment_movieCode=${code}`)
                .doc(commentObj.userId)
                .set(commentObj)
                .then(() => {
                    console.log('Document successfully written!');
                    setComment('');
                    setComments([]);
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);

                    setComments([]);
                });
        }
    };

    const onDeleteClick = async (event) => {
        console.log('event.target.id:', event.target.id, 'owner:', owner);
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
                        // window.location.reload();
                        setComments([]);
                    })
                    .catch((error) => {
                        console.error('Error writing document: ', error);
                    });
            }
        } else if (owner !== event.target.id) {
            alert('주인 아님!');
        }
    };

    return (
        <>
            <TableRow>
                <TableCell align="center" colSpan="3" className={classes.tableCell}>
                    <TextField
                        id="commentField"
                        fullWidth={true}
                        label="한줄평"
                        placeholder="한줄평 남기기"
                        // multiline
                        variant="filled"
                        size="medium"
                        value={comment}
                        onChange={handleChange}
                        onKeyPress={addComment}
                        InputProps={{
                            className: classes.inputComment,
                        }}
                    />
                </TableCell>
            </TableRow>
            {comments.length !== 0 ? (
                comments.map((m) => (
                    <TableRow align="center" className={classes.commentsRow}>
                        <TableCell colSpan={colSpan} align="center" className={classes.commentsCell}>
                            "{m.comment}" - {m.id}
                            {console.log(m)}
                            <button id={m.id} onClick={onDeleteClick}>
                                삭제
                            </button>
                        </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell>'한줄평 불러오는 중'</TableCell>
                </TableRow>
            )}
        </>
    );
};

export default Comment;
