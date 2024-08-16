
import React, { useEffect, useState } from "react";
import TaskContentHeader from "./TaskContentHeader";
import AddNewTask from "../AddNewTask";
import AppsPagination from "@crema/components/AppsPagination";
import AppsHeader from "@crema/components/AppsContainer/AppsHeader";
import AppsContent from "@crema/components/AppsContainer/AppsContent";
import ListEmptyResult from "@crema/components/AppList/ListEmptyResult";
import TodoListSkeleton from "@crema/components/AppSkeleton/TodoListSkeleton";
import AppList from "@crema/components/AppList";
import {
  StyledTodoFooter,
  StyledTodoListDesktop,
  StyledTodoListMobile,
} from "./index.styled";
import { TaskListItemMobile } from "@crema/modules/Notification";
import { useAppSelector, useAppDispatch } from "../../../../toolkit/hooks";
import {
  onDeleteSelectedTasks,
  onGetTaskList,
  onUpdateTaskStarredStatus,
} from "../../../../toolkit/actions";
import { TodoObjType } from "@crema/types/models/apps/Todo";
import { useRouter } from "next/router";
import TaskListItem from "./TaskListItem";

const TasksList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { all, asPath } = router.query;


  const taskList = useAppSelector(({ todoApp }) => todoApp.taskList);

  const totalTasks = useAppSelector(({ todoApp }) => todoApp.totalTasks);

  const loading = useAppSelector(({ common }) => common.loading);

  const [page, setPage] = useState(0);
  const [filterText, onSetFilterText] = useState<string>("");
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);
  const [isAddTaskOpen, setAddTaskOpen] = useState<boolean>(false);

  useEffect(() => {
    setPage(0);
  }, [asPath]);

  useEffect(() => {
    // dispatch(onGetTaskList(all[0], all[1], page));
  }, [dispatch, page, all]);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  const onChangeCheckedTasks = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedTasks(checkedTasks.concat(id));
    } else {
      setCheckedTasks(checkedTasks.filter((taskId) => taskId !== id));
    }
  };

  const onPageChange = (value: number) => {
    setPage(value);
  };

  const onChangeStarred = (checked: boolean, task: TodoObjType) => {
    dispatch(onUpdateTaskStarredStatus([task.id], checked, all[1]));
  };

  const onDeleteSelectedTask = (task: TodoObjType) => {
    dispatch(onDeleteSelectedTasks([task.id], all[0], all[1], page));
  };

  const onGetFilteredItems = () => {
    if (filterText === "") {
      return taskList;
    } else {
      return taskList.filter((task) =>
        task.title.toUpperCase().includes(filterText.toUpperCase())
      );
    }
  };

  console.log("taskList", taskList);

  const list = onGetFilteredItems();
  return (
    <>
      <AppsHeader>
        <TaskContentHeader
          taskLists={taskList}
          checkedTasks={checkedTasks}
          setCheckedTasks={setCheckedTasks}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          onPageChange={onPageChange}
          page={page}
        />
      </AppsHeader>
      <AppsContent>
        <>
          <StyledTodoListDesktop>
            <AppList
              data={list}
              renderItem={(task) => (
                <TaskListItem
                  key={task.id}
                  task={task}
                  onChangeCheckedTasks={onChangeCheckedTasks}
                  checkedTasks={checkedTasks}
                  onChangeStarred={onChangeStarred}
                  onUpdateSelectedTask={onDeleteSelectedTask}
                />
              )}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle="Add Notification"
                  onClick={onOpenAddTask}
                  placeholder={<TodoListSkeleton />}
                />
              }
            />
          </StyledTodoListDesktop>
          <StyledTodoListMobile>
            <AppList
              data={list}
              renderItem={(task) => (
                <TaskListItemMobile
                  key={task.id}
                  task={task}
                  checkedTasks={checkedTasks}
                  onChangeStarred={onChangeStarred}
                  onChangeCheckedTasks={onChangeCheckedTasks}
                />
              )}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle="Add Notification"
                  onClick={onOpenAddTask}
                  placeholder={<TodoListSkeleton />}
                />
              }
            />
          </StyledTodoListMobile>
        </>
      </AppsContent>

      {taskList.length > 0 ? (
        <StyledTodoFooter>
          <AppsPagination
            count={totalTasks}
            page={page}
            onChange={onPageChange}
          />
        </StyledTodoFooter>
      ) : null}

      {isAddTaskOpen ? (
        <AddNewTask
          isAddTaskOpen={isAddTaskOpen}
          onCloseAddTask={onCloseAddTask}
        />
      ) : null}
    </>
  );
};
export default TasksList;
