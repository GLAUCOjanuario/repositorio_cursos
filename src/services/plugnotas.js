import UseApiPlugNotas from 'src/composibles/UseApiPlugNotas'
export default function plugNotasService () {
  const { list, post, update, remove, getById } = UseApiPlugNotas('plugnotas')

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
