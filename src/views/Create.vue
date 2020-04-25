<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Новая задача</h1>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="title" v-model="title" type="text" class="validate" required>
          <label for="title">Наименование задачи</label>
           <span class="helper-text" data-error="Введите наименование задачи"></span>
        </div>

        <div class="chips" ref="chips"></div>
          <div class="input-field">
            <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
            <label for="description">Описание задачи</label>
            <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
          </div>

          <input type="text" ref="datepicker">
          <input type="text" ref="timepicker">
          <button class="btn" type="submit">Создать задачу</button>  
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Create',

  data: () => ({
    description: '',
    title: '',
    chips: null,
    date: null,
    time: null
  }),

  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Тег задачи'
    })
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true
    })
    this.time = M.Timepicker.init(this.$refs.timepicker, {
      twelveHour: false,
      defaultTime: 'now'
    });
  },

  methods: {
    submitHandler() {
      const task = {
        title: this.title,
        description: this.description,
        id: Date.now(),
        status: 'active',
        tags: this.chips.chipsData,
        date: this.date.date,
        time: this.time.time
      }
    // передача задачи во vuex
      this.$store.dispatch('createTask', task)
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

    if (this.time && this.time.destroy) {
      this.time.destroy()
    }
  }
}
</script>
