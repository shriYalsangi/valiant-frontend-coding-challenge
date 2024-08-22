import axios from 'axios'
import { fetchData } from '@/utils/fetchData'
import { useToast } from 'vue-toastification'

vi.mock('axios')

const toastMock = {
  error: vi.fn(),
}
vi.mock('vue-toastification', () => ({
  useToast: () => toastMock,
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('fetchData', () => {
  it('should fetch data and set stateRef and defaultValueRef correctly when successful', async () => {
    // Mock the axios response
    const mockData = [{ annualRate: '5.0' }]
    axios.get.mockResolvedValue({ data: mockData })

    // Mock refs
    const stateRef = { value: [] }
    const defaultValueRef = { value: null }

    await fetchData('http://localhost:5000/loan-purposes', stateRef, defaultValueRef, 'annualRate')

    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/loan-purposes')
    expect(stateRef.value).toEqual(mockData)
    expect(defaultValueRef.value).toBe('5.0')
    expect(useToast().error).not.toHaveBeenCalled()
  })

  it('should call toast.error when there is an error', async () => {
    // Mock the axios to throw an error
    axios.get.mockRejectedValue(new Error('Network error'))

    // Mock refs
    const stateRef = { value: [] }
    const defaultValueRef = { value: null }

    await fetchData('http://localhost:5000/loan-purposes', stateRef, defaultValueRef, 'annualRate')

    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/loan-purposes')
    expect(stateRef.value).toEqual([])
    expect(defaultValueRef.value).toBe(null)

    // Ensure that toast.error has been called
    expect(useToast().error).toHaveBeenCalledWith('Error fetching data from http://localhost:5000/loan-purposes: Error: Network error')
  })

  it('should not change defaultValueRef if stateRef is empty', async () => {
    // Mock the axios response with empty data
    axios.get.mockResolvedValue({ data: [] })

    // Mock refs
    const stateRef = { value: [] }
    const defaultValueRef = { value: 'initialValue' }

    await fetchData('http://localhost:5000/loan-purposes', stateRef, defaultValueRef, 'annualRate')

    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/loan-purposes')
    expect(stateRef.value).toEqual([])
    expect(defaultValueRef.value).toBe('initialValue')
    expect(useToast().error).not.toHaveBeenCalled()
  })
})
