import {
  getPaginatedResponseSchema,
  paginationLimitSchema,
  paginationOffsetSchema,
} from './common.schema';
import { projectIdSchema } from './project.schema';
import { TASK_TAGS } from '../constants/task.constants';

export const taskTitleSchema = {
  type: 'string',
  minLength: 4,
  maxLength: 30,
};

export const taskDeadlineSchema = {
  type: 'string',
  format: 'date',
};

export const taskIdSchema = {
  type: 'string',
};

export const taskErrorSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: 'Task does not exist',
    },
  },
  required: ['message'],
};

export const taskSchema = {
  type: 'object',
  properties: {
    _id: taskIdSchema,
    title: taskTitleSchema,
    deadline: taskDeadlineSchema,
    projectId: projectIdSchema,
  },
  required: ['title', 'deadline', '_id', 'projectId'],
};

export const createTaskSchema = {
  tags: TASK_TAGS,
  body: {
    type: 'object',
    properties: {
      projectId: projectIdSchema,
      title: taskTitleSchema,
      deadline: taskDeadlineSchema,
    },
    required: ['projectId', 'title', 'deadline'],
  },
  response: {
    201: taskSchema,
  },
};

export const updateTaskSchema = {
  tags: TASK_TAGS,
  body: {
    type: 'object',
    properties: {
      title: taskTitleSchema,
      deadline: taskDeadlineSchema,
    },
    required: ['title', 'deadline'],
  },
  params: {
    type: 'object',
    properties: {
      id: taskIdSchema,
    },
    required: ['id'],
  },
  response: {
    200: taskSchema,
    404: taskErrorSchema,
  },
};

export const deleteTaskSchema = {
  tags: TASK_TAGS,
  params: {
    type: 'object',
    properties: {
      id: taskIdSchema,
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Task was removed',
        },
      },
      required: ['message'],
    },
    404: taskErrorSchema,
  },
};

export const getOneTaskSchema = {
  tags: TASK_TAGS,
  params: {
    type: 'object',
    properties: {
      id: taskIdSchema,
    },
    required: ['id'],
  },
  response: {
    404: taskErrorSchema,
    200: taskSchema,
  },
};

export const getListTaskSchema = {
  tags: TASK_TAGS,
  querystring: {
    type: 'object',
    properties: {
      offset: paginationOffsetSchema,
      limit: paginationLimitSchema,
      projectId: projectIdSchema,
    },
    required: ['offset', 'limit', 'projectId'],
  },
  response: {
    200: getPaginatedResponseSchema<typeof taskSchema>(taskSchema),
  },
};
