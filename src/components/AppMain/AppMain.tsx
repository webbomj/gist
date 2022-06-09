import {FC, useState, useEffect} from 'react';
import {
  getDescendants
} from "@minoru/react-dnd-treeview";
import { AdaptedDataInterface } from '../../app/dataAdapter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { initData, setData} from '../../features/counter/coreSlice';
import DnDProvider from '../DnDProvider/DnDProvider';
import RightContentBlock from '../RightContentBlock/RightContentBlock';
import s from './AppMain.module.css'

const AppWrapper:FC = () => {
  const [treeData, setTreeData] = useState<AdaptedDataInterface[]>([]);
  
  const allData = useAppSelector(state => state.core.data)
  const selectedId = useAppSelector(state => state.core.id)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    console.log('treedataUseEffect', treeData)
    dispatch(setData(treeData))
  }, [treeData, dispatch])


  const handleRefresh = () => {
    dispatch(initData('https://api.github.com/gists/e1702c1ef26cddd006da989aa47d4f62'))
  }

  const handleApply = () => {
    console.log(allData)
  }

  const handleDelete = (id: number | null) => {
    if (typeof id === 'number') {
      console.log('treedata', treeData)
      const deleteIds = [
        id,
        ...getDescendants(allData, id).map((node) => node.id)
      ];
      console.log('delteIds', deleteIds)
      const newTree = allData.filter((node) => !deleteIds.includes(node.id));
      console.log('newTree', newTree)
      setTreeData(newTree);
    }
  };

  return (
    <div className={s.appBlock}>
      <div className={s.mainBlock}>
        <div className={s.leftBlock}>
          {allData.length > 0 ? <DnDProvider allData={allData} setTreeData={setTreeData}/> : null}
        </div>
        <div className={s.rightBlock}>
          <RightContentBlock/>
        </div>
      </div>
      <div className={s.appWrapper}>
        <button className={s.button} onClick={() => handleApply()}>Apply</button>
        <button className={s.button} onClick={() => handleRefresh()}>Refresh</button>
        <button className={s.button} onClick={() => handleDelete(selectedId)}>Remove</button>
      </div>
    </div>
  );
};

export default AppWrapper;