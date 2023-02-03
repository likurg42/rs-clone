import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import style from './buttonLink.module.scss';

type ButtonLinkProps = {
  readonly type: 'primary' | 'secondary',
  readonly to: string,
  readonly children: ReactNode
};

const ButtonLink = ({ type, to, children }: ButtonLinkProps) => {
  const buttonClass = cn(style.button, {
    [style['button--primary']]: type === 'primary',
    [style['button--secondary']]: type === 'secondary',
  });

  return (
    <Link to={to}>
      <button type="button" className={buttonClass}>{children}</button>
    </Link>
  );
};

export default ButtonLink;
