import { plugnotas } from 'boot/axios'

export default function UseApiPlugNotas (url) {
  const list = async () => {
    try {
      const { data } = await plugnotas.get(url)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const getById = async (id) => {
    try {
      const { data } = await plugnotas.get(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const post = async (form) => {
    try {
      const { data } = await plugnotas.post(url, form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const update = async (form) => {
    try {
      const { data } = await plugnotas.put(`${url}/${form.id}`, form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const remove = async (id) => {
    try {
      const { data } = await plugnotas.delete(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
