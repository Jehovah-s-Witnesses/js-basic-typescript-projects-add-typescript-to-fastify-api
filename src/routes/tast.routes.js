import { taskService } from '../services/task.service.js';

export const createTaskRoute = async (request, reply) => {
  const { title, deadline, projectId } = request.body;

  const task = await taskService.create(title, deadline, projectId);

  reply.status(201).send(task);
};

export const updateTaskRoute = async (request, reply) => {
  const {
    body: { title, deadline },
    params: { id },
  } = request;

  if (!(await taskService.getOne(id))) {
    return reply.status(404).send('Task does not exist');
  }

  const task = await taskService.update(id, title, deadline);

  reply.send(task);
};

export const deleteTaskRoute = async (request, reply) => {
  const { id } = request.params;

  if (!(await taskService.getOne(id))) {
    return reply.status(404).send('Task does not exist');
  }

  await taskService.delete(id);

  reply.send({ message: 'Task was removed' });
};

export const getOneTaskRoute = async (request, reply) => {
  const { id } = request.params;
  const task = await taskService.getOne(id);

  if (!task) {
    return reply.status(404).send('Task does not exist');
  }

  reply.send(task);
};

export const getListTaskRoute = async (request, reply) => {
  const { limit, offset, projectId } = request.query;

  const taskListData = await taskService.getList(projectId, offset, limit);

  reply.send(taskListData);
};
