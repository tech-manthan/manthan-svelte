import { fireEvent, render, screen } from '@testing-library/svelte';
import { flushSync } from 'svelte';
import { describe, expect, it } from 'vitest';
import { createToaster } from '../src/lib/index';
import Harness from './Harness.svelte';

const state = () => JSON.parse(screen.getByTestId('state').textContent!);

describe('@manthan/svelte', () => {
  it('renders, binds and wires every control', async () => {
    const store = createToaster();
    render(Harness, { props: { store } });

    const btn = screen.getByRole('button', { name: 'Delete' });
    expect(btn.className).toContain('mn-btn-soft');
    expect(btn.getAttribute('aria-busy')).toBe('true');

    const email = screen.getByLabelText('Email');
    expect(email.getAttribute('aria-invalid')).toBe('true');
    await fireEvent.input(email, { target: { value: 'ada@example.com' } });

    await fireEvent.click(screen.getByLabelText('Accept'));
    await fireEvent.click(screen.getByLabelText('B'));

    const slider = screen.getByLabelText('Volume') as HTMLInputElement;
    expect(slider.style.getPropertyValue('--mn-fill')).toBe('10%');

    const one = screen.getByRole('tab', { name: 'One' });
    one.focus();
    await fireEvent.keyDown(one, { key: 'ArrowRight' });
    expect(screen.getByText('Second').hidden).toBe(false);

    await fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    await fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
    expect((document.querySelector('dialog') as HTMLDialogElement).open).toBe(true);

    expect(state()).toMatchObject({ email: 'ada@example.com', agree: true, plan: 'b', tab: 'two', page: 6, open: true });

    store.success({ title: 'Saved', description: 'All good' });
    flushSync();
    expect(screen.getByText('All good').closest('[role=status]')).not.toBeNull();
    expect(screen.getAllByRole('alert')[0]!.textContent).toContain('Careful');
  });
});
