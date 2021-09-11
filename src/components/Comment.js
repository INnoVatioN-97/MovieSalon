import React, { useState, useEffect } from 'react';
import { Table, TableRow, TableCell, TextField, TableBody } from '@material-ui/core';
import { dbService, firebaseInstance, storageService } from 'fbase';
import { makeStyles } from '@material-ui/core';

const styles = makeStyles({
    commentsTable: {
        margin: 'auto',
        width: '70%',

        // backgroundColor: '#636e72',
        borderRadius: '20px',
        backgroundColor: 'rgba(32, 35, 42, 0.9)',
        color: '#FFFFFF',
    },
    commentsRow: {
        // padding: '300px',
        // margin: '3000px',
    },
    commentsCell: {
        // margin: '3%',
        // backgroundColor: '#2d3436',
        color: '#10FF00',
        borderBottom: 'none',
    },
    inputComment: {
        backgroundColor: '#2d3436',
        // width: '100%',
        color: '#10FF00',
        borderRadius: '20px',
    },
    commentsLine: {
        // verticalAlign: 'middle',
        borderRadius: '20px',
        backgroundColor: '#2d3436',
        fontSize: '1.3rem',
        padding: '2% 6% 2% 6%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    // owner: {fontSize:},
    btnDelete: {
        backgroundColor: '#4cd137',
        fontSize: '2.2rem',
        borderRadius: '2.5rem',
        // justifyContent: 'center',
        '&:hover': {
            // border: 'solid',
            // borderColor: 'grey',
            backgroundColor: '#44bd32',
        },
    },
    btnAdd: {
        width: '100%',
        backgroundColor: '#4cd137',
        fontSize: '1.4rem',
        borderRadius: '2.5rem',
        // justifyContent: 'center',
        '&:hover': {
            // border: 'solid',
            // borderColor: 'grey',
            backgroundColor: '#44bd32',
        },
    },
    tableCell: {
        borderBottom: 'none',
    },
});
const Comment = ({ owner, colSpan, code }) => {
    const classes = styles();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [cnt, setCnt] = useState(0);

    // 코멘트 하나도 작성 안된 영화의 경우
    const [emptyComments, setEmptyComments] = useState(false);
    // const []

    useEffect(() => {
        console.log('comments:', comments);
        if (comments.length === 0 && code > 0 && !emptyComments) {
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
            if (comments.length === 0) {
                setCnt(cnt + 1);
                if (cnt > 3) setEmptyComments(true);
            }
            return () => getData();
        }
        if (comments.length !== 0 && emptyComments) {
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
    }, [comments]);

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const addComment = async (event) => {
        // console.log('event.keyCode:', event.code);
        console.log('추가눌릴때: ', event.type);
        if (event.code === 'Enter' || event.type === 'click') {
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
                    if (emptyComments) window.location.reload();
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);

                    setComments([]);
                });
        }
    };

    const onDeleteClick = async (event) => {
        // console.log('event.target.id:', event.target.id, 'owner:', owner);
        // console.log(event.target.email);

        if (owner === event.target.id) {
            console.log('code:', code);
            // alert('이 댓글 주인!');
            const isDelete = window.confirm(`이 댓글을 삭제하시겠습니까?`);
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
            alert('이 댓글의 작성자가 아닙니다.');
        }
    };

    return (
        <>
            <Table className={classes.commentsTable}>
                <TableBody>
                    <TableRow>
                        <TableCell align="center" colSpan={colSpan - 1} width="90%" className={classes.tableCell}>
                            {/* <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}> */}
                            <TextField
                                id="commentField"
                                fullWidth={true}
                                label="한줄평 남기기"
                                placeholder="한줄평 입력"
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

                            {/* </div> */}
                        </TableCell>
                        <TableCell align="center" colSpan="1" width="10%" className={classes.tableCell}>
                            <button onClick={addComment} className={classes.btnAdd}>
                                추가
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>

                {comments.map((m) => (
                    <TableRow align="center" className={classes.commentsRow}>
                        <TableCell colSpan={colSpan + 1} align="center" className={classes.commentsCell}>
                            <div className={classes.commentsLine}>
                                <span>"{m.comment}"</span>
                                <span>-</span>
                                <span>{m.id}</span>
                                <span>
                                    <button id={m.id} onClick={onDeleteClick} className={classes.btnDelete}>
                                        삭제
                                    </button>
                                </span>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
        </>
    );
};

export default Comment;
