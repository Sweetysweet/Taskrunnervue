<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <h1>{{task.title}}</h1>
      <form @submit.prevent="submitHandler">

        <div class="chips" ref="chips"></div>
          <div class="input-field">
            <textarea style="min-height: 150px;" v-model="description" id="description" class="materialize-textarea"></textarea>
            <label for="description">Описание задачи</label>
            <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
          </div>

          <input type="text" ref="datepicker">
          <input type="text" ref="timepicker" placeholder="Время задачи">
          <div v-if="task.status !=='completed'">
            <button class="btn" type="submit" style="margin-right: 1rem;">Обновить задачу</button>
            <button class="btn blue" type="button" @click="completeTask">Завершить задачу</button>
          </div>  
      </form>
    </div>
    <h2 v-else>Задача не найдена</h2>
  </div>
</template>

<script>
export default {
    computed: {
      task() {
        // преобразуем строку к number через + 
        return this.$store.getters.taskById(+this.$route.params.id)
      }
    },

    data: () => ({
    description: '',
    chips: null,
    date: null,
    time: null
  }),

  mounted() {
    this.description = this.task.description
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Тег задачи',
      data: this.task.tags
    })
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(this.task.date),
      setDefaultDate: true
    })
    this.time = M.Timepicker.init(this.$refs.timepicker, {
      twelveHour: false,
      defaultTime: this.task.time
    });
    setTimeout(() => {
      M.updateTextFields()
    }, 0);
  },

  methods: {
    submitHandler() {
    // передача задачи во vuex
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        description: this.description,
        date: this.date.date,
        time: this.time.time
      })
      // редирект на страницу
      this.$router.push('/list')
    },
    completeTask() {
      this.$store.dispatch('completeTask', this.task.id)
      this.$router.push('/list')
    }
    
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }

    if (this.chips && this.chips.destroy) {
      this.chips.destroy()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>