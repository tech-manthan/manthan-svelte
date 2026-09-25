import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Table from './Table.svelte';

describe('DataTable', () => {
  it('sorts, searches, selects and pages', async () => {
    render(Table);
    const body = () => screen.getAllByRole('row').slice(1);
    expect(body()).toHaveLength(5);
    expect(screen.getByText('1–5 of 12')).toBeTruthy();

    await fireEvent.click(screen.getByRole('button', { name: 'Score' }));
    expect(screen.getByRole('columnheader', { name: 'Score' }).getAttribute('aria-sort')).toBe('ascending');
    expect(body()[0]!.querySelector('strong')!.textContent).toBe('0');

    const search = screen.getByRole('searchbox', { name: 'Search table' });
    await fireEvent.input(search, { target: { value: 'user 1' } });
    expect(body()).toHaveLength(4);

    await fireEvent.click(screen.getByRole('checkbox', { name: 'Select all rows on this page' }));
    expect(JSON.parse(screen.getByTestId('sel').textContent!).sort()).toEqual(['1', '10', '11', '12']);
    expect(screen.getByText('4 of 12 selected')).toBeTruthy();

    await fireEvent.input(search, { target: { value: '' } });
    await fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(screen.getByText('6–10 of 12')).toBeTruthy();
  });
});
