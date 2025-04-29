import { fireEvent, render, screen } from '@testing-library/react';

import Search from './Search';
import { vi } from 'vitest';

describe('Search', () => {

     it('renders Search', () => {
          render(<Search searchInput='Hello' setSearchInput={vi.fn()} handleSearch={vi.fn()} handleCancel={vi.fn()}/>);
     });

     it('handles input changes appropriately', () => {
          let inputState = '';
          let setSearchInput = vi.fn().mockImplementation((val) => { inputState = val; });
          render(<Search searchInput='Hello' setSearchInput={setSearchInput} handleSearch={vi.fn()} handleCancel={vi.fn()}/>);
          let input = screen.getByTestId('search-input');
          fireEvent.change(input, { target: { value: 'Hey there' } });
          expect(inputState).toBe('Hey there');
     });

     it('search & cancel button are binded to the correct props', () => {
          let handleSearch = vi.fn();
          let handleCancel = vi.fn();
          render(<Search searchInput='Hello' setSearchInput={vi.fn()} handleSearch={handleSearch} handleCancel={handleCancel}/>);
          let searchButton = screen.getByTestId('search-button');
          let cancelButton = screen.getByTestId('cancel-button');
          fireEvent.click(searchButton);
          fireEvent.click(cancelButton);
          expect(handleSearch).toHaveBeenCalled();
          expect(handleCancel).toHaveBeenCalled();
     });

});