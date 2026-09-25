import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Forms from './Forms.svelte';

const tick = () => new Promise((r) => setTimeout(r, 0));

describe('useForm + FileUpload', () => {
  it('validates, submits and handles files', async () => {
    const onSubmit = vi.fn();
    render(Forms, { props: { onSubmit } });
    const email = screen.getByLabelText('Email');
    await fireEvent.input(email, { target: { value: 'nope' } });
    expect(screen.queryByText(/valid email/)).toBeNull();
    await fireEvent.blur(email);
    expect(screen.getByText(/valid email/)).toBeTruthy();
    expect(email.getAttribute('aria-invalid')).toBe('true');

    await fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    await tick();
    expect(screen.getByText('Accept the terms.')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();

    await fireEvent.input(email, { target: { value: 'ada@example.com' } });
    await fireEvent.click(screen.getByLabelText('I agree'));
    await fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    await tick();
    expect(onSubmit).toHaveBeenCalledWith({ email: 'ada@example.com', terms: true });

    const zone = screen.getByRole('button', { name: /Drop files here/ });
    const drop = new Event('drop', { bubbles: true, cancelable: true }) as Event & { dataTransfer: unknown };
    drop.dataTransfer = { files: [new File(['1'], 'a.pdf', { type: 'application/pdf' }), new File(['2'], 'b.png', { type: 'image/png' })], types: ['Files'] };
    zone.dispatchEvent(drop);
    await tick();
    expect(screen.getByTestId('files').textContent).toBe('a.pdf');
    expect(screen.getByRole('alert').textContent).toContain("b.png: this file type isn't allowed.");
    await fireEvent.click(screen.getByRole('button', { name: 'Remove a.pdf' }));
    expect(screen.getByTestId('files').textContent).toBe('');
  });
});
