import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TaskState {
  // taslが何個あるのか管理
  idCount: number;
  // sotreに保存するtaskの一覧
  tasks: { id: number; title: string; completed: boolean }[];
  // taskのtitleを編集する際にどのtaskが選択されているか
  selectedTask: { id: number; title: string; completed: boolean };
  // Modalを開くか閉じるか
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [{ id: 1, title: 'Task A', completed: false }],
  selectedTask: { id: 0, title: '', completed: false },
  isModalOpen: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // taskの作成
    createTask: (state, action) => {
      state.idCount += 1;
      const newTask = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
    },
    // modalの開閉管理
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    // 選択タスクを表す
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    // taskの編集
    editTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
    // task完了未完了のチェック制御
    completeTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    // taskの削除
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
});

export const {
  completeTask,
  createTask,
  deleteTask,
  editTask,
  handleModalOpen,
  selectTask,
} = taskSlice.actions;

export const selectTasks = (state: RootState): TaskState['tasks'] =>
  state.task.tasks;

export const selectIsModalOpen = (state: RootState): TaskState['isModalOpen'] =>
  state.task.isModalOpen;

export const selectSelectedTask = (
  state: RootState
): TaskState['selectedTask'] => state.task.selectedTask;

export default taskSlice.reducer;
