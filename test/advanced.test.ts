import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Advanced from './Advanced.svelte';

const state = () => JSON.parse(screen.getByTestId('adv').textContent!);
const tick = () => new Promise((r) => setTimeout(r, 0));

describe('advanced components', () => {
  it('drives combobox, command, calendar, date picker and toggle group', async () => {
    const { container } = render(Advanced);

    const combo = screen.getByRole('combobox', { name: 'Framework' }) as HTMLInputElement;
    await fireEvent.input(combo, { target: { value: 'sv' } });
    await tick();
    await fireEvent.keyDown(combo, { key: 'Enter' });
    await tick();
    expect(combo.value).toBe('Svelte');

    const cmd = screen.getByRole('combobox', { name: 'Type a command or search…' });
    await fireEvent.input(cmd, { target: { value: 'save' } });
    await tick();
    await fireEvent.keyDown(cmd, { key: 'Enter' });

    await fireEvent.keyDown(document, { key: 'k', metaKey: true });
    await fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
    await tick();
    expect(container.querySelector('dialog')!.open).toBe(true);

    const day = screen.getAllByRole('button', { name: /September 25, 2026/ })[0]!;
    day.focus();
    await fireEvent.keyDown(day, { key: 'ArrowDown' });
    await tick();
    await fireEvent.click(document.activeElement!);

    expect(screen.getByRole('button', { name: /Sep 25, 2026/ })).toBeTruthy();
    expect((container.querySelector('input[name=due]') as HTMLInputElement).value).toBe('2026-09-25');

    await fireEvent.click(screen.getByRole('button', { name: 'B' }));
    await fireEvent.click(screen.getByRole('button', { name: 'I' }));

    expect(state()).toEqual({ framework: 'svelte', day: '2026-10-02', format: ['b', 'i'], picked: 'save' });
  });
});
