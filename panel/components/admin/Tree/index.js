import { useContext, useEffect, useState } from "react"
import classNames from "classnames"
import { ReactSortable } from "react-sortablejs"
import { flat_tree, make_tree } from "~/app/Tree"
import CategoriesStyle from "./Tree.module.scss"
import TableStyles from "~/styles/components/table.module.scss"
import Button from "@admin/Button"
import { DeviceView, TranslationContext } from "~/app/Context"

let data

const sortableOptions = {
  group: "treeData",
  animation: "200",
  swapThreshold: "0.5",
  forceFallback: true,
  handle: ".fa-grip-vertical",
  ghostClass: CategoriesStyle.sortableGhost,
  fallbackClass: CategoriesStyle.sortableFallback,
}

const Tree = ({
  data: obj,
  setData,
  actions,
  sort,
  root_parent,
  title,
  checkbox,
  not_draggable,
  checked_field,
  no_popup,
}) => {
  const translation = useContext(TranslationContext)
  const isDesktop = useContext(DeviceView)

  data = make_tree(obj || [], "children", "parent_id", root_parent || null)

  const [changed, setChanged] = useState(false)
  const [list, setList] = useState(data)
  const [isClick, setIsClick] = useState(false)
  const [loaded, setLoaded] = useState(0)

  useEffect(() => {
    const res = make_tree(
      obj || [],
      "children",
      "parent_id",
      root_parent || null
    )
    setList(res)
    data = res
    setLoaded(0)
  }, [obj])

  const change_checked = (node) => {
    const data = flat_tree(list)

    const child_result = data.filter((item) => item.parent_id === node.id)

    if (child_result.length > 0) {
      const status = []
      child_result.forEach((item) => status.push(item[checked_field]))
      const unique_status = status.filter((v, i, a) => a.indexOf(v) === i)
      const node_index = data.findIndex((item) => item.id === node.id)
      if (
        unique_status.includes(-1) ||
        (unique_status.includes(false) && unique_status.includes(true))
      ) {
        data[node_index][checked_field] = -1
      } else if (unique_status.length === 1) {
        data[node_index][checked_field] = unique_status[0]
      } else {
        data[node_index][checked_field] = -1
      }
    }

    if (node.parent_id !== null) {
      const parent_result = data.filter((item) => item.id === node.parent_id)
      if (parent_result.length > 0)
        parent_result.forEach((item) => change_checked(item))
    }
    setList(make_tree(data))
    if (setData) setData(data)
  }

  const activateSort = data.length ? (
    <div
      className={`${TableStyles.popup} ${!isDesktop ? TableStyles.mobile : ""}`}
    >
      {translation("Save Sorting Changes")}
      <div className={TableStyles.buttons}>
        <i
          className={`fas fa-times ${TableStyles.close}`}
          onClick={() => {
            setChanged(false)
            setLoaded(0)
            setList(data)
          }}
        />
        <Button
          onClick={() => {
            setChanged(false)
            setLoaded(0)
            sort(flat_tree(list, [], root_parent ?? null))
          }}
          type="success"
        >
          {translation("Save")}
        </Button>
      </div>
    </div>
  ) : null

  useEffect(() => {
    if (loaded > 2) setChanged(true)
    else setLoaded(loaded + 1)
  }, [list])

  if (!data.length)
    return <p className="mt-5 text-center">{translation("no record found")}</p>

  return (
    <div id={CategoriesStyle.categories}>
      <ReactSortable
        list={list}
        setList={setList}
        id={CategoriesStyle.treeList}
        {...sortableOptions}
      >
        {list.map((item, itemIndex) => (
          <BlockWrapper
            actions={actions}
            key={item.id}
            item={item}
            not_draggable={not_draggable}
            title={title}
            checked_field={checked_field}
            itemIndex={[itemIndex]}
            checkbox={checkbox}
            list={list}
            changeChecked={change_checked}
            setList={setList}
            isClick={isClick}
            setIsClick={setIsClick}
          />
        ))}
      </ReactSortable>
      {!no_popup ? (changed ? activateSort : null) : null}
    </div>
  )
}

const BlockWrapper = ({
  item,
  itemIndex,
  list,
  title,
  not_draggable,
  setList,
  isClick,
  checked_field,
  setIsClick,
  checkbox,
  actions,
  create,
  edit,
  deleteOption,
  changeChecked,
}) => {
  if (!item || !item.children) return null

  const handleCheckBox = (node, is_selected = null) => {
    const data = flat_tree(list)

    if (node[checked_field] === -1) {
      node[checked_field] = false
    }
    const selected = is_selected === null ? !node[checked_field] : is_selected
    // eslint-disable-next-line no-shadow
    const node_index = data.findIndex((item) => item.id === node.id)
    data[node_index][checked_field] = selected
    // setList(make_tree(data));

    if (node.children.length > 0) {
      node.children.map((child) => {
        return handleCheckBox(child, selected)
      })
    }
    setList(make_tree(data))
  }

  const checkBoxClassName = classNames({
    [CategoriesStyle.checked]: item[checked_field],
    [CategoriesStyle.notAll]: item[checked_field] === -1,
  })

  return (
    <section key={item.id} className={CategoriesStyle.categoryGroup}>
      <div key={item.id} id={item.id} className={CategoriesStyle.categoryItem}>
        <div className={CategoriesStyle.categoryItemBox}>
          {checkbox ? (
            <div
              className={`${CategoriesStyle.checkBox} ${checkBoxClassName}`}
              onClick={() => {
                handleCheckBox(item, null)
                changeChecked(item)
              }}
            />
          ) : null}
          {not_draggable ? null : <i className="fas fa-grip-vertical fa-lg" />}
          <span className={CategoriesStyle.title}>{item[title]}</span>
          <div className={CategoriesStyle.actions}>
            {actions.map((btn, key) => {
              const rows = btn(item)
              return (
                <button
                  data-tooltip-location={rows.dir}
                  data-tooltip={rows.tooltip}
                  key={key}
                  type="button"
                  onClick={rows.onClick}
                  className={rows.class}
                >
                  <i className={rows.icon} />
                  {rows.title}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <Container
        item={item}
        list={list}
        actions={actions}
        create={create}
        not_draggable={not_draggable}
        changeChecked={changeChecked}
        edit={edit}
        checkbox={checkbox}
        deleteOption={deleteOption}
        setList={setList}
        itemIndex={itemIndex}
        title={title}
        isClick={isClick}
        checked_field={checked_field}
        setIsClick={setIsClick}
      />
    </section>
  )
}

const Container = ({
  item,
  itemIndex,
  list,
  setList,
  isClick,
  actions,
  title,
  checked_field,
  not_draggable,
  checkbox,
  setIsClick,
  create,
  edit,
  deleteOption,
  changeChecked,
}) => {
  const isDesktop = useContext(DeviceView)
  return (
    <ReactSortable
      key={item.id}
      className={`${CategoriesStyle.categoryList} ${
        !isDesktop ? CategoriesStyle.mobile : ""
      }`}
      list={item.children}
      setList={(currentList) => {
        setList((sourceList) => {
          const data = flat_tree(list)
          const tempList = [...sourceList]
          const _itemIndex = [...itemIndex]
          const lastIndex = _itemIndex.pop()
          const lastArr = _itemIndex.reduce(
            (arr, i) => arr[i].children,
            tempList
          )
          currentList.forEach((item) => {
            const node_index = data.findIndex((node) => item.id === node.id)
            data[node_index].parent_id = lastArr[lastIndex].id
          })
          lastArr[lastIndex].children = currentList
          return tempList
        })
      }}
      {...sortableOptions}
    >
      {item.children &&
        item.children.map((items, index) => {
          return (
            <BlockWrapper
              key={items.id}
              item={items}
              itemIndex={[...itemIndex, index]}
              list={list}
              create={create}
              checkbox={checkbox}
              checked_field={checked_field}
              title={title}
              not_draggable={not_draggable}
              actions={actions}
              changeChecked={changeChecked}
              edit={edit}
              deleteOption={deleteOption}
              setList={setList}
              isClick={isClick}
              setIsClick={setIsClick}
            />
          )
        })}
    </ReactSortable>
  )
}

export default Tree
