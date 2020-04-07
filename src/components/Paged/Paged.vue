<template>
  <div>
    <Loading
      :reqs="['getCards']"
      component="Spinner"
    >
      <div class="flex flex-wrap justify-center">
        <div
          v-for="element in data"
          :key="element.id"
        >
          <slot :element="element" />
        </div>
      </div>
    </Loading>
    <nav v-if="total > perPage">
      <ul class="flex justify-center items-center">
        <li class="mx-2">
          <button
            v-if="page != 1"
            type="button"
            class="bg-transparent hover:bg-blue-900 dark-hover:bg-white dark:text-white text-blue-900 font-semibold hover:text-white dark-hover:text-blue-900 py-2 px-4 border dark:border-white border-blue-900 hover:border-transparent rounded"
            @click="page--"
          >
            Previous
          </button>
        </li>
        <li class="mx-2">
          <button
            v-for="pageNumber in pages.slice(0, page > 3 ? 1 : 3)"
            :key="`page.${pageNumber}`"
            type="button"
            :class="['mx-2 dark:text-white', page === pageNumber ? 'dark:text-gray-600' : '']"
            @click="page = pageNumber"
          >
            {{ pageNumber }}
          </button>
        </li>
        <li v-if="page > 3 && page < pages.length - 2">
          <span class="inline align-middle">
            ...
          </span>
        </li>
        <li
          v-if="page > 3 && page < pages.length - 2"
          class="mx-2"
        >
          <button
            v-for="pageNumber in pages.slice(page - 3, page + 2)"
            :key="`page.${pageNumber}`"
            type="button"
            :class="['mx-2 dark:text-white', page === pageNumber ? 'dark:text-gray-600' : '']"
            @click="page = pageNumber"
          >
            {{ pageNumber }}
          </button>
        </li>

        <li>
          <span class="inline align-middle">
            ...
          </span>
        </li>
        <li class="mx-2">
          <button
            v-for="pageNumber in pages.slice(page < pages.length - 2 ? pages.length - 1 : pages.length - 3, pages.length)"
            :key="`page.${pageNumber}`"
            type="button"
            :class="['mx-2 dark:text-white', page === pageNumber ? 'dark:text-gray-600' : '']"
            @click="page = pageNumber"
          >
            {{ pageNumber }}
          </button>
        </li>
        <li class="mx-2">
          <button
            v-if="page < pages.length"
            type="button"
            class="bg-transparent hover:bg-blue-900 dark-hover:bg-white dark:text-white text-blue-900 font-semibold hover:text-white dark-hover:text-blue-900 py-2 px-4 border dark:border-white border-blue-900 hover:border-transparent rounded"
            @click="page++"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Paged',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    getData: {
      type: Function,
      default: () => null,
    },
  },
  data() {
    return {
      page: 1,
      perPage: 20,
      pages: [],
    };
  },
  computed: {},
  watch: {
    page(newValue, oldValue) {
      if (newValue !== oldValue) this.getData({ lim: this.perPage, offset: this.perPage * (this.page - 1) });
    },
    total() {
      this.setPages();
    },
  },
  created() {
    this.setPages();
    this.getData({ lim: this.perPage, offset: this.perPage * (this.page - 1) });
  },
  methods: {
    setPages() {
      const numberOfPages = Math.ceil(this.total / this.perPage);
      this.pages = [];
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
