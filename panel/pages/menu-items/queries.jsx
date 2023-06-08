import { gql } from "@apollo/client";

export default {
  all: gql`
    query ($filter: MenuItemFilter) {
      result: getAllMenuItems(filter: $filter) {
        id
        title
        icon
        sort
        show_in_menu
        badge_key
        access_id
        access_component_id
        parent_id
        createdAt
      }
    }
  `,
  mixin: gql`
    query (
      $accessFilter: AccessComponentFilter
      $menuFilter: MenuItemFilter
      $roleFilter: AccessFilter
    ) {
      access: getAllAccessComponents(filter: $accessFilter) {
        id
        name
        parent_id
      }
      menu: getAllMenuItems(filter: $menuFilter) {
        id
        title
        icon
        sort
        show_in_menu
        access_component_id
        badge_key
        access_id
        parent_id
      }
      role: getAllAccesses(filter: $roleFilter) {
        id
        name
        description
      }
    }
  `,
  create: gql`
    mutation ($input: MenuItemInput!) {
      result: createMenuItem(input: $input) {
        id
        title
        icon
        sort
        show_in_menu
        access_component_id
        badge_key
        access_id
        parent_id
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: MenuItemInput!) {
      result: updateMenuItem(id: $id, input: $input) {
        id
        title
        icon
        sort
        show_in_menu
        access_component_id
        badge_key
        access_id
        parent_id
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteMenuItem(id: $id) {
        success
        message
      }
    }
  `,
  allRoles: gql`
    query ($page: Int, $limit: Int, $filter: MenuItemFilter) {
      result: getAllAccesses(filter: $filter) {
        id
        name
        description
      }
    }
  `,
  sort: gql`
    mutation ($input: [sortMenuItemInput]) {
      result: sortMenuItems(input: $input) {
        success
        message
      }
    }
  `,
};
