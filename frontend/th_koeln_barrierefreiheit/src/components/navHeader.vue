<template>
  <div class="m-navHead">
    <button id="icon-main-menu" class="m-navHead--hamburger" aria-label="Menu Button">
      <svg id="menu-button-wrap" width="100%" height="100%" viewBox="0 0 225 175" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="menu-button" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <rect id="balken-1" fill="#9313CE" x="25" y="25" width="175" height="25"></rect>
          <rect id="balken-2" fill="#9313CE" x="25" y="75" width="175" height="25"></rect>
          <rect id="balken-3" fill="#9313CE" x="25" y="125" width="175" height="25"></rect>
        </g>
      </svg>
    </button>
    <div class="m-navHead--text">
      <a href="https://www.medieninformatik.th-koeln.de/">mi </a>
      <span class="m-navHead--logoSlash">/</span>
      <span class="m-navHead--logoSlug">
				<a href="https://www.medieninformatik.th-koeln.de/">&nbsp;accessibility</a>
			</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navHeader'
}
</script>
