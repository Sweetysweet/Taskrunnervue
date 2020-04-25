import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // push в tasks или в новый созданный массив
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
      if (new Date(task.date) < new Date()) {
        task.status = 'outdated'
      }
      return task
    })
  },
  mutations: {
    // изменяем store
    createTask(state, task) {
      state.tasks.push(task)

      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, {id, description, date, time}) {
      const tasks = state.tasks.concat()

      const index = tasks.findIndex(t => t.id === id)
      const task = tasks[index]

      const status = new Date(date) > new Date() ? 'active' : 'outdated'
      tasks[index] = {...task, date, description, status, time}
      state.tasks = tasks

      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    completeTask(state, id) {
      const index = state.tasks.findIndex(t => t.id === id)
      state.tasks[index].status = 'completed'
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    // метод commit,  и объект задач => mutation
    createTask({commit}, task) {
      commit('createTask', task)
    },
    updateTask({commit}, task) {
      commit('updateTask', task)
    },
    completeTask({commit}, id) {
      commit('completeTask', id)
    }
  },
  // вычисляющие свойства store>state
  getters: {
    tasks: s => s.tasks,
    // получение по id  текущую задачу
    taskById: s => id => s.tasks.find(t => t.id === id)
  }
})
