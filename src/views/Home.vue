<template>
  <header class="landing-header">
    <div class="container">
      <nav class="navbar">
        <div class="logo">
          <img src="" alt="Post-it Logo" />
          <span>Post-it Manager</span>
        </div>
      </nav>
      <div class="hero">
        <div class="hero-content">
          <h1>Manage your ideas with style.</h1>
          <p>
            Create, manage and visualise your postits with ease.<br />Postit is a vue.js
            web app I created during the coding academy!
          </p>
        </div>
        <div class="hero-img">
          <a href="/all" class="cta-btn">Go to my Post-its</a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.landing-header {
  background: linear-gradient(#3758f9);
  color: #fff;
  padding-bottom: 2rem;
  box-shadow: 0 2px 16px rgba(55, 88, 249, 0.08);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0 1rem 0;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.3rem;
  font-weight: bold;
}
.logo img {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(55, 88, 249, 0.12);
}
.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.5rem;
  gap: 2rem;
}
.hero-content {
  max-width: 500px;
}
.hero-content h1 {
  font-size: 2.7rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  color: #ffffff;
}
.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #f3f3f3;
}
.cta-btn {
  display: inline-block;
  background: #ffd700;
  color: #3758f9;
  font-weight: 700;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(55, 88, 249, 0.12);
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.cta-btn:hover {
  background: #42b983;
  color: #fff;
}
.hero-img img {
  max-width: 320px;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(55, 88, 249, 0.18);
}
@media (max-width: 900px) {
  .hero {
    flex-direction: column;
    align-items: flex-start;
  }
  .hero-img img {
    max-width: 100%;
    margin-top: 2rem;
  }
}
</style>

<script>
export default {
  name: "HomeView",
  methods: {
    goToAllPosts() {
      this.$router.push("/all");
    },
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
