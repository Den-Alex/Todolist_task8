import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-Task'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    isDone: boolean
    todolistId: string
    taskId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType

export const todolistsReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const task = state[action.todolistId];
            const filteredTask = task.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTask;
            return stateCopy
        }
        case 'ADD-Task': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state};
            let tasks = stateCopy[action.todolistId];
            let task = tasks.find( t => t.id ===action.taskId);
            if (task) {
                task.isDone === action.isDone;
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state};
            let tasks = stateCopy[action.todolistId];
            let task = tasks.find( t => t.id ===action.taskId);
            if (task) {
                task.title === action.title;
            }
            return stateCopy
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-Task', title: title, todolistId: todolistId}
}
export const changeTaskStatusAC = (isDone: boolean, todolistId: string, taskId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', isDone: isDone, todolistId: todolistId, taskId: taskId}
}
export const changeTaskTitleAC = (taskId: string, todolistId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId: taskId,  todolistId: todolistId, title: title}
}
