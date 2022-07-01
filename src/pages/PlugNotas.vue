<template>
  <q-page padding>
     <q-form
      @submit="onSubmit"
      class="row q-col-gutter-sm"
    >
      <q-input
        outlined
        v-model="form.id"
        label="Nfe consultar resumo da nota. Informe o id da nota"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      />

      <div class="col-12 q-gutter-sm">

      </div>
    <q-table
      title="PLAGNOTAS"
      :rows="PlugNotas"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <span class="text-h5">Plugnotas</span>
        <q-space />
        <q-btn color="primary" label="Buscar" type="submit" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">

        </q-td>
      </template>
    </q-table>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import plugNotasService from 'src/services/plugnotas'
export default defineComponent({
  name: 'FormIdPlugNotas',
  setup () {
    const { list, remove, posts } = plugNotasService()
    const form = ref({
      id: ''
      // idIntegracao: '',
      // status: '',
      // valor: '',
    })

    const columns = [
      { name: 'id', field: 'id', label: 'Id', sortable: true, align: 'left' },
      { name: 'idIntegracao', field: 'idIntegracao', label: 'IDINTEGRAÇÃO', sortable: true, align: 'left' },
      { name: 'status', field: 'status', label: 'STATUS', sortable: true, align: 'left' },
      { name: 'valor', field: 'valor', label: 'VALOR', sortable: true, align: 'left' }
    ]

    const $q = useQuasar()
    const router = useRouter()

    onMounted(() => {
      getPosts()
    })
    const getPosts = async () => {
      try {
        const data = await list()
        posts.value = data
      } catch (error) {
        console.error(error)
      }
    }
    console.log(form.value.id)

    const onSubmit = async () => {
      try {
        const data = await list()
        console.log(onSubmit)
        posts.value = data
      } catch (error) {
        console.error(error)
      }
    }

    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
          title: 'Deletar',
          message: 'Deseja deletar este post ?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({ message: 'Apagado com sucesso', icon: 'check', color: 'positive' })
          await getPosts()
        })
      } catch (error) {
        $q.notify({ message: 'Erro ao apagar post', icon: 'times', color: 'negative' })
      }
    }

    const handleEditPost = (id) => {
      router.push({ name: 'formPost', params: { id } })
    }

    return {
      posts,
      list,
      columns,
      handleDeletePost,
      handleEditPost,
      form,
      onSubmit

    }
  }
})
</script>
