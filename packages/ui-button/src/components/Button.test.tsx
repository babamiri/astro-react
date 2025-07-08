import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders with text correctly', () => {
      render(<Button text="Click me" />)
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('renders with aria-label', () => {
      render(<Button text="Submit" />)
      expect(screen.getByLabelText('Submit')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<Button text="Test" className="custom-class" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })
  })

  describe('Variants', () => {
    it('applies primary variant by default', () => {
      render(<Button text="Primary" />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ backgroundColor: '#f97316' }) // orange-500
    })

    it('applies secondary variant correctly', () => {
      render(<Button text="Secondary" variant="secondary" />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ backgroundColor: '#f3f4f6' }) // gray-100
    })
  })

  describe('Sizes', () => {
    it('applies medium size by default', () => {
      render(<Button text="Medium" />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ padding: '0.75rem 1.5rem' })
    })

    it('applies small size correctly', () => {
      render(<Button text="Small" size="sm" />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ padding: '0.5rem 1rem' })
    })

    it('applies large size correctly', () => {
      render(<Button text="Large" size="lg" />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ padding: '1rem 2rem' })
    })
  })

  describe('Disabled State', () => {
    it('renders disabled button correctly', () => {
      render(<Button text="Disabled" disabled />)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveStyle({ opacity: '0.6' })
    })

    it('does not call onClick when disabled', async () => {
      const mockClick = vi.fn()
      render(<Button text="Disabled" disabled onClick={mockClick} />)
      
      const button = screen.getByRole('button')
      await userEvent.click(button)
      
      expect(mockClick).not.toHaveBeenCalled()
    })
  })

  describe('Loading State', () => {
    it('renders loading spinner when loading', () => {
      render(<Button text="Loading" loading />)
      const button = screen.getByRole('button')
      
      // Check if spinner exists
      const spinner = button.querySelector('span')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveStyle({ animation: 'spin 1s linear infinite' })
    })

    it('disables button when loading', () => {
      render(<Button text="Loading" loading />)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('does not call onClick when loading', async () => {
      const mockClick = vi.fn()
      render(<Button text="Loading" loading onClick={mockClick} />)
      
      const button = screen.getByRole('button')
      await userEvent.click(button)
      
      expect(mockClick).not.toHaveBeenCalled()
    })

    it('shows both text and spinner when loading', () => {
      render(<Button text="Loading..." loading />)
      expect(screen.getByText('Loading...')).toBeInTheDocument()
      
      const button = screen.getByRole('button')
      const spinner = button.querySelector('span')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Click Events', () => {
    it('calls onClick when clicked', async () => {
      const mockClick = vi.fn()
      render(<Button text="Click me" onClick={mockClick} />)
      
      const button = screen.getByRole('button')
      await userEvent.click(button)
      
      expect(mockClick).toHaveBeenCalledTimes(1)
    })

    it('logs to console when clicked', async () => {
      const consoleSpy = vi.spyOn(console, 'log')
      render(<Button text="Test Button" />)
      
      const button = screen.getByRole('button')
      await userEvent.click(button)
      
      expect(consoleSpy).toHaveBeenCalledWith('Button clicked:', 'Test Button')
    })

    it('works without onClick prop', async () => {
      render(<Button text="No onClick" />)
      const button = screen.getByRole('button')
      
      // Should not throw error
      await userEvent.click(button)
    })
  })

  describe('Hover Effects', () => {
    it('changes background on hover', async () => {
      render(<Button text="Hover me" />)
      const button = screen.getByRole('button')
      
      await userEvent.hover(button)
      await waitFor(() => {
        expect(button).toHaveStyle({ backgroundColor: '#ea580c' }) // orange-600
      })
    })

    it('resets background on mouse leave', async () => {
      render(<Button text="Hover me" />)
      const button = screen.getByRole('button')
      
      await userEvent.hover(button)
      await userEvent.unhover(button)
      
      await waitFor(() => {
        expect(button).toHaveStyle({ backgroundColor: '#f97316' }) // orange-500
      })
    })
  })

  describe('Mouse Events', () => {
    it('changes background on mouse down', () => {
      render(<Button text="Press me" />)
      const button = screen.getByRole('button')
      
      fireEvent.mouseDown(button)
      expect(button).toHaveStyle({ backgroundColor: '#ea580c' }) // orange-600
    })

    it('resets background on mouse up', () => {
      render(<Button text="Press me" />)
      const button = screen.getByRole('button')
      
      fireEvent.mouseDown(button)
      fireEvent.mouseUp(button)
      expect(button).toHaveStyle({ backgroundColor: '#f97316' }) // orange-500
    })
  })

  describe('Accessibility', () => {
    it('has proper button role', () => {
      render(<Button text="Accessible" />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('supports keyboard navigation', async () => {
      const mockClick = vi.fn()
      render(<Button text="Keyboard" onClick={mockClick} />)
      
      const button = screen.getByRole('button')
      button.focus()
      
      await userEvent.keyboard('{Enter}')
      expect(mockClick).toHaveBeenCalledTimes(1)
    })

    it('supports space key activation', async () => {
      const mockClick = vi.fn()
      render(<Button text="Space Key" onClick={mockClick} />)
      
      const button = screen.getByRole('button')
      button.focus()
      
      await userEvent.keyboard(' ')
      expect(mockClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty text gracefully', () => {
      render(<Button text="" />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles multiple rapid clicks', async () => {
      const mockClick = vi.fn()
      render(<Button text="Rapid" onClick={mockClick} />)
      
      const button = screen.getByRole('button')
      
      // Click multiple times rapidly
      await userEvent.click(button)
      await userEvent.click(button)
      await userEvent.click(button)
      
      expect(mockClick).toHaveBeenCalledTimes(3)
    })

    it('maintains state during re-renders', () => {
      const { rerender } = render(<Button text="Original" />)
      const button = screen.getByRole('button')
      
      // Hover to change state
      fireEvent.mouseEnter(button)
      
      // Re-render with new props
      rerender(<Button text="Updated" />)
      
      expect(screen.getByText('Updated')).toBeInTheDocument()
    })
  })
}) 