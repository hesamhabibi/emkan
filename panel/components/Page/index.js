import Table from "@admin/Table"
import Button from "@admin/Button"
import { useContext, useEffect, useState } from "react"
import { LoadingContext, TranslationContext } from "~/app/Context"
import { useApolloClient } from "~/app/Hooks/Api"
import { useForm } from "react-hook-form"
import { useMutation } from "~/app/Hooks"
import AdminLayout from "@admin/Layout"
import Filter from "@admin/Filter"
import Pagination from "@admin/Pagination"
import { useDispatch } from "react-redux"
import { openModal } from "~/app/State/modal"
import { filterFields } from "~/app/Helpers/MutationHandler"
import { openPopup } from "~/app/State/popups"
import Modal from "@admin/Modal"
import ModalForms from "@admin/Forms"

class CrudPage {
  fields = []

  filterFields = [[]]

  defaultValues = {}

  allowedFields = []

  modalFields = [[]]

  tableFields = []

  createFields = this.fields

  updateFields = this.fields

  queries = {}

  title = ""

  hasFilter = true

  hasPaginate = true

  titles = { create: "create", edit: "edit" }

  section = undefined

  extraHook = () => {}

  CreateButton = ({ translation, callback }) => (
    <Button type="success" onClick={callback}>
      {translation("create row")} <i className="fas fa-plus-circle mr-2" />
    </Button>
  )

  actions = (actions, translation) => []

  getData = async () => {}

  renderTable({ actions }) {
    return ({ data, callback }) => {
      const translation = useContext(TranslationContext)

      const Button = this.CreateButton

      return (
        <Table
          data={data}
          button={<Button callback={callback} translation={translation} />}
          actions={this.actions(actions, translation)}
          fields={this.tableFields}
        />
      )
    }
  }

  getPages = async (page, setLoading, callback, fields) => {
    setLoading(true)

    return await callback({ page, fields, query: this.queries.all })
  }

  beforeModalCreate = (extra) => {}

  beforeModalEdit = (extra, item, reset) => {}

  ModalComponent = ({ callback, fields, loading }) => {
    return (
      <ModalForms
        form={fields}
        callback={callback}
        loading={loading}
        id="editForms"
      />
    )
  }

  render = () => {
    // --- states
    const [data, setData] = useState({ data: [], paginate: {} })
    const [callback, setCallback] = useState(() => {})
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState({})
    const [title, setTitle] = useState("")

    // -- context

    const translation = useContext(TranslationContext)
    const fireLoading = useContext(LoadingContext)

    // --- extra hooks

    const useExtra = this.extraHook

    const extraData = useExtra()

    // --- custom hooks
    const dispatch = useDispatch()

    const { getPage } = useApolloClient()

    const { handleSubmit, control, setError, clearErrors, reset } = useForm({
      defaultValues: this.defaultValues,
    })

    const { mutate } = useMutation({
      setData,
      id: "editForms",
      clearErrors,
      setLoading,
      setError,
    })

    const Create = async (data) => {
      await mutate({
        mutation: this.queries.create,
        variables: {
          input: filterFields({ data, fields: this.allowedFields }),
        },
        action: "create",
      })
    }

    const Edit = async (data) => {
      await mutate({
        mutation: this.queries.create,
        variables: {
          input: filterFields({ data, fields: this.allowedFields }),
        },
        action: "create",
      })
    }

    const destroyItem = async (item) => {
      await mutate({
        mutation: this.queries.delete,
        variables: {
          id: item.id,
        },
        action: "delete",
      })
    }

    const openModalForCreate = () => {
      setTitle(translation(this.titles.create, this.section))
      setCallback(() => Create)
      this.beforeModalCreate(extraData, reset)
      dispatch(openModal("editForms"))
    }

    const openModalForEdit = (item) => {
      setTitle(translation(this.titles.edit, this.section))
      reset(item)
      setCallback(() => Edit)
      this.beforeModalEdit(item, extraData, reset)
      dispatch(openModal("editForms"))
    }

    const openDeletePopup = (item) => {
      reset(item)
      setCallback(() => destroyItem)
      dispatch(openPopup("delete-action"))
    }

    useEffect(() => {
      let isMounted = true

      this.getPages(1, fireLoading, getPage, filter).then((res) => {
        if (!isMounted) return
        setData(res.result)
        fireLoading(false)
      })

      return () => {
        isMounted = false
      }
    }, [])

    const CreateButton = this.CreateButton
    const Modal = this.ModalComponent
    const Table = this.renderTable({
      actions: { edit: openModalForEdit, delete: openDeletePopup },
    })

    // TODO: add callback
    // TODO: create callbacks
    return (
      <AdminLayout
        title={translation(this.title)}
        action={
          <CreateButton
            translation={translation}
            callback={openModalForCreate}
          />
        }
      >
        {this.hasFilter && <Filter />}
        <Table
          data={data.data}
          button={
            <CreateButton
              translation={translation}
              callback={openModalForCreate}
            />
          }
          callback={openModalForCreate}
        />
        <Modal
          loading={loading}
          callback={callback}
          fields={this.modalFields}
        />
        {this.hasPaginate && (
          <Pagination
            page={data.paginate.page}
            getPage={(page) =>
              this.getPages(page, setLoading, getPage, filter).then((res) => {
                setData(res.result)
                fireLoading(false)
              })
            }
            pages={data.paginate.pages}
          />
        )}
      </AdminLayout>
    )
  }
}

export default CrudPage
