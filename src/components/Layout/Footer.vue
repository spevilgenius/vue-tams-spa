<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark bg-black p-0">
    <ul class="navbar-nav mx-auto">
      <li class="nav-item footer-item">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item footer-item">
        <a class="nav-link" href="/">Link 1</a>
      </li>
      <li class="nav-item footer-item">
        <a class="nav-link" href="/">Link 2</a>
      </li>
      <li class="nav-item footer-item">
        <a class="nav-link" href="/">Link 3</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss">
.footer {
  width: 100%;
  background-color: #000000 !important;
}

.bg-dark {
  background-color: #000000 !important;
}

.footer-item {
  min-width: 200px;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
}

.footer-item .nav-link {
  color: white !important;
  padding: 23px 1rem;
}
</style>
