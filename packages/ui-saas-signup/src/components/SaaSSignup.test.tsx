import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SaaSSignup from './SaaSSignup'

// Mock the Button component
vi.mock('@astro-react/ui-button', () => ({
  Button: ({ text, onClick, loading, disabled, variant }: any) => (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      data-testid="mock-button"
      data-variant={variant}
      data-loading={loading}
    >
      {loading ? 'Loading...' : text}
    </button>
  )
}))

describe('SaaSSignup Component', () => {
  const mockOnSuccess = vi.fn()
  const mockOnError = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  describe('Initial Rendering', () => {
    it('renders the form with all required fields', () => {
      render(<SaaSSignup />)
      
      expect(screen.getByLabelText('نام دامنه دلخواه')).toBeInTheDocument()
      expect(screen.getByLabelText('پلن موردنظر')).toBeInTheDocument()
      expect(screen.getByText('شروع آزمایش رایگان ۱۴ روزه')).toBeInTheDocument()
    })

    it('renders all three pricing plans', () => {
      render(<SaaSSignup />)
      
      expect(screen.getByText('پلن پایه')).toBeInTheDocument()
      expect(screen.getByText('پلن حرفه‌ای')).toBeInTheDocument()
      expect(screen.getByText('پلن سازمانی')).toBeInTheDocument()
    })

    it('has basic plan selected by default', () => {
      render(<SaaSSignup />)
      
      const basicPlan = screen.getByDisplayValue('basic')
      expect(basicPlan).toBeChecked()
    })

    it('shows submit button as disabled when domain is empty', () => {
      render(<SaaSSignup />)
      
      const submitButton = screen.getByTestId('mock-button')
      expect(submitButton).toBeDisabled()
    })
  })

  describe('Domain Input', () => {
    it('allows typing in domain input', async () => {
      render(<SaaSSignup />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      await userEvent.type(domainInput, 'testdomain')
      
      expect(domainInput).toHaveValue('testdomain')
    })

    it('enables submit button when domain is entered', async () => {
      render(<SaaSSignup />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      await userEvent.type(domainInput, 'test')
      
      const submitButton = screen.getByTestId('mock-button')
      expect(submitButton).not.toBeDisabled()
    })

    it('shows domain suffix correctly', () => {
      render(<SaaSSignup />)
      
      expect(screen.getByText('.example.com')).toBeInTheDocument()
    })

    it('clears error when typing in domain input', async () => {
      render(<SaaSSignup onError={mockOnError} />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      const submitButton = screen.getByTestId('mock-button')
      
      // Submit empty form to trigger error
      fireEvent.click(submitButton)
      
      expect(screen.getByText('لطفاً یک دامنه وارد کنید')).toBeInTheDocument()
      
      // Type to clear error
      await userEvent.type(domainInput, 'test')
      
      expect(screen.queryByText('لطفاً یک دامنه وارد کنید')).not.toBeInTheDocument()
    })
  })

  describe('Plan Selection', () => {
    it('allows selecting different plans', async () => {
      render(<SaaSSignup />)
      
      const proPlan = screen.getByDisplayValue('pro')
      await userEvent.click(proPlan)
      
      expect(proPlan).toBeChecked()
    })

    it('shows plan features correctly', () => {
      render(<SaaSSignup />)
      
      // Basic plan features
      expect(screen.getByText('تا ۱۰ کاربر')).toBeInTheDocument()
      expect(screen.getByText('پشتیبانی ایمیل')).toBeInTheDocument()
      
      // Pro plan features
      expect(screen.getByText('تا ۱۰۰ کاربر')).toBeInTheDocument()
      expect(screen.getByText('پشتیبانی ۲۴/۷')).toBeInTheDocument()
      
      // Enterprise plan features
      expect(screen.getByText('کاربران نامحدود')).toBeInTheDocument()
      expect(screen.getByText('پشتیبانی اختصاصی')).toBeInTheDocument()
    })

    it('shows correct pricing for each plan', () => {
      render(<SaaSSignup />)
      
      expect(screen.getByText('$19')).toBeInTheDocument()
      expect(screen.getByText('$49')).toBeInTheDocument()
      expect(screen.getByText('$99')).toBeInTheDocument()
    })

    it('updates plan selection when clicking on plan card', async () => {
      render(<SaaSSignup />)
      
      const enterprisePlanCard = screen.getByText('پلن سازمانی').closest('label')
      await userEvent.click(enterprisePlanCard!)
      
      const enterprisePlan = screen.getByDisplayValue('enterprise')
      expect(enterprisePlan).toBeChecked()
    })
  })

  describe('Form Validation', () => {
    it('shows error for empty domain', async () => {
      render(<SaaSSignup onError={mockOnError} />)
      
      const submitButton = screen.getByTestId('mock-button')
      fireEvent.click(submitButton)
      
      expect(screen.getByText('لطفاً یک دامنه وارد کنید')).toBeInTheDocument()
      expect(mockOnError).toHaveBeenCalledWith('لطفاً یک دامنه وارد کنید')
    })

    it('shows error for invalid domain format', async () => {
      render(<SaaSSignup onError={mockOnError} />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      await userEvent.type(domainInput, 'ab') // Too short
      
      const submitButton = screen.getByTestId('mock-button')
      fireEvent.click(submitButton)
      
      expect(screen.getByText('دامنه وارد شده معتبر نیست')).toBeInTheDocument()
      expect(mockOnError).toHaveBeenCalledWith('دامنه وارد شده معتبر نیست')
    })

    it('accepts valid domain formats', async () => {
      render(<SaaSSignup onSuccess={mockOnSuccess} />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      await userEvent.type(domainInput, 'valid-domain')
      
      const submitButton = screen.getByTestId('mock-button')
      fireEvent.click(submitButton)
      
      // Should not show validation errors
      expect(screen.queryByText('دامنه وارد شده معتبر نیست')).not.toBeInTheDocument()
      expect(screen.queryByText('لطفاً یک دامنه وارد کنید')).not.toBeInTheDocument()
    })

    it('validates domain with special characters', async () => {
      render(<SaaSSignup onError={mockOnError} />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      await userEvent.type(domainInput, 'invalid@domain')
      
      const submitButton = screen.getByTestId('mock-button')
      fireEvent.click(submitButton)
      
      expect(screen.getByText('دامنه وارد شده معتبر نیست')).toBeInTheDocument()
    })
  })

  describe('Form Submission', () => {
    it('shows loading state during submission', async () => {
      render(<SaaSSignup />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      await userEvent.type(domainInput, 'testdomain')
      
      const submitButton = screen.getByTestId('mock-button')
      fireEvent.click(submitButton)
      
      expect(submitButton).toHaveAttribute('data-loading', 'true')
      expect(submitButton).toHaveTextContent('Loading...')
    })

    it('disables form during submission', async () => {
      render(<SaaSSignup />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      await userEvent.type(domainInput, 'testdomain')
      
      const submitButton = screen.getByTestId('mock-button')
      fireEvent.click(submitButton)
      
      expect(domainInput).toBeDisabled()
    })

    it('calls onSuccess with correct data after successful submission', async () => {
      render(<SaaSSignup onSuccess={mockOnSuccess} />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      await userEvent.type(domainInput, 'testdomain')
      
      // Select pro plan
      const proPlan = screen.getByDisplayValue('pro')
      await userEvent.click(proPlan)
      
      const submitButton = screen.getByTestId('mock-button')
      fireEvent.click(submitButton)
      
      // Fast-forward time to complete the simulated API call
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalledWith({
          domain: 'testdomain',
          planId: 'pro'
        })
      })
    })

    it('shows success screen after successful submission', async () => {
      render(<SaaSSignup onSuccess={mockOnSuccess} />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      await userEvent.type(domainInput, 'testdomain')
      
      const submitButton = screen.getByTestId('mock-button')
      fireEvent.click(submitButton)
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('آزمون شما فعال شد!')).toBeInTheDocument()
        expect(screen.getByText(/testdomain\.example\.com/)).toBeInTheDocument()
      })
    })
  })

  describe('Success Screen', () => {
    it('shows correct plan name in success message', async () => {
      render(<SaaSSignup />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      await userEvent.type(domainInput, 'testdomain')
      
      // Select enterprise plan
      const enterprisePlan = screen.getByDisplayValue('enterprise')
      await userEvent.click(enterprisePlan)
      
      const submitButton = screen.getByTestId('mock-button')
      fireEvent.click(submitButton)
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText(/پلن سازمانی/)).toBeInTheDocument()
      })
    })

    it('allows returning to form from success screen', async () => {
      render(<SaaSSignup />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      await userEvent.type(domainInput, 'testdomain')
      
      const submitButton = screen.getByTestId('mock-button')
      fireEvent.click(submitButton)
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('آزمون شما فعال شد!')).toBeInTheDocument()
      })
      
      const backButton = screen.getByText('بازگشت به صفحه اصلی')
      await userEvent.click(backButton)
      
      // Should return to form
      expect(screen.getByLabelText('نام دامنه دلخواه')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('mycoolstartup')).toHaveValue('')
    })

    it('resets form state when returning from success screen', async () => {
      render(<SaaSSignup />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      await userEvent.type(domainInput, 'testdomain')
      
      // Select pro plan
      const proPlan = screen.getByDisplayValue('pro')
      await userEvent.click(proPlan)
      
      const submitButton = screen.getByTestId('mock-button')
      fireEvent.click(submitButton)
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('آزمون شما فعال شد!')).toBeInTheDocument()
      })
      
      const backButton = screen.getByText('بازگشت به صفحه اصلی')
      await userEvent.click(backButton)
      
      // Check if form is reset
      expect(screen.getByPlaceholderText('mycoolstartup')).toHaveValue('')
      expect(screen.getByDisplayValue('basic')).toBeChecked()
    })
  })

  describe('Error Handling', () => {
    it('handles form submission without callbacks gracefully', async () => {
      render(<SaaSSignup />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      await userEvent.type(domainInput, 'testdomain')
      
      const submitButton = screen.getByTestId('mock-button')
      
      // Should not throw error
      expect(() => {
        fireEvent.click(submitButton)
      }).not.toThrow()
    })

    it('clears previous errors when submitting again', async () => {
      render(<SaaSSignup onError={mockOnError} />)
      
      // First submission with empty domain
      const submitButton = screen.getByTestId('mock-button')
      fireEvent.click(submitButton)
      
      expect(screen.getByText('لطفاً یک دامنه وارد کنید')).toBeInTheDocument()
      
      // Enter domain and submit again
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      await userEvent.type(domainInput, 'testdomain')
      
      fireEvent.click(submitButton)
      
      // Error should be cleared
      expect(screen.queryByText('لطفاً یک دامنه وارد کنید')).not.toBeInTheDocument()
    })
  })

  describe('Basic Functionality', () => {
    it('has proper labels and inputs', () => {
      render(<SaaSSignup />)
      
      expect(screen.getByLabelText('نام دامنه دلخواه')).toBeInTheDocument()
      expect(screen.getByLabelText('پلن موردنظر')).toBeInTheDocument()
    })

    it('has radio buttons with correct values', () => {
      render(<SaaSSignup />)
      
      expect(screen.getByDisplayValue('basic')).toBeInTheDocument()
      expect(screen.getByDisplayValue('pro')).toBeInTheDocument()
      expect(screen.getByDisplayValue('enterprise')).toBeInTheDocument()
    })

    it('maintains focus management', async () => {
      render(<SaaSSignup />)
      
      const domainInput = screen.getByPlaceholderText('mycoolstartup')
      domainInput.focus()
      
      expect(document.activeElement).toBe(domainInput)
    })
  })
}) 