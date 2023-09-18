import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  it('should be defined', () => {
    // Create a mock for the Reflector
    const reflectorMock = {
      get: jest.fn(),
    };

    // Pass the mock as an argument to the RolesGuard constructor
    const rolesGuard = new RolesGuard(reflectorMock as any);

    expect(rolesGuard).toBeDefined();
  });
});
