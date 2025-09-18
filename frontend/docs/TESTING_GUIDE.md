# Testing Guide - Medical Dashboard

## Testing Strategy

### Test Pyramid
1. **Unit Tests** (70%) - Individual components and functions
2. **Integration Tests** (20%) - Component interactions and API calls
3. **E2E Tests** (10%) - Complete user workflows

## Setup

### Dependencies
\`\`\`bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom
\`\`\`

### Jest Configuration
\`\`\`javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
\`\`\`

### Setup File
\`\`\`javascript
// jest.setup.js
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  usePathname() {
    return '/dashboard'
  },
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock
\`\`\`

## Unit Tests

### Component Testing
\`\`\`javascript
// __tests__/components/patients/patient-table.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PatientTable } from '@/components/patients/patient-table'
import { patientService } from '@/lib/services/patient-service'

// Mock the service
jest.mock('@/lib/services/patient-service')
const mockPatientService = patientService as jest.Mocked<typeof patientService>

// Mock auth hook
jest.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({
    hasPermission: jest.fn().mockReturnValue(true),
    user: { id: '1', role: { name: 'admin' } }
  })
}))

describe('PatientTable', () => {
  beforeEach(() => {
    mockPatientService.getPatients.mockResolvedValue({
      data: [
        {
          id: '1',
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan@email.com',
          phone: '+34 600 123 456',
          dateOfBirth: '1985-03-15',
          gender: 'M',
          address: 'Calle Mayor 123',
          emergencyContact: 'María Pérez',
          medicalHistory: '',
          allergies: '',
          isActive: true,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        }
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1
      }
    })
  })

  it('renders patient table with data', async () => {
    render(<PatientTable />)
    
    expect(screen.getByText('Gestión de Pacientes')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
      expect(screen.getByText('juan@email.com')).toBeInTheDocument()
    })
  })

  it('handles search functionality', async () => {
    render(<PatientTable />)
    
    const searchInput = screen.getByPlaceholderText('Buscar por nombre, email o teléfono...')
    const searchButton = screen.getByRole('button', { name: /buscar/i })
    
    fireEvent.change(searchInput, { target: { value: 'Juan' } })
    fireEvent.click(searchButton)
    
    await waitFor(() => {
      expect(mockPatientService.getPatients).toHaveBeenCalledWith(
        1, 10, { search: 'Juan' }
      )
    })
  })

  it('shows create button for users with create permission', () => {
    render(<PatientTable />)
    
    expect(screen.getByRole('button', { name: /nuevo paciente/i })).toBeInTheDocument()
  })
})
\`\`\`

### Hook Testing
\`\`\`javascript
// __tests__/hooks/use-auth.test.tsx
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/hooks/use-auth'
import { authService } from '@/lib/auth'

jest.mock('@/lib/auth')
const mockAuthService = authService as jest.Mocked<typeof authService>

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns user when authenticated', () => {
    const mockUser = {
      id: '1',
      email: 'admin@hospital.com',
      firstName: 'Admin',
      lastName: 'User',
      role: {
        id: '1',
        name: 'admin',
        displayName: 'Administrador',
        permissions: []
      }
    }

    mockAuthService.getUser.mockReturnValue(mockUser)
    mockAuthService.isAuthenticated.mockReturnValue(true)

    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('handles login correctly', async () => {
    const mockLoginResponse = {
      token: 'mock-token',
      user: {
        id: '1',
        email: 'admin@hospital.com',
        firstName: 'Admin',
        lastName: 'User',
        role: {
          id: '1',
          name: 'admin',
          displayName: 'Administrador',
          permissions: []
        }
      }
    }

    mockAuthService.login.mockResolvedValue(mockLoginResponse)

    const { result } = renderHook(() => useAuth())

    await act(async () => {
      const response = await result.current.login('admin@hospital.com', 'password')
      expect(response).toEqual(mockLoginResponse)
    })
  })
})
\`\`\`

### Service Testing
\`\`\`javascript
// __tests__/lib/services/patient-service.test.ts
import { patientService } from '@/lib/services/patient-service'

// Mock fetch
global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

describe('PatientService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches patients successfully', async () => {
    const mockResponse = {
      data: [{ id: '1', firstName: 'Juan', lastName: 'Pérez' }],
      pagination: { page: 1, limit: 10, total: 1, totalPages: 1 }
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

    const result = await patientService.getPatients(1, 10, {})

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/patients'),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      })
    )

    expect(result).toEqual(mockResponse)
  })

  it('handles API errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Error del servidor' }),
    } as Response)

    await expect(patientService.getPatients(1, 10, {})).rejects.toThrow('Error del servidor')
  })
})
\`\`\`

## Integration Tests

### API Integration
\`\`\`javascript
// __tests__/integration/patient-management.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PatientTable } from '@/components/patients/patient-table'
import { PatientDialog } from '@/components/patients/patient-dialog'

describe('Patient Management Integration', () => {
  it('creates a new patient through the UI', async () => {
    // Mock successful API responses
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: '1', firstName: 'Juan', lastName: 'Pérez' })
      })

    render(<PatientTable />)

    // Click create button
    const createButton = screen.getByRole('button', { name: /nuevo paciente/i })
    fireEvent.click(createButton)

    // Fill form (this would require the dialog to be rendered)
    // ... form filling logic

    // Submit form
    // ... submission logic

    // Verify patient was created
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/patients'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('Juan')
        })
      )
    })
  })
})
\`\`\`

## E2E Tests (Playwright)

### Setup
\`\`\`bash
npm install --save-dev @playwright/test
npx playwright install
\`\`\`

### Configuration
\`\`\`javascript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
\`\`\`

### E2E Test Example
\`\`\`javascript
// e2e/patient-management.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Patient Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login')
    await page.fill('[name="email"]', 'admin@hospital.com')
    await page.fill('[name="password"]', 'admin123')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/dashboard')
  })

  test('should create a new patient', async ({ page }) => {
    // Navigate to patients
    await page.click('text=Pacientes')
    await expect(page).toHaveURL('/patients')

    // Click create button
    await page.click('text=Nuevo Paciente')

    // Fill form
    await page.fill('[name="firstName"]', 'Juan')
    await page.fill('[name="lastName"]', 'Pérez')
    await page.fill('[name="email"]', 'juan.perez@email.com')
    await page.fill('[name="phone"]', '+34 600 123 456')
    await page.fill('[name="dateOfBirth"]', '1985-03-15')
    await page.selectOption('[name="gender"]', 'M')

    // Submit form
    await page.click('button[type="submit"]')

    // Verify success
    await expect(page.locator('text=Juan Pérez')).toBeVisible()
  })

  test('should search for patients', async ({ page }) => {
    await page.goto('/patients')

    // Search for patient
    await page.fill('[placeholder*="Buscar"]', 'Juan')
    await page.click('text=Buscar')

    // Verify results
    await expect(page.locator('text=Juan')).toBeVisible()
  })
})
\`\`\`

## Test Scripts

### Package.json Scripts
\`\`\`json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "npm run test && npm run test:e2e"
  }
}
\`\`\`

## CI/CD Testing

### GitHub Actions
\`\`\`yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm run test:coverage
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
    
    - name: Install Playwright
      run: npx playwright install --with-deps
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: failure()
      with:
        name: playwright-report
        path: playwright-report/
\`\`\`

## Coverage Goals

- **Unit Tests**: > 80% coverage
- **Integration Tests**: Critical user flows
- **E2E Tests**: Main user journeys

## Best Practices

1. **Test Naming**: Descriptive test names
2. **Arrange-Act-Assert**: Clear test structure
3. **Mock External Dependencies**: Isolate units under test
4. **Test Edge Cases**: Error conditions and boundary values
5. **Keep Tests Fast**: Unit tests should run quickly
6. **Maintain Tests**: Update tests with code changes
