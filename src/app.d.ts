// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

type User = {
	username: string,
	id: string,
	plots: Array,
	username: string,
	userAuthToken?: string,
}

declare namespace App {
	interface Locals {
		user?: User
	}
	interface Session {
		user?: User
	}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
	interface Stuff {
		auth: boolean,
		name: string
	}
}
