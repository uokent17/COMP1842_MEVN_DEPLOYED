<template>
  <div class="container">
    <h2>All Items</h2>

    <!-- 🔍 Search + Filter -->
    <div style="margin-bottom: 20px;">
      <input
        type="text"
        placeholder="Search by name or description"
        v-model="searchQuery"
        style="margin-right: 10px; padding: 5px;"
      />

      <select v-model="selectedLanguage" style="padding: 5px;">
        <option value="">All Languages</option>
        <option v-for="lang in uniqueLanguages" :key="lang" :value="lang">
          {{ lang }}
        </option>
      </select>
    </div>

    <!-- 🔢 Item Counter -->
    <p v-if="filteredItems.length" style="margin-bottom: 10px;">
      {{ filteredItems.length }} item{{ filteredItems.length !== 1 ? 's' : '' }} found
    </p>

    <!-- 🧾 Item List -->
    <div v-if="filteredItems.length">
      <div v-for="item in filteredItems" :key="item._id" class="item-box">
        <p><strong>Name:</strong> {{ item.name }}</p>
        <p><strong>Description:</strong> {{ item.description }}</p>
        <p><strong>Language:</strong> {{ item.language }}</p>

        <router-link :to="`/edit/${item._id}`">
          <button>Edit</button>
        </router-link>

        <button @click="deleteItem(item._id)">Delete</button>
      </div>
    </div>

    <!-- ❌ Empty State -->
    <div v-else>
      <p>No matching items found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      items: [],
      searchQuery: '',
      selectedLanguage: ''
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        const matchesSearch =
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(this.searchQuery.toLowerCase())

        const matchesLanguage =
          !this.selectedLanguage || item.language === this.selectedLanguage

        return matchesSearch && matchesLanguage
      })
    },
    uniqueLanguages() {
      return [...new Set(this.items.map(item => item.language))]
    }
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    async fetchItems() {
      try {
        const res = await axios.get('http://localhost:8000/api/items')
        this.items = res.data
      } catch (err) {
        console.error('❌ Fetch failed:', err.message)
        alert('Failed to load items.')
      }
    },
    async deleteItem(id) {
      if (!confirm('Are you sure you want to delete this item?')) return

      try {
        await axios.delete(`http://localhost:8000/api/items/${id}`)
        this.fetchItems()
      } catch (err) {
        console.error('❌ Delete failed:', err.message)
        alert('Delete failed.')
      }
    }
  }
}
</script>

<style>
.container {
  max-width: 600px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
}
.item-box {
  border: 1px solid #ccc;
  padding: 12px;
  margin: 10px 0;
  border-radius: 6px;
}
button {
  margin-right: 10px;
  padding: 6px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}
button:hover {
  background: #0056b3;
}
</style>
