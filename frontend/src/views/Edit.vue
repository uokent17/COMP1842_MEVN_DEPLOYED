<template>
  <div class="container">
    <h2>Edit Item</h2>
    <form @submit.prevent="updateItem">
      <label for="name">Name:</label>
      <input id="name" v-model="form.name" required />

      <label for="description">Description:</label>
      <input id="description" v-model="form.description" required />

      <label for="language">Language:</label>
      <input id="language" v-model="form.language" required />

      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        name: '',
        description: '',
        language: ''
      }
    }
  },
  mounted() {
    this.fetchItem()
  },
  methods: {
    async fetchItem() {
      try {
        const id = this.$route.params.id
        const res = await axios.get(`http://localhost:8000/api/items/${id}`)
        this.form = res.data
      } catch (err) {
        console.error('❌ Fetch failed:', err.message)
        alert('Failed to load item.')
      }
    },
    async updateItem() {
      try {
        const id = this.$route.params.id
        await axios.put(`http://localhost:8000/api/items/${id}`, this.form)
        alert('✅ Item updated!')
        this.$router.push('/')
      } catch (err) {
        console.error('❌ Update failed:', err.message)
        alert('Something went wrong while updating.')
      }
    }
  }
}
</script>
