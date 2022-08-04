<script context="module">
    export async function load() {
        return {
            stuff: {
                auth: false,
                name: "Log In"
            }
        }
    }
</script>

<script lang="ts">
    import { session } from '$app/stores'
    import { send } from '$lib/api'
  
    export let error: string
  
    async function login(event: SubmitEvent) {
      const formEl = event.target as HTMLFormElement
      const response = await send(formEl)
  
      if (response.error) {
        error = response.error
      }
  
      $session.user = response.user
  
      formEl.reset()
    }
  </script>
  
  <form on:submit|preventDefault={login} method="post">
    <div>
      <label for="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        required
      />
    </div>
  
    <div>
      <label for="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        required
      />
    </div>
  
    {#if error}
      <p class="text-error">{error}</p>
    {/if}
  
    <button type="submit">Sign In</button>
  </form>