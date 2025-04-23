<template>
  <div class="container">
    <h2>Add New Item</h2>
    <form @submit.prevent="createItem">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required />

      <label for="description">Description:</label>
      <input type="text" id="description" v-model="description" required />

      <label for="language">Language:</label>
      <input type="text" id="language" v-model="language" required />

      <button type="submit">Create Item</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      description: '',
      language: ''
    }
  },
  methods: {
    async createItem() {
      try {
        await axios.post('http://localhost:8000/api/items', {
          name: this.name,
          description: this.description,
          language: this.language
        })
        this.$router.push('/')
      } catch (err) {
        console.error('❌ Failed to create item:', err)
        alert('Something went wrong.')
      }
    }
  }
}
</script>
