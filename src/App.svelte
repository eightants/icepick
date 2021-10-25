<script lang="ts">
  import { onMount } from 'svelte';
  import Papa from 'papaparse';

  import Card from './Card.svelte';
  import type { Question } from './types/question.type';
  import Modal from './Modal.svelte';

  const CATEGORIES = {
    0: 'All',
    1: 'Icebreakers',
    2: 'Get to Know',
    3: 'Business'
  };

  let questions = [];
  let menuw: number;
  let xCoord = menuw / 2 - 60;
  let currentCategory = 0;
  let currentQuestion: Question = {
    index: 0,
    question: '',
    tags: ''
  };
  let loading = true;
  let showAbout = false;

  onMount(() => {
    loading = true;
    xCoord = menuw / 2 - 60;
    Papa.parse('/assets/questions.csv', {
      delimiter: '|',
      header: true,
      download: true,
      complete: function (results) {
        questions = results.data.filter((q: { index: number }) => q.index);
        currentQuestion = getQuestion(currentCategory);
      }
    });
  });

  const toggleAbout = () => {
    showAbout = !showAbout;
  };

  const selectCategory = (ind: number) => {
    currentCategory = ind;
    xCoord = menuw / 2 - 60 - ind * 120;
    currentQuestion = getQuestion(ind);
  };

  const getQuestion = (category: number) => {
    loading = true;
    if (category === 0) {
      const randomIndex = Math.floor(Math.random() * questions.length + 1);
      loading = false;
      return questions[randomIndex];
    }
    const filteredQuestions = questions.filter((q) =>
      q.tags.includes(CATEGORIES[category].toLowerCase())
    );
    const randomIndex = Math.floor(
      Math.random() * filteredQuestions.length + 1
    );
    console.log(randomIndex);
    loading = false;
    return filteredQuestions[randomIndex];
  };
</script>

<main class="flex flex-col justify-between min-h-full">
  {#if showAbout}
    <div class="absolute p-6 right-0 modal-setup md:p-2"><Modal /></div>
  {/if}
  <div class="w-full grid grid-cols-3 p-10 pb-4 md:p-6 md:pb-2">
    <div>
      <img src="/assets/filter.svg" alt="Filter icon" class="icons hidden" />
    </div>
    <div class="w-full flex justify-center items-center">
      <img alt="Transparent logo" src="/icepick.svg" class="w-12" />
      <h2 class="text-2xl font-semibold md:hidden">icepick.</h2>
    </div>
    <div class="flex justify-end">
      <div class="w-full flex items-end hidden md:flex md:flex-col">
        {#if loading}
          <div class="shimmer shimmer-bg h-6 w-16" />
          <div class="shimmer shimmer-bg h-4 w-10 my-1" />
        {:else}
          <h3 class="text-4xl font-bold transition-all">
            {currentQuestion.index || 0}
          </h3>
          <div class="inline-block items-baseline">
            <p class="inline-block pl-2 text-lg pb-1 font-bold">
              /{questions.length}
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div class="w-full py-10 block">
    <div
      bind:clientWidth={menuw}
      class="categories mx-auto relative whitespace-nowrap overflow-hidden my-2 pb-6 w-full md:w-11/12"
    >
      <div class="category-gradient" />
      <div
        class="inline-flex whitespace-nowrap min-w-full moving-strip"
        style="transform: translateX({xCoord}px)"
      >
        {#each Object.entries(CATEGORIES) as [_, category], index}
          <div
            class="p-2 text-center category relative cursor-pointer"
            on:click={() => selectCategory(index)}
          >
            <p class:selected={currentCategory === index}>{category}</p>
          </div>
        {/each}
      </div>
    </div>
    <div class="w-full flex justify-center pb-4">
      <Card question={currentQuestion} {loading} />
    </div>
  </div>
  <div class="w-full grid grid-cols-3 p-10 pb-16 md:flex md:p-2 md:pb-8">
    <div class="flex items-end md:hidden">
      {#if loading}
        <div class="shimmer shimmer-bg h-8 w-16" />
        <div class="shimmer shimmer-bg h-6 w-10 mx-1" />
      {:else}
        <h3 class="text-6xl font-bold">{currentQuestion.index || 0}</h3>
        <div class="inline-block items-baseline">
          <p class="inline-block px-2 text-xl pb-1 font-bold">
            /{questions.length}
          </p>
        </div>
      {/if}
    </div>
    <div class="w-full text-center items-center md:flex md:justify-between">
      <a
        href="https://twitter.com/yihonganthony"
        class="cursor-pointer"
        target="_blank"
        rel="noopener noreferrer"
        ><div
          class="rounded-full social-btn p-4 cursor-pointer m-1 hidden md:inline-block"
        >
          <img
            src="/assets/gift.svg"
            alt="Gift icon for social links"
            class="icons-dark"
          />
        </div></a
      >
      <div class="md:flex-auto">
        <button
          class="rounded-full px-10 py-3 shuffle text-lg w-full "
          on:click={() => {
            currentQuestion = getQuestion(currentCategory);
          }}>Shuffle</button
        >
      </div>
      <div
        class="rounded-full social-btn p-4 cursor-pointer m-1 hidden md:inline-block"
        on:click={toggleAbout}
      >
        <img
          src="/assets/bookmarks.svg"
          alt="Bookmarks icon for about section"
          class="icons-dark"
        />
      </div>
    </div>
    <div class="flex justify-end md:hidden">
      <a
        href="https://twitter.com/yihonganthony"
        target="_blank"
        rel="noopener noreferrer"
        ><div class="rounded-full social-btn p-4 cursor-pointer m-1">
          <img
            src="/assets/gift.svg"
            alt="Gift icon for social links"
            class="icons-dark"
          />
        </div>
      </a>
      <div
        class="rounded-full social-btn p-4 cursor-pointer m-1"
        on:click={toggleAbout}
      >
        <img
          src="/assets/bookmarks.svg"
          alt="Bookmarks icon for about section"
          class="icons-dark"
        />
      </div>
    </div>
  </div>
</main>

<style>
  .modal-setup {
    bottom: 140px;
    /* height: calc(100% - 200px); */
  }
  .shuffle {
    background: linear-gradient(309.23deg, #ff773d 53.06%, #ff9365 85.43%);
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.15);
    color: #fdfdfd;
    font-weight: bold;
    max-width: 220px;
  }

  .selected {
    color: #464443;
    display: inline-block;
  }

  .selected::before {
    transform: translateX(-50%);
    border-radius: 100%;
    position: absolute;
    background: #464443;
    bottom: -2px;
    height: 5px;
    content: '';
    width: 5px;
    left: 50%;
  }

  .categories {
    max-width: 560px;
  }

  .moving-strip {
    transition: transform 0.5s ease-in-out 0.1s;
  }

  .category-gradient {
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      90deg,
      rgb(242, 242, 242) 0%,
      rgba(242, 242, 242, 0) 30%,
      rgba(242, 242, 242, 0) 30%,
      rgba(242, 242, 242, 0) 70%,
      rgb(242, 242, 242) 100%
    );
  }

  .category {
    width: 120px;
  }

  .social-btn {
    background: rgba(0, 0, 0, 0.05);
  }

  @media (prefers-color-scheme: dark) {
    .modal-setup {
      bottom: 100px;
      height: calc(100% - 140px);
    }
    .social-btn {
      background: rgba(255, 255, 255, 0.1);
    }
    .category-gradient {
      background: linear-gradient(
        90deg,
        rgb(40, 38, 38) 0%,
        rgba(40, 38, 38, 0) 30%,
        rgba(40, 38, 38, 0) 30%,
        rgba(40, 38, 38, 0) 70%,
        rgb(40, 38, 38) 100%
      );
    }
    .icons {
      filter: invert(1);
    }

    .selected {
      color: #e0e0e0;
    }

    .selected::before {
      background: #e0e0e0;
    }
  }
</style>
