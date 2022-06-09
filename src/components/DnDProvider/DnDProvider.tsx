import { FC } from "react";
import {
  Tree,
  getBackendOptions,
  MultiBackend,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { useDispatch } from "react-redux";
import { AdaptedDataInterface } from "../../app/dataAdapter";
import { setId } from "../../features/counter/coreSlice";
import s from './DnDProvider.module.css'


interface TreePropsInterface {
  allData: AdaptedDataInterface[]
  setTreeData: (data: AdaptedDataInterface[]) => void
}

const DnDProvider:FC<TreePropsInterface> = ({allData, setTreeData}) => {
  const dispatch = useDispatch()

  const handleDrop = (newTreeData: AdaptedDataInterface[]) => {
    setTreeData(newTreeData);
  }

  const handleSelect = (id:any) => {
    dispatch(setId(id))
  }


  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={allData}
        rootId={0}
        onDrop={handleDrop}

        render={(node, { depth, isOpen, onToggle }) => (
          <>
            {node.droppable && (
              <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
            )}
            <div className={s.treeText} onClick={() => handleSelect(node.id)}>{node.text}</div>
          </>
        )}
        initialOpen = {[383000000001, 383000000002]}
      />
    </DndProvider>
  );
};

export default DnDProvider;