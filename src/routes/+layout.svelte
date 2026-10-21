<script lang="ts">
    import "./layout.css";
    import favicon from "#lib/assets/favicon.svg";
    import type { LayoutProps } from "./$types";
    import { browser, dev } from "$app/env";
    import { Agentation, type AnnotationProps } from "sv-agentation";

    let { children }: LayoutProps = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

{#if browser && dev}
    <Agentation />
{/if}
