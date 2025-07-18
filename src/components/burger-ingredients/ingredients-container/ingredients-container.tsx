import clsx from 'clsx';
import { ReactNode, Ref, forwardRef } from 'react';

import styles from './ingredients-container.module.css';

type Props = {
  children: ReactNode;
  title: string;
  type: string;
}

const IngredientsContainer = forwardRef(({ children, title, type }: Props, ref: Ref<HTMLUListElement>) => {
  return (
    <>
      <h2
        className='text text_type_main-medium'
        id={type}
      >
        {title}
      </h2>
      <ul className={styles.ingredients__list} ref={ref}>
        {children}
      </ul>
    </>
  );
});

export default IngredientsContainer;
