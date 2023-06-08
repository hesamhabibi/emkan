import { gql } from "@apollo/client";

const GET_ALL_BRANDS = gql`
  query ($filter: BrandFilter) {
    result: getAllBrands(filter: $filter) {
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

const GET_BRAND = gql`
  query ($id: ID!) {
    result: getBrand(id: $id) {
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

const GET_BRANDS = gql`
  query ($page: Int, $limit: Int, $filter: BrandFilter, $sort: [Sort] ) {
    result: getBrands(page: $page, limit: $limit, filter: $filter, sort: $sort) {

      paginate {
        page
        limit
        total
        pages
      }

      data {
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
  }
`;


export { GET_ALL_BRANDS, GET_BRAND, GET_BRANDS };
