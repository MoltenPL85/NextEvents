import { CommentDataDB } from '../../interfaces';
import classes from './comment-list.module.css';

interface CommentListProps {
  items: Omit<CommentDataDB, 'email'>[];
}

const CommentList: React.FC<CommentListProps> = ({ items }) => {
  return (
    <ul className={classes.comments}>
      {items &&
        items.map((item) => (
          <li key={item._id}>
            <p>{item.text}</p>
            <div>
              By <address>{item.name}</address>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default CommentList;
