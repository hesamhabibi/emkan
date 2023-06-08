import IconSearch from "./icon-search"
import { Controller } from "react-hook-form"
import Button from "@admin/Button/buttons.module.scss"
import { Grid } from "@admin/Grid"

export default {
  tableFields: [
    {
      title: "title",
    },
  ],
  allowed: [
    "title",
    "badge_key",
    "access_component_id",
    "show_in_menu",
    "icon",
    "parent_id",
    "sort",
  ],
  fields: (components, translation) => [
    [
      {
        size: 6,
        name: "title",
      },
      {
        size: 6,
        name: "badge_key",
      },
      {
        size: 6,
        name: "access_component_id",
        data: [
          {
            id: null,
            name: "بدون دسترسی",
          },
          ...components,
        ],
        type: "select-searchable",
      },
      {
        size: 6,
        data: [
          {
            name: translation("Show"),
            status: true,
            color: "#3ECF8E",
            id: true,
          },
          {
            name: translation("Hide"),
            status: false,
            color: "#EC6060",
            id: false,
          },
        ],
        type: "toggle",
        name: "show_in_menu",
      },
      {
        // size: 12,
        render: ({ control, ...extra }) => (
          <Grid size={12}>
            <Controller
              render={({ ...props }) => (
                <IconSearch
                  {...extra}
                  {...props}
                  title="Icon"
                  section="menuItems"
                />
              )}
              name="icon"
              control={control}
            />
          </Grid>
        ),
      },
    ],
  ],
  defaultValues: {
    icon: "",
    title: "",
    access_component_id: "",
    show_in_menu: true,
    parent_id: null,
  },
  tableActions: (router, actions, translation) => [
    (item) => {
      if (item.access_component_id)
        return {
          onClick: () =>
            router.push(
              `/menu-items/acl-tree?id=${item.access_component_id}&access_id=${item.access_id}`
            ),
          class: Button.white,
          title: translation("Access Allocation"),
        }
      return {
        onClick: () => {},
        class: null,
        title: "",
      }
    },
    (item) => ({
      onClick: () => actions.create(item),
      icon: "far fa-plus",
      tooltip: translation("create", "menuItems"),
      dir: "right",
    }),
    (item) => ({
      onClick: () => actions.edit(item),
      icon: "far fa-edit",
      tooltip: translation("edit", "menuItems"),
      dir: "right",
    }),
    (item) => ({
      onClick: () => actions.delete(item),
      icon: "far fa-trash-alt",
      tooltip: translation("delete", "menuItems"),
      dir: "right",
    }),
  ],
}
