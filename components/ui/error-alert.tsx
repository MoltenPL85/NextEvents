import classes from './error-alert.module.css';

const ErrorAlert: React.FC = (props) => {
  return <div className={classes.alert}>{props.children}</div>;
};

export default ErrorAlert;
