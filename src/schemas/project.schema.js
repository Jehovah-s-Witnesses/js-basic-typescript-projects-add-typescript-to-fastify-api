import { PROJECT_TAGS } from '../constants/project.constants.js';
import {
  getPaginatedResponseSchema,
  paginationLimitSchema,
  paginationOffsetSchema,
} from './common.schema.js';

export const projectNameSchema = {
  type: 'string',
  minLength: 4,
  maxLength: 30,
};

export const projectErrorSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: 'Project does not exist',
    },
  },
  required: ['message'],
};

export const projectIdSchema = {
  type: 'string',
};

export const projectSchema = {
  type: 'object',
  properties: {
    _id: projectIdSchema,
    name: projectNameSchema,
  },
  required: ['name', '_id'],
};

export const createProjectSchema = {
  tags: PROJECT_TAGS,
  body: {
    type: 'object',
    properties: {
      name: projectNameSchema,
    },
    required: ['name'],
  },
  response: {
    201: projectSchema,
  },
};

export const updateProjectSchema = {
  tags: PROJECT_TAGS,
  body: {
    type: 'object',
    properties: {
      name: projectNameSchema,
    },
    required: ['name'],
  },
  params: {
    type: 'object',
    properties: {
      id: projectIdSchema,
    },
    required: ['id'],
  },
  response: {
    200: projectSchema,
    404: projectErrorSchema,
  },
};

export const deleteProjectSchema = {
  tags: PROJECT_TAGS,
  params: {
    type: 'object',
    properties: {
      id: projectIdSchema,
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Project was removed',
        },
      },
      required: ['message'],
    },
    404: projectErrorSchema,
  },
};

export const getOneProjectSchema = {
  tags: PROJECT_TAGS,
  params: {
    type: 'object',
    properties: {
      id: projectIdSchema,
    },
    required: ['id'],
  },
  response: {
    404: projectErrorSchema,
    200: projectSchema,
  },
};

export const getListProjectSchema = {
  tags: PROJECT_TAGS,
  querystring: {
    type: 'object',
    properties: {
      offset: paginationOffsetSchema,
      limit: paginationLimitSchema,
    },
    required: ['offset', 'limit'],
  },
  response: {
    200: getPaginatedResponseSchema(projectSchema),
  },
};
