import Styles from "./comments.module.scss"
import Modal from "@admin/Modal"
import Input from "@admin/Input"
import { useContext, useEffect, useState } from "react"
import { LoadingContext, TranslationContext } from "~/app/Context"
import { useForm } from "react-hook-form"
import client from "~/app/apollo-client"
import moment from "jalali-moment"
import queries from "../queries"
import { make_tree } from "~/app/Tree"
import Popup from "@admin/Popup"
import AddBtn from "@admin/CrudLayout/Add"
import { useDispatch } from "react-redux"
import { closePopup, openPopup } from "~/app/State/popups"
import { setErrors } from "~/app/Hooks/Api"
import SwitchToggle from "@admin/Input/SwitchToggle"
import Empty from "@admin/Empty"
import Button from "@admin/Button"
import Shield from "@admin/Shield"

const model_types = {
  product: -1,
  blog: 1,
  page: 2,
  catalogue: 3,
  project: 4,
}

moment.locale("fa")

const RenderComments = ({
  data,
  deep = 0,
  deleteComment,
  setValue,
  userId,
  parent,
  setConfirmed,
  confirmation,
}) => {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()

  return data.map((item, key) => (
    <div
      className={`${deep === 0 ? Styles.comment : Styles.replyComment} ${
        userId !== item.user_id ? Styles.user : ""
      }`}
      key={key}
    >
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
          ({new Date(parseInt(item.createdAt, 10)).toLocaleDateString("fa-IR")})
        </small>
      </p>
      <hr className="mb-3" />
      {deep !== 0 && (
        <p className={`mb-2 ${Styles.bold}`}>
          {translation("reply to")} {parent?.title}
        </p>
      )}
      {deep === 0 && <p className={`mb-2 ${Styles.bold}`}>{item.title}</p>}
      <p className={Styles.content}>{item.text}</p>
      <div className={Styles.actions}>
        {userId !== item.user_id && (
          <SwitchToggle
            size="sm"
            field={{
              onChange: setConfirmed.bind(this, item.id),
              value: item.confirmed,
            }}
            label={translation(item.confirmed ? "Confirmed" : "UnConfirmed")}
          />
        )}

        <Shield id="comments_delete_action" action route="/comments/hidden">
          <i
            onClick={deleteComment.bind(this, key)}
            className="far fa-trash-alt mx-1"
          />
        </Shield>

        <Shield id="comments_reply_field" route="/comments/hidden">
          <i
            className="far fa-reply mx-1"
            onClick={() => {
              setValue("reply_to_id", item.id)
              dispatch(openPopup("comments-manager"))
            }}
          />
        </Shield>
      </div>
      {!!item.replies.length && (
        <>
          <div className={Styles.hasReply} />
          <RenderComments
            confirmation={confirmation}
            parent={item}
            data={item.replies}
            userId={userId}
            setValue={setValue}
            deleteComment={deleteComment}
            deep={deep + 1}
            setConfirmed={setConfirmed}
          />
        </>
      )}
    </div>
  ))
}

const Comment = ({ type, model_id }) => {
  type = model_types[type]

  const dispatch = useDispatch()
  const translation = useContext(TranslationContext)
  const fireLoading = useContext(LoadingContext)

  const setLoading = fireLoading

  const [treeComments, setTreeComments] = useState([])
  const [confirmation, setConfirmation] = useState(false)
  const [comments, setComments] = useState([])
  const [userId, setUserId] = useState(null)

  const { control, handleSubmit, setError, watch, reset, setValue, getValues } =
    useForm()

  const deleteComment = async ({ key }) => {
    setLoading(true)
    try {
      const res = await client.mutate({
        mutation: queries.delete,
        variables: {
          id: comments[key].id,
        },
      })

      setComments((prev) => {
        prev.splice(key, 1)
        return [...prev]
      })
    } catch (e) {
      console.log(e)
    }
    dispatch(closePopup("comment-delete-action"))
    setLoading(false)
  }

  const createComment = async (data) => {
    setLoading(true)
    let res
    try {
      res = await client.mutate(
        !data.reply_to_id
          ? {
              mutation: queries.create,
              variables: {
                input: {
                  title: data.title,
                  text: data.text,
                  model_id,
                  model_type: type,
                },
              },
            }
          : {
              mutation: queries.reply,
              variables: {
                input: {
                  text: data.text,
                },
                reply_to_id: data.reply_to_id,
              },
            }
      )
      setComments((prev) => [...prev, res.data.result])
      reset({})
    } catch (e) {
      console.log(e)
      if (e.graphQLErrors?.length) setErrors(e.graphQLErrors[0], setError)
    }
    setLoading(false)
    if (res) dispatch(closePopup("comments-manager"))
  }

  const getData = async () => {
    setLoading(true)
    try {
      return await client.query({
        query: queries.all,
        variables: {
          filter: {
            model_id: [{ value: model_id }],
          },
        },
      })
    } catch (e) {
      console.log(e)
    }

    return []
  }

  const setConfirmed = async (id, value, props) => {
    const index = comments.findIndex((item) => item.id === id)
    setComments((prev) => {
      prev[index].confirmed = value
      return [...prev]
    })
    try {
      const res = await client.mutate({
        mutation: queries.confirmed,
        variables: {
          id,
          confirmed: value,
        },
      })

      setComments((prevState) => {
        prevState[index] = res.data.result
        return [...prevState]
      })
    } catch (e) {
      setComments((prev) => {
        prev[index].confirmed = !value
        return [...prev]
      })
    }
  }

  useEffect(() => {
    if (!userId) setUserId(JSON.parse(localStorage.getItem("user"))?.user?.id)
    let isMounted = true

    getData().then((res) => {
      if (!isMounted) return
      fireLoading(false)
      setConfirmation(res.data.confirmation.value)
      setComments(res.data.result)
    })
    reset({})

    return () => {
      isMounted = false
    }
  }, [model_id])

  useEffect(() => {
    setTreeComments(make_tree(comments, "replies", "reply_to_id"))
  }, [comments])

  const deleteActions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => dispatch(closePopup("comment-delete-action")),
    },
    {
      background: "#e40031",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: handleSubmit(deleteComment),
    },
  ]

  const actions = [
    {
      background: "#fff",
      boxShadow: null,
      color: "black",
      title: translation("Close"),
      onClick: () => dispatch(closePopup("comments-manager")),
    },
    {
      background: "#5f6cec",
      boxShadow: null,
      color: "#fff",
      title: translation("Submit"),
      onClick: handleSubmit(createComment),
    },
  ]

  const deletePopup = (key) => {
    dispatch(openPopup("comment-delete-action"))
    reset({ key })
  }

  return (
    <>
      <Popup
        actions={actions}
        status="primary"
        id="comments-manager"
        title={translation("Create Comment")}
      >
        {watch("reply_to_id") ? (
          <div className={Styles.reply}>
            <span>
              {translation("reply to")}
              {"  "}
              {
                comments.find((item) => item.id === getValues("reply_to_id"))
                  .title
              }
            </span>
            <i
              className="far fa-times"
              onClick={() => setValue("reply_to_id", null)}
            />
          </div>
        ) : (
          <Shield id="comments_title_field" route="/comments/hidden">
            <Input
              label={translation("title")}
              type="text"
              control={control}
              name="title"
            />
          </Shield>
        )}
        <Shield id="comments_text_field" route="/comments/hidden">
          <div className="mb-3">
            <Input
              label={translation("text")}
              type="textarea"
              control={control}
              name="text"
            />
          </div>
        </Shield>
      </Popup>
      <Popup
        status="danger"
        id="comment-delete-action"
        actions={deleteActions}
        title={translation("Warning")}
      >
        <p>{translation("delete-warning", "menuItems")}</p>
      </Popup>
      <Modal
        full_screen
        actions={[]}
        id="comments"
        title={translation("Comments")}
      >
        <Shield route="/comments/hidden" action id="comments_create_action">
          <AddBtn
            title={translation("Create Comment")}
            callback={dispatch.bind(this, openPopup("comments-manager"))}
          />
        </Shield>
        {treeComments.length ? (
          <>
            <Shield id="comments_see_column" route="/comments/hidden">
              <div className={Styles.container}>
                <RenderComments
                  setValue={setValue}
                  deleteComment={deletePopup}
                  data={treeComments}
                  userId={userId}
                  parent={null}
                  setConfirmed={setConfirmed}
                  confirmation={confirmation}
                />
              </div>
            </Shield>
          </>
        ) : (
          <Empty
            Text={translation("no comment found")}
            button={
              <Shield
                route="/comments/hidden"
                action
                id="comments_create_action"
              >
                <Button
                  onClick={dispatch.bind(this, openPopup("comments-manager"))}
                  type="success"
                >
                  {translation("Add Comment")}
                  <i className="fas fa-plus-circle mr-2" />
                </Button>
              </Shield>
            }
            callback={dispatch.bind(this, openPopup("comments-manager"))}
          />
        )}
      </Modal>
    </>
  )
}

export default Comment
