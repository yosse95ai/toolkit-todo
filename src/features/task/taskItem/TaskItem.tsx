import { Checkbox, Modal } from '@mui/material';
import { EventNote, Edit, Delete } from '@mui/icons-material';
import styles from './TaskItem.module.scss';
import TaskForm from '../taskForm/TaskForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  completeTask,
  deleteTask,
  handleModalOpen,
  selectIsModalOpen,
  selectTask,
} from '../taskSlice';

interface PropTypes {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
}

const TaskItem: React.FC<PropTypes> = ({ task }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const handleOpen = () => {
    dispatch(handleModalOpen(true));
    dispatch(selectTask(task));
  };
  const handleClose = () => dispatch(handleModalOpen(false));
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EventNote className={styles.icon} />
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_item}>
        <Checkbox
          checked={task.completed}
          onClick={() => dispatch(completeTask(task))}
          className={styles.checkbox}
        ></Checkbox>
        <button onClick={handleOpen} className={styles.edit_button}>
          <Edit className={styles.icon} />
        </button>
        <button
          onClick={() => dispatch(deleteTask(task))}
          className={styles.delete_button}
        >
          <Delete className={styles.icon} />
        </button>
      </div>
      <Modal open={isModalOpen} onClose={handleClose} className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>Edit</div>
          <TaskForm edit={true} />
        </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
