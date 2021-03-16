import Link from 'next/link';

import classes from './button.module.css';

interface ButtonProps {
  link?: string;
}

const Button: React.FC<ButtonProps> = ({ children, link }) => {
  if (link) {
    return (
      <Link href={link}>
        <a className={classes.btn}>{children}</a>
      </Link>
    );
  }
  return <button className={classes.btn}>{children}</button>;
};

export default Button;
