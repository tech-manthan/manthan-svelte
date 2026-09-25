import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Charts from './Charts.svelte';

describe('Chart', () => {
  it('renders, binds hidden series, reacts to props and renders stat tiles', async () => {
    render(Charts);
    const chart = screen.getByTestId('chart');
    expect(screen.getByRole('img', { name: 'Sales' })).toBeTruthy();
    expect(chart.querySelectorAll('.mn-chart-bar')).toHaveLength(4);
    await fireEvent.click(screen.getByRole('button', { name: 'Beta' }));
    expect(screen.getByTestId('hidden').textContent).toBe('["b"]');
    expect(chart.querySelectorAll('.mn-chart-bar')).toHaveLength(2);
    await fireEvent.click(screen.getByRole('button', { name: 'Line' }));
    expect(chart.querySelectorAll('.mn-chart-line')).toHaveLength(1);
    expect(screen.getByRole('img', { name: 'Revenue trend' })).toBeTruthy();
  });
});
