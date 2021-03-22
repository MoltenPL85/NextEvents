import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { CommentData } from '../../interfaces';

interface CommentsProps {
  eventId: string;
}

const Comments = ({ eventId }: CommentsProps) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Omit<CommentData, 'email'>[]>([]);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
        });
    }
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);

    if (!showComments) {
    }
  };

  const addCommentHandler = (commentData: Omit<CommentData, 'eventId'>) => {
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};

export default Comments;
