import axios from 'axios'
import { useToast } from 'vue-toastification'

export const fetchData = async (url, stateRef, defaultValueRef, valueKey) => {
  try {
    const response = await axios.get(url)
    stateRef.value = response.data
    if (stateRef.value.length > 0 && !defaultValueRef.value) {
      defaultValueRef.value = stateRef.value[0][valueKey]
    }
  } catch (error) {
    const toast = useToast()
    toast.error(`Error fetching data from ${url}: ${error}`)
  }
}
