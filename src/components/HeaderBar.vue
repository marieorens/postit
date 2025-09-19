<template>
  <header class="header-bar">
    <div class="logo">
      <img
        src="https://cdn.pixabay.com/photo/2016/03/31/19/56/sticky-note-1292817_1280.png"
        alt="Post-it Logo"
      />
      <span class="app-name">Post-it</span>
    </div>
    
    <div class="search-bar" v-if="showSearch">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Rechercher un post-it..." 
        @input="search"
        class="search-input"
      />
      <button class="clear-search" @click="clearSearch" v-if="searchQuery">×</button>
    </div>
    
    <div class="actions">
      <button class="search-toggle" @click="toggleSearch">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
      <button class="create-btn" @click="$emit('create')">New Post-it🖋️</button>
      <button class="delete-btn" @click="$emit('deleteAll')">Delete All🚮</button>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderBar",
  data() {
    return {
      searchQuery: '',
      showSearch: false
    };
  },
  methods: {
    search() {
      this.$emit('search', this.searchQuery);
    },
    clearSearch() {
      this.searchQuery = '';
      this.$emit('search', '');
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
      if (!this.showSearch) {
        this.clearSearch();
      }
    }
  }
};
</script>

<style scoped>
.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3758f9;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(55, 88, 249, 0.08);
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.logo img {
  height: 40px;
  width: auto;
}

.app-name {
  font-size: 1.5rem;
  font-weight: bold;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.create-btn, .delete-btn, .search-toggle {
  background: white;
  color: #3758f9;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.create-btn:hover, .search-toggle:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
}

.delete-btn {
  background: #ff4d4f;
  color: white;
}

.delete-btn:hover {
  background: #ff7875;
}

.search-toggle {
  padding: 0.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-bar {
  position: relative;
  flex: 1;
  max-width: 400px;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 0.6rem 2.5rem 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-input:focus {
  background: white;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  outline: none;
}

.clear-search {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.clear-search:hover {
  background: rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .header-bar {
    flex-direction: column;
    padding: 1rem;
  }
  
  .search-bar {
    max-width: 100%;
    margin: 0.5rem 0;
  }
  
  .actions {
    width: 100%;
    justify-content: center;
  }
}
</style>