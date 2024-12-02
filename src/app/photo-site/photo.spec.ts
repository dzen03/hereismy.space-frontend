import { Photo } from './photo';

describe('Photo', () => {
  it('should create an instance', () => {
    expect(new Photo(0, '', [])).toBeTruthy();
  });
});
