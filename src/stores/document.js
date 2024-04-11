import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import API from '../services/document-api'

export const useDocumentStore = defineStore('document', () => {
  const toast = useToast()

  const size = ref(5)
  const offset = ref(0)
  const rowsPaginator = ref([5, 10, 30])
  
  const attributes = ref(null)
  const documents = ref(null)
  const totalDocuments = ref(null)

  const currentDocument = ref(null)

  const loading = ref(false);
  const error = ref('');

  watch(size, () => {
    fetchDocumentsList()
  });
  watch(offset, () => {
    fetchDocumentsList()
  });

  function setLoading(payload) {
    loading.value = payload;
  }
  function setError(payload) {
    error.value = payload;
  }
  function setAttributes(payload) {
    attributes.value = payload;
  }
  function setDocuments(payload) {
    documents.value = payload;
  }
  function setTotalDocuments(payload) {
    totalDocuments.value = payload;
  }
  function setCurrentDocument(payload) {
    currentDocument.value = payload;
  }


  async function fetchDocuments() {
    try {
      setLoading(true)
      // получаем доступные атрибуты
      const data = await API.fetchAttributes()
      // console.log("🚀 ~ fetchAttributes ~ data:", data)

      if (data === undefined) {
        throw new Error('Server Error!')
      } else {
        // setLoading(false)
        // setError('')
        setAttributes(data)
        // console.log(attributes.value);
        // получаем документы
        fetchDocumentsList()
      }
    } catch (error) {
      setLoading(false)
      setError(error.message)
      toast.add({ severity: 'error', summary: 'Ошибка', detail: error.message, life: 5000 })
    }
  }

  async function fetchDocumentsList(orderAttr = 'default') {
    try {
      setLoading(true)
      const attr = Object.keys(attributes.value)

      const body = {
        attributes: attr,
        size: size.value,
        offset: offset.value,
        order: {
          attr: orderAttr ? orderAttr : attr[1],
          asc: true
        },
      }

      const data = await API.fetchDocumentsList(body)
      // console.log("🚀 ~ fetchAttributes ~ data:", data)

      if (data === undefined) {
        throw new Error('Server Error!')
      } else {
        setLoading(false)
        setError('')
        setDocuments(data.atributes)
        setTotalDocuments(data.size)
      }
    } catch (error) {
      setLoading(false)
      setError(error.message)
      toast.add({ severity: 'error', summary: 'Ошибка', detail: error.message, life: 5000 })
    }
  }

  async function fetchCurrentDocument(id) {
    try {
      setLoading(true)
     

      const data = await API.fetchDocument(id)
      console.log("🚀 fetchDocument", data)

      if (data === undefined) {
        throw new Error('Server Error!')
      } else {
        setLoading(false)
        setError('')
        setCurrentDocument(data)
      }
    } catch (error) {

      setLoading(false)
      setError(error.message)
      toast.add({ severity: 'error', summary: 'Ошибка', detail: error.message, life: 5000 })
    }
  }

  return { 
    documents,
    attributes,
    totalDocuments,
    currentDocument,
    rowsPaginator,
    size,
    offset,
    loading,
    fetchDocuments, 
    fetchDocumentsList,
    fetchCurrentDocument, 
  }
})
