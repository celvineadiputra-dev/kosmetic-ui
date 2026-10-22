<script lang="ts">
    import "./layout.css";
    import favicon from "#lib/assets/favicon.svg";
    import type { LayoutProps } from "./$types";
    import { browser, dev } from "$app/env";
    import { Agentation, type AnnotationProps } from "sv-agentation";
    import CartDrawer from "#lib/components/storefront/CartDrawer.svelte";

    let { children }: LayoutProps = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
<CartDrawer />

{#if browser && dev}
    <Agentation />
{/if}
