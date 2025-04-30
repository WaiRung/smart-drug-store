<script setup lang="ts">
interface Props {
  size?: "md" | "lg";
  block?: boolean;
  disabled?: false;
  styleName?: "outline" | "primary" | "inverted";
  className?: string;
  [x: string]: any;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  styleName: "primary",
});

const sizes = {
  md: "px-5 py-2.5",
  lg: "px-4 py-1",
};

const styles = {
  outline: "border border-green-800 hover:bg-green-800 text-green-800 hover:text-white",
  primary:
    "bg-green-800 hover:bg-green-900 disabled:bg-gray-500 text-white  border-2 border-transparent",
  inverted:
    "bg-white hover:bg-green-800 text-green-800 hover:text-white border-2 border-green-800",
};

// a computed ref
const btnClass = computed(() => {

  const style = styles[props.styleName as keyof typeof  styles]
  let returnValue = [
    'rounded-lg text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200',
    props.block && 'w-full',
    sizes[props.size],
    style,
    props.className
  ] as const
  return returnValue
})
</script>

<template>
  <button :class="btnClass" :disabled="props.disabled">
    <slot />
  </button>
</template>