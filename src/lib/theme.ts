import { localStorage, persist } from "@macfja/svelte-persistent-store";
import { writable } from "svelte/store";

const theme = persist(writable(false), localStorage(true), 'isDark')

function toggle() {
    theme.update(e => !e)
}

export default theme;
export { theme, toggle }