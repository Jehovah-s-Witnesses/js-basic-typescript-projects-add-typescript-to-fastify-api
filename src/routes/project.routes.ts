import { projectService } from '../services/project.service';
import { FastifyReply, FastifyRequest } from 'fastify';

export const createProjectRoute = async (
  request: FastifyRequest<{ Body: { name: string } }>,
  reply: FastifyReply
)  => {
  const { name } = request.body;

  const project = await projectService.create(name);

  reply.status(201).send(project);
};

export const updateProjectRoute = async (
  request: FastifyRequest<{ Params: { id: string }; Body: { name: string } }>,
  reply: FastifyReply
) => {
  const {
    body: { name },
    params: { id },
  } = request;

  if (!(await projectService.getOne(id))) {
    return reply.status(404).send({ message: 'Project does not exist' });
  }

  const project = await projectService.update(id, name);

  reply.send(project);
};

export const deleteProjectRoute = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;

  if (!(await projectService.getOne(id))) {
    return reply.status(404).send({ message: 'Project does not exist' });
  }

  await projectService.delete(id);

  reply.send({ message: 'Project was removed' });
};

export const getOneProjectRoute = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
)  => {
  const { id } = request.params;
  const project = await projectService.getOne(id);

  if (!project) {
    return reply.status(404).send({ message: 'Project does not exist' });
  }

  reply.send(project);
};

export const getListProjectRoute = async (
  request: FastifyRequest<{ Querystring: { offset: number; limit: number } }>,
  reply: FastifyReply
)  => {
  const { limit, offset } = request.query;

  const projectListData = await projectService.getList(offset, limit);

  reply.send(projectListData);
};
