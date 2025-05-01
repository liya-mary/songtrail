import { describe, it, expect, vi } from 'vitest';
import tagService from '../tagService';

global.fetch = vi.fn();

describe('getTags', async() => {
    const mockTags = [
        { artist: 'Artist 1', coordinates: [10, 20], title: 'Title 1' },
        { artist: 'Artist 2', coordinates: [30, 40], title: 'Title 2' }
      ];
it('return tags on success',async()=>{
    (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTags,
      });

      const result=await tagService.getTags();
      expect(result).toBeTruthy();
      expect(result).toEqual(mockTags);
})

})