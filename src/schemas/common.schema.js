export const paginationOffsetSchema = {
  type: 'number',
  minimum: 0,
};

export const paginationLimitSchema = {
  type: 'number',
  minimum: 1,
  maximum: 20,
};

export const getPaginatedResponseSchema = (schema) => {
  return {
    type: 'object',
    properties: {
      count: {
        type: 'number',
      },
      items: {
        type: 'array',
        items: schema,
      },
    },
    required: ['items', 'count'],
  };
};
