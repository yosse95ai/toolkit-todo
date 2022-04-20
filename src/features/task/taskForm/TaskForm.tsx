import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTask,
  editTask,
  handleModalOpen,
  selectSelectedTask,
} from '../taskSlice';
import TextField from '@mui/material/TextField';
import styles from './TaskForm.module.scss';

type Inputs = {
  taskTitle: string;
};

type PropTypes = {
  edit?: boolean;
};

const TaskForm: React.FC<PropTypes> = ({ edit }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const handleCreate = (data: Inputs) => {
    dispatch(createTask(data.taskTitle));
    reset();
  };
  const selectedValue = useSelector(selectSelectedTask);

  const handleEdit = (data: Inputs) => {
    const sendData = { ...selectedValue, title: data.taskTitle };
    dispatch(editTask(sendData));
    dispatch(handleModalOpen(false));
  };
  return (
    <div className={styles.root}>
      <form
        onSubmit={edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)}
        className={styles.form}
      >
        <TextField
          id="outlined-basic"
          label={edit ? 'Edit Task' : 'New Task'}
          defaultValue={edit ? selectedValue.title : ''}
          variant="outlined"
          inputRef={register}
          name="taskTitle"
          className={styles.text_field}
        />
        {edit ? (
          <div className={styles.button_wrapper}>
            <button type="submit" className={styles.submit_button}>
              Submit
            </button>
            <button
              type="button"
              className={styles.cancel_button}
              onClick={() => dispatch(handleModalOpen(false))}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default TaskForm;
