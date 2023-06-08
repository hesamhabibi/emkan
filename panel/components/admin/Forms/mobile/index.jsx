import { useContext } from "react"
import Modal from "@admin/Modal"
import TableStyles from "~/styles/components/table.module.scss"
import Tab from "@admin/Tab"
import Input from "@admin/Input"
import { TranslationContext } from "~/app/Context"
import Shield from "@admin/Shield"
import HasPerm from "~/app/perm"
import { useRouter } from "next/router"

export default function Mobile({
  formGroup,
  state,
  control,
  section,
  id,
  tag,
  loading,
  actions,
  hasInfo,
  tabRef,
}) {
  const translation = useContext(TranslationContext)

  const router = useRouter()

  let inputsKey = 0

  return (
    <Modal
      hasInfo={hasInfo}
      actions={actions}
      id={id}
      title={state}
      tag={tag}
      loading={loading}
    >
      <div ref={tabRef}>
        {formGroup.length > 1 ? (
          <Tab className="pb-5" id={`${id}-tab`} sticky>
            {formGroup
              .filter((item) => HasPerm({ id: item.perm, router }))
              .map((fieldset, key) => (
                <div
                  className="mx-2"
                  title={fieldset.title}
                  key={key}
                  icon={fieldset.icon}
                >
                  {fieldset.form.map((input, key) => {
                    if (input.render)
                      return (
                        <Shield key={key} id={input.perm}>
                          <div className={TableStyles.field}>
                            {input.render({
                              label: input.label
                                ? input.label
                                : translation(input.name, section),
                              control,
                              ...input,
                            })}
                          </div>
                        </Shield>
                      )
                    return (
                      <Shield key={key} id={input.perm}>
                        <div key={key} className={TableStyles.field}>
                          <Input
                            key={inputsKey++}
                            control={control}
                            label={
                              input.label
                                ? input.label
                                : translation(input.name, section)
                            }
                            {...input}
                          />
                        </div>
                      </Shield>
                    )
                  })}
                </div>
              ))}
          </Tab>
        ) : formGroup.length ? (
          <div>
            <div className="pb-5 mx-2">
              {formGroup[0].map((input, key) => {
                if (input.render)
                  return (
                    <Shield key={key} id={input.perm}>
                      <div key={key} className={TableStyles.field}>
                        {input.render({
                          label: input.label
                            ? input.label
                            : translation(input.name, section),
                          control,
                          ...input,
                        })}
                      </div>
                    </Shield>
                  )

                return (
                  <Shield key={key} id={input.perm}>
                    <div key={key} className={TableStyles.field}>
                      <Input
                        {...input}
                        control={control}
                        label={
                          input.label
                            ? input.label
                            : translation(input.name, section)
                        }
                      />
                    </div>
                  </Shield>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  )
}
