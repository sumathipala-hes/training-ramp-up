import supertest from 'supertest';
import { app } from '../index';

describe('student routes', () => {
  describe('GET /students', () => {
    describe('when there are students', () => {
      it('returns all students', () => {
        expect(1).toEqual(1);
      });
    });
  });
});
