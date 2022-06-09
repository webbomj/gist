import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import s from './RightContentBlock.module.css';

const RightContentBlock:FC = () => {

  const allData = useAppSelector(state => state.core.data)
  const elementsId = useAppSelector(state => state.core.id)

  const currentElement = allData.find(el => el.id === elementsId)

  return (
    <>
      {currentElement && 
        <div className={s.contentWrapper}>
          <p className={s.text}>Label: {currentElement && currentElement.text}</p>
          <p className={s.text}>Id: {currentElement && currentElement.id}</p>
          <p className={s.text}>ParentId: {currentElement && currentElement.parent}</p>
        </div>
      }
    </>
  );
};

export default RightContentBlock;