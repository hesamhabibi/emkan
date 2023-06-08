import { gql } from "@apollo/client";

const CREATE_BRAND = gql`
  mutation ($input: BrandInput!) {
    result: createBrand(input: $input) {
      id
      title # multi language
      title_panel
      title_web
      active
      show_in_menu
      description # multi language
      description_panel
      description_web
      seo_id
      user_id
      createdAt
      updatedAt

      media {
        media_id
        alt
        url

        # media
      }
      # user
      seo {
        title # multi language
        title_panel
        title_web
        description # multi language
        description_panel
        description_web
        keywords # multi language
        keywords_panel
        keywords_web
        url
        url_status #["auto": 1, "custom": 2]
        canonical_url
        redirect_url_301
        redirect_url_404
        robots_status
        createdAt
        updatedAt
      }
    }
  }
`;

const DELETE_BRAND = gql`
  mutation ($id: ID!) {
    result: deleteBrand(id: $id) {
      success
      message
    }
  }
`;

const UPDATE_BRAND = gql`
mutation($id: ID!, $input: BrandInput!) {
  result: updateBrand(id: $id, input: $input) {
    id
    title # multi language
    title_panel
    title_web
    active
    show_in_menu
    description # multi language
    description_panel
    description_web
    seo_id
    user_id
    createdAt
    updatedAt
    
    media {
        media_id
        alt
        url

        # media
    }
    # user
    seo {
        title # multi language
        title_panel
        title_web
        description # multi language
        description_panel
        description_web
        keywords # multi language
        keywords_panel
        keywords_web
        url
        url_status #["auto": 1, "custom": 2]
        canonical_url
        redirect_url_301
        redirect_url_404
        robots_status
        createdAt
        updatedAt
    }
  }
}

`

export { CREATE_BRAND, DELETE_BRAND,UPDATE_BRAND };
