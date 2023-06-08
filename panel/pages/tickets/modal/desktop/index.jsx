import Modal from "@admin/Modal"
import { useContext, useEffect, useState } from "react"
import { useApolloClient } from "~/app/Hooks/Api"
import { LoadingContext, TranslationContext } from "~/app/Context"
import queries from "../../queries"
import Styles from "~/components/Comment/desktop/comments.module.scss"
import { useForm } from "react-hook-form"
import { Grid, GridContainer } from "@admin/Grid"
import Input from "@admin/Input"
import Button from "@admin/Button"
import Empty from "@admin/Empty"
import moment from "jalali-moment"
import Toggle from "@admin/Input/Toggle"
import { useMutation } from "~/app/Hooks"
import client from "~/app/apollo-client"
import { notificationData } from "~/app/global"
import Shield from "@admin/Shield"

moment.locale("fa")

const RenderComments = ({ data }) => {
  return data.map((item, key) => (
    <div className={Styles.comment} key={key}>
      <div className={Styles.user}>
        <p className={Styles.profile}>
          <img
            width={30}
            height={30}
            src={
              item.user?.user_information?.media?.url || "/images/not-found.png"
            }
            alt="profile image"
          />
          <span className="mr-2">{item.user.full_name}</span>
          <small className="mr-2">
            (
            {new Date(parseInt(item.createdAt, 10)).toLocaleDateString("fa-IR")}
            )
          </small>
          {!!item.media?.url && (
            <i
              className="far fa-paperclip mr-auto pointer"
              onClick={() => window.open(process.env.apiHost + item.media.url)}
            />
          )}
        </p>
        <hr className="mb-3" />
        <p className={`mb-2 ${Styles.bold}`}>{item.title}</p>
        <p className={Styles.content}>{item.text}</p>
      </div>
    </div>
  ))
}

const Desktop = ({ ticket, setTicket, setData: updateData }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const translation = useContext(TranslationContext)
  const fireLoading = useContext(LoadingContext)
  const { control, watch, reset, clearErrors, handleSubmit, setError } =
    useForm({
      defaultValues: {
        title: "",
        text: "",
        send_with: 0,
      },
    })
  const { getPage } = useApolloClient()

  const { mutate } = useMutation({
    setError,
    id: "null",
    clearErrors,
    setData,
    setLoading,
  })

  useEffect(() => {
    if (!ticket?.id) return

    getPage({
      page: 1,
      fields: { reply_to_id: ticket.id },
      exactFields: ["reply_to_id"],
      query: queries.replies,
    }).then(({ result }) => {
      setData(result)
      fireLoading(false)
    })

    updateData((prev) => {
      prev.data[prev.data.findIndex((item) => item.id === ticket.id)] = ticket
      return { ...prev }
    })
  }, [ticket])

  const addReply = async (data) => {
    const res = await mutate({
      mutation: queries.createReply,
      action: "create",
      variables: {
        input: data,
        id: ticket.id,
      },
    })
    if (res.status) reset({ send_with: 0 })
  }

  const setStatus = async (value) => {
    setLoading(true)
    try {
      await client.mutate({
        mutation: queries.setStatus,
        variables: {
          id: ticket.id,
          input: {
            status: value,
          },
        },
      })
      setTicket({ ...ticket, status: value })
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  return (
    <Modal
      full_screen
      actions={[]}
      title={translation("ticket conversation")}
      id="ticket-manager"
    >
      <GridContainer className={`p-3 text-right h-100 ${Styles.main}`} gap="Lg">
        <Grid className={Styles.footer} size={4}>
          <div style={{ position: "Static" }}>
            <h5 className="mb-3 d-flex justify-content-between align-items-center">
              {ticket.title}
              {!!ticket.media?.url && (
                <i
                  className="far fa-lg fa-paperclip align-items-center pointer"
                  onClick={() =>
                    window.open(process.env.apiHost + ticket.media.url)
                  }
                />
              )}
            </h5>
            <hr />
            <div className="mb-3">
              <small>{ticket.text}</small>
            </div>
          </div>
          <span className="d-block my-4">
            <Shield id="tickets_status_action" action>
              <Toggle
                data={[
                  { id: 1, name: translation("Active"), color: "#3ECF8E" },
                  { id: 2, name: translation("Ended"), color: "#EC6060" },
                ]}
                label={translation("comment status")}
                field={{ value: ticket.status, onChange: setStatus }}
                fieldState={{}}
              />
            </Shield>
          </span>
          <Shield id="ticket_answer_action" action>
            <div>
              <h5 className="mb-3">
                {translation("Reply to")} {ticket.title}
              </h5>
              <hr />
              <div className="mb-3">
                <Input
                  label={translation("title")}
                  type="text"
                  control={control}
                  name="title"
                />
              </div>
              <div className="mb-3">
                <Input
                  label={translation("text")}
                  type="textarea"
                  control={control}
                  name="text"
                />
              </div>
              <div className="mb-3">
                <Input
                  label={translation("file")}
                  type="file"
                  control={control}
                  name="media"
                />
              </div>
              <div className="mb-3">
                <Input
                  label={translation("send with")}
                  type="toggle"
                  control={control}
                  data={notificationData(translation)}
                  name="send_with"
                />
              </div>
              <Button
                disabled={!watch("text")}
                type="success"
                loading={loading}
                className={Styles.button}
                onClick={handleSubmit(addReply)}
              >
                {translation("Submit")}
              </Button>
            </div>
          </Shield>
        </Grid>

        <Grid size={8}>
          <div className={Styles.container}>
            {data.length ? (
              <RenderComments data={data} />
            ) : (
              <Empty Text={translation("no reply found")} />
            )}
          </div>
        </Grid>
      </GridContainer>
    </Modal>
  )
}

export default Desktop
