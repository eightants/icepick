<script lang="ts">
</script>

<main class="w-full justify-center flex h-full">
  <div
    class="modal p-8 pt-6 flex flex-col rounded-xl w-full h-full z-10 overflow-auto md:p-6 hide-scrollbar"
  >
    <div class="pb-6 flex items-center">
      <img
        src="assets/bookmarks.svg"
        alt="Bookmarks icon for about page"
        class="bookmark-icon"
      />
      <h4 class="text-xl ml-2">What is Icepick?</h4>
    </div>
    <p class="text-sm">
      No matter who you are talking to, the best way to have a conversation is
      to talk about something of interest to both of you. What better way to
      find those mutual interests than questions?
      <br /><br />
      Icepick hosts a large question bank with questions from different lists across
      the web. Questions for any situation can be found here. Simply select the category
      you're interested in and click 'Shuffle'. No more awkward silences!
    </p>
    <div class="flex flex-col w-full">
      <a
        href="https://github.com/eightants/icepick"
        target="_blank"
        rel="noopener noreferrer"
        ><button class="rounded p-3 text-center btn w-full mt-8 text-sm"
          >✨ Star on GitHub</button
        ></a
      >
      <a
        href="https://ko-fi.com/eightants"
        target="_blank"
        rel="noopener noreferrer"
        ><button class="rounded p-3 text-center btn-outline w-full mt-1 text-sm"
          >☕ Buy me a coffee</button
        ></a
      >
      <a
        href="https://vercel.com?utm_source=anthill&utm_campaign=oss"
        class="w-24 opacity-40 mt-4 -mb-2 mx-auto md:hidden"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="assets/vercel.svg" alt="Icepick is powered by Vercel. " /></a
      >
    </div>
  </div>
</main>

<style>
  .btn {
    background: #292929;
    color: #fdfdfd;
  }
  .btn-outline {
    border: 1px solid #292929;
    color: #292929;
  }
  p {
    font-weight: 400;
    color: #464443;
  }

  .modal {
    background-color: #fdfdfd;
    max-width: 360px;
    /* border: 1px solid rgb(207, 207, 207); */
    /* box-shadow: rgba(0, 0, 0, 0.12) 0px 30px 60px 0px */
  }

  @media (prefers-color-scheme: dark) {
    .modal {
      background: #313131;
    }

    p {
      color: #e0e0e0;
    }

    .btn,
    .btn-outline {
      border: 1px solid #fdfdfd;
      color: #fdfdfd;
      background: none;
    }
    .bookmark-icon {
      filter: invert(1);
    }
  }
</style>
