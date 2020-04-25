<template>
    <div>
        <h1>Список задач</h1>
        <div class="row">
            <div class="input-field s6 col">
                <select ref="select" v-model="filter">
                    <option value="" disabled selected>Выберите фильтр статуса</option>
                    <option value="active">Активные задачи</option>
                    <option value="outdated">Просроченые задачи</option>
                    <option value="completed">Выполненые задачи</option>
                </select>
                <label>Фильтр статуса задач</label>
            </div>
        </div>

        <button v-if="filter" class="btn btn-small red" @click="filter = null">Очистить фильтр</button>       
        <hr>
        <table v-if="tasks.length">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Название задачи</th>
                    <th>Дата выполнения</th>
                    <th>Описание</th>
                    <th>Статус</th>
                    <th>Время окончания задачи</th>
                    <th>Открыть задачу</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(task, index) of displayTasks"
                    :key="task.id"
                >
                    <td>{{index + 1}}</td>
                    <td>{{task.title}}</td>
                    <td>{{new Date(task.date).toLocaleDateString()}}</td>
                    <td class="td"><div class="text">{{task.description}}</div></td>
                    <td class="status">{{task.status}}</td>
                    <td>{{task.time}}</td>
                    <td>
                        <router-link tag="button" class="btn btn-small" :to="'/task/' + task.id">
                            Открыть задачу
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>Нет поставленных задач</p>
    </div>
</template>

<script>
export default {
    data: () => ({
        filter: null
    }),
    computed: {
        tasks() {
            return this.$store.getters.tasks
        },
        displayTasks() {
            return this.tasks.filter(t => {
                if (!this.filter) {
                    return true
                }
                return t.status === this.filter 
            })
        }
    },
    mounted() {
        M.FormSelect.init(this.$refs.select)
    }
}
</script>

<style lang="scss" scoped>

    .td {
        max-width: 400px;
    }

    .text {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .status {
        color: rgb(21, 133, 7)
    }
</style>