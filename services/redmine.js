import Redmine from 'axios-redmine';
import { REDMINE_ERROR } from "../constants/errorTypes";


const createRedmineInstance = (host, key) => {
  return new Promise(async (resolve, reject) => {
    const redmine = new Redmine(host, { apiKey: key }, '80');

    if (redmine instanceof Error) {
      redmine.type = REDMINE_ERROR
      return reject(redmine)
    }

    resolve(redmine)
  })
}

const safeWrapper = (fn) => (...args) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fn(...args)
      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
}

const getRedmineUserProjects = async (host, key, params = {}) => {
  const redmine = await createRedmineInstance(host, key);

  const { data } = await redmine.projects(params)
  return data
}

const getRedmineUserProject = async (host, key, id, params = {}) => {
  const redmine = await createRedmineInstance(host, key);

  const { data } = await redmine.get_project_by_id(id, params)
  return data
}

const getCurrentRedmineUser = async (host, key, id, params = {}) => {
  const redmine = await createRedmineInstance(host, key);

  const { data } = await redmine.current_user(id, params)
  return data
}

const getRedmineProjectIssues = async (host, key, id, params = {}) => {
  const redmine = await createRedmineInstance(host, key);

  const { data } = await redmine.issues(id, params)
  return data
}

export default {
  getRedmineUserProjects: safeWrapper(getRedmineUserProjects),
  getRedmineUserProject: safeWrapper(getRedmineUserProject),
  getCurrentRedmineUser: safeWrapper(getCurrentRedmineUser),
  getRedmineProjectIssues: safeWrapper(getRedmineProjectIssues),
}