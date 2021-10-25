<script lang="ts">
  import type { Question } from './types/question.type';

  export let question: Question;
  export let loading: boolean;
</script>

<main class="md:px-2 w-full justify-center flex">
  <div class="card p-8 flex flex-col rounded-xl justify-between w-full md:p-6">
    {#if loading}
      <div class="shimmer shimmer-bg h-8 w-full" />
      <div class="shimmer shimmer-bg h-4 w-20" />
    {:else}
      <h2 class="text-4xl mb-6 md:text-2xl">
        {question.question}
      </h2>
      <p>
        {question.tags
          .split(',')
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join('. ') + '. '}
      </p>
    {/if}
  </div>
</main>

<style>
  .card {
    background-color: #fdfdfd;
    max-width: 560px;
    min-height: 240px;
  }

  @media (prefers-color-scheme: dark) {
    .card {
      background: #313131;
    }
  }
</style>
