<script lang="ts">
  export let question: any;
</script>

<main class="md:px-8 w-full justify-center flex">
  <div class="card p-8 flex flex-col rounded-xl justify-between w-full">
    <h2 class="text-4xl mb-6 md:text-3xl">
      {question.question}
    </h2>
    <p>Everyday. Icebreakers. Get to Know.</p>
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
