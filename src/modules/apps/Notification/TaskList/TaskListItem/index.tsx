import React, { useState } from "react";
import { useRouter } from "next/router";
import IntlMessages from "@crema/helpers/IntlMessages";
import clsx from "clsx";

import { TaskLabels, TaskPriority } from "@crema/modules/Notification";
import AppsStarredIcon from "@crema/components/AppsStarredIcon";
import { Avatar, Checkbox } from "antd";
import AppIconButton from "@crema/components/AppIconButton";
import { AiOutlineDelete } from "react-icons/ai";
import { MdLabelOutline } from "react-icons/md";
import {
  StyledTodoListCheckboxView,
  StyledTodoListImg,
  StyledTodoListImgView,
  StyledTodoListItem,
  StyledTodoListItemHide,
  StyledTodoListItemLeft,
  StyledTodoListStarView,
  StyledTodoListTitle,
  StyledTodoListItemRight,
  StyledTodoListRightContent,
  StyledTodoListStartDate,
  StyledTodoListItemAction,
} from "../index.styled";
import { TodoObjType } from "@crema/types/models/apps/Todo";

type TaskListItemProps = {
  task: TodoObjType;
  onChangeCheckedTasks: (event: boolean, taskId: number) => void;
  checkedTasks: number[];
  onChangeStarred: (checked: boolean, task: TodoObjType) => void;
  onUpdateSelectedTask: (task: TodoObjType) => void;
};

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  onChangeCheckedTasks,
  checkedTasks,
  onChangeStarred,
  onUpdateSelectedTask,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const { query } = router;
  const { all } = query;

  const onViewTaskDetail = (task: TodoObjType) => {
    router.push(`/apps/todo/${all?.[0]}/${all?.[1]}/${task.id}`);
  };

  const onDeleteTask = () => {
    onUpdateSelectedTask({ ...task, folderValue: 126 });
  };

  return (
    <StyledTodoListItem
      key={task.id}
      className={clsx("item-hover", {
        checked: checkedTasks.includes(task.id),
      })}
      onClick={() => onViewTaskDetail(task)}
    >
      <StyledTodoListItemLeft>
        <StyledTodoListCheckboxView
          onClick={(event) => event.stopPropagation()}
        >
          <Checkbox
            checked={checkedTasks.includes(task.id)}
            onChange={() => {
              setIsChecked(!isChecked);
              onChangeCheckedTasks(!isChecked, task.id);
            }}
          />
        </StyledTodoListCheckboxView>

        <StyledTodoListImgView>
          <StyledTodoListStarView onClick={(event) => event.stopPropagation()}>
            <AppsStarredIcon item={task} onChange={onChangeStarred} />
          </StyledTodoListStarView>
          <StyledTodoListImg>
            <Avatar src={task?.assignedTo?.image} />
          </StyledTodoListImg>
        </StyledTodoListImgView>

        <StyledTodoListTitle className="text-truncate">
          {task.title}
        </StyledTodoListTitle>

        {task.priority ? (
          <StyledTodoListItemHide>
            <TaskPriority priority={task.priority} />
          </StyledTodoListItemHide>
        ) : null}
      </StyledTodoListItemLeft>

      <StyledTodoListItemRight>
        {task.label ? <TaskLabels labels={task.label} /> : null}

        <StyledTodoListRightContent className="todo-list-item-right-content">
          <StyledTodoListStartDate className="text-truncate">
            <IntlMessages id="todo.scheduleFor" /> {task.startDate}
          </StyledTodoListStartDate>
        </StyledTodoListRightContent>

        <StyledTodoListItemAction className="todo-list-item-action">
          <AppIconButton
            onClick={onDeleteTask}
            title={<IntlMessages id="common.delete" />}
            icon={<AiOutlineDelete />}
          />

          <AppIconButton
            title={<IntlMessages id="common.label" />}
            icon={<MdLabelOutline />}
          />
        </StyledTodoListItemAction>
      </StyledTodoListItemRight>
    </StyledTodoListItem>
  );
};

export default TaskListItem;
