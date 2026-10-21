<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

	export const buttonVariants = tv({
		base: "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-destructive rounded-[0.5rem] border border-transparent bg-clip-padding text-sm font-semibold leading-5 shadow-none [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center min-w-0 max-w-full whitespace-normal text-center wrap-anywhere transition-colors duration-[120ms] ease-[ease] motion-reduce:transition-none outline-none select-none disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 pointer-coarse:min-h-11 pointer-coarse:min-w-11 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary-hover",
				outline: "border-border-strong bg-background text-foreground hover:bg-muted aria-expanded:bg-muted",
				secondary: "border-border-strong bg-background text-foreground hover:bg-muted aria-expanded:bg-muted",
				ghost: "text-foreground hover:bg-muted aria-expanded:bg-muted",
				destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/85",
				link: "text-foreground underline underline-offset-4 hover:decoration-2",
			},
			size: {
				default: "min-h-9 gap-2 px-4 py-1.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
				xs: "min-h-7 gap-1 px-2 py-1 text-xs leading-4 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
				sm: "min-h-8 gap-1.5 px-3 py-1 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
				lg: "min-h-10 gap-2 px-5 py-2 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
				icon: "size-9",
				"icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? "link" : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
