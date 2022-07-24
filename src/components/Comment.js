import React, { useState, useEffect } from 'react';
import {
  Table,
  TableRow,
  TableCell,
  TextField,
  TableBody,
} from '@material-ui/core';
import { dbService } from 'fbase';
import { makeStyles } from '@material-ui/core';

const styles = makeStyles({
  commentsTable: {
    margin: 'auto',
    width: '70%',
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
    textDecoration: 'none',
  },
  commentsLine: {
    // verticalAlign: 'middle',
    // borderRadius: '20px',
    backgroundColor: 'rgba(12, 12, 12, 0.7)',
    fontSize: '1.3rem',
    padding: '2% 6% 2% 6%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnTest: {
    width: '5rem',
    height: '2rem',
    fontSize: '1.2rem',
    textTransform: 'uppercase',
    letterSpacing: '2.5px',
    fontWeight: '700',
    color: '#111111',
    backgroundColor: '#44bd32',
    border: 'none',
    // borderRadius: '2%',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease 0s',
    cursor: 'pointer',
    outline: 'none',
    marginLeft: '30px',
    '&:hover': {
      backgroundColor: '#4cd137',
      boxShadow: '0px 15px 20px rgba(46, 229, 157, 0.4)',
      color: '#000000',
      transform: 'translateY(-7px)',
    },
  },

  tableCell: {
    // width: '100%',
    borderBottom: 'none',
  },
});
const Comment = ({ owner, colSpan, code }) => {
  const classes = styles();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(true);

  // 코멘트 하나도 작성 안된 영화의 경우
  // const []

  useEffect(() => {
    console.log('comments:', comments);
    console.log('refresh:', refresh);
    if (refresh && code !== 0) {
      console.log('새로 코멘트 가져와야되는 구간');
      if (comments.length === 0) {
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
        return () => {
          setRefresh(false);
          getData();
        };
      } else {
        console.log('새로 코멘트 가져오지 않는구간');
      }
    }
  }, [refresh, code, comments]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const addComment = async (event) => {
    // console.log('event.keyCode:', event.code);
    console.log('추가눌릴때: ', event.type);
    event.preventDefault();
    if (event.code === 'Enter' || event.type === 'click') {
      //Enter 키를 누르면 입력된 한줄평을 파이어베이스 DB에 넣고,
      //한줄평 필드를 비운다.
      if (comment === '') {
        return;
      }

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
          setRefresh(true);
        })
        .catch((error) => {
          console.error('Error writing document: ', error);

          setComments([]);
        });
    }
  };

  const onDeleteClick = async (event) => {
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
            setComments([]);
            setRefresh(true);
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
    <Table className={classes.commentsTable}>
      {!refresh ? (
        <TableBody>
          <TableRow>
            <TableCell
              align='center'
              colSpan={colSpan}
              className={classes.tableCell}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  verticalAlign: 'middle',
                  alignItems: 'center',
                }}
              >
                <span style={{ flexGrow: '8' }}>
                  <TextField
                    id='commentField'
                    fullWidth={true}
                    label='한줄평 남기기'
                    placeholder='한줄평 입력'
                    // multiline
                    variant='filled'
                    size='medium'
                    value={comment}
                    onChange={handleChange}
                    onKeyPress={addComment}
                    InputProps={{
                      className: classes.inputComment,
                    }}
                  />
                </span>

                <button onClick={addComment} className={classes.btnTest}>
                  등록
                </button>
              </div>
            </TableCell>
          </TableRow>
          {comments.map((m) => (
            <>
              <TableRow align='center' className={classes.commentsRow}>
                <TableCell
                  colSpan={colSpan}
                  align='center'
                  className={classes.commentsCell}
                >
                  <div className={classes.commentsLine}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ fontSize: '1.5rem', color: 'white' }}>
                          "{m.comment}"
                        </span>
                        <span style={{ fontSize: '.9rem' }}>
                          Written by @{m.id.split('@')[0]}
                        </span>
                      </div>
                      <button
                        id={m.id}
                        onClick={onDeleteClick}
                        className={classes.btnTest}
                      >
                        🗑삭제
                      </button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          <TableRow>
            <TableCell
              align='center'
              colSpan={colSpan - 1}
              width='90%'
              className={classes.tableCell}
            >
              <TextField
                id='commentField'
                fullWidth={true}
                label='한줄평 남기기'
                placeholder='한줄평 입력'
                variant='filled'
                size='medium'
                value={comment}
                onChange={handleChange}
                onKeyPress={addComment}
                InputProps={{
                  className: classes.inputComment,
                }}
              />
            </TableCell>
            <TableCell
              align='center'
              colSpan='1'
              width='10%'
              className={classes.tableCell}
            >
              <button onClick={addComment} className={classes.btnAdd}>
                추가
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
};

export default Comment;
