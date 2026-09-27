import ButtonDemo from './ButtonDemo.svelte';
import InputDemo from './InputDemo.svelte';
import DialogDemo from './DialogDemo.svelte';
import DataTableDemo from './DataTableDemo.svelte';
import ChartDemo from './ChartDemo.svelte';
import BadgeDemo from './BadgeDemo.svelte';
import AvatarDemo from './AvatarDemo.svelte';
import SeparatorDemo from './SeparatorDemo.svelte';
import HeadingDemo from './HeadingDemo.svelte';
import SpinnerDemo from './SpinnerDemo.svelte';
import SkeletonDemo from './SkeletonDemo.svelte';

export const demos = {
  button: ButtonDemo,
  input: InputDemo,
  dialog: DialogDemo,
  'data-table': DataTableDemo,
  chart: ChartDemo,
  badge: BadgeDemo,
  avatar: AvatarDemo,
  separator: SeparatorDemo,
  heading: HeadingDemo,
  spinner: SpinnerDemo,
  skeleton: SkeletonDemo,
} as const;
