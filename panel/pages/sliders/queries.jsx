import { gql } from "@apollo/client"

export default {
  all: gql`
    query ($page: Int, $limit: Int, $filter: SliderFilter) {
      result: getSliders(page: $page, limit: $limit, filter: $filter) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          id
          name # multi language
          name_panel
          name_web
          key
          description # multi language
          description_panel
          description_web
          status
          images {
            id
            media {
              media_id
              alt # multi language
              url
            }
            sort
            title # multi language
            title_panel
            title_web
            link
            description # multi language
            description_panel
            description_web
          }
        }
      }
    }
  `,
  create: gql`
    mutation ($input: SliderInput!) {
      result: createSlider(input: $input) {
        id
        name # multi language
        name_panel
        name_web
        key
        description # multi language
        description_panel
        description_web
        status
        images {
          id
          sort
          media {
            media_id
            alt # multi language
            url
          }

          title # multi language
          title_panel
          title_web
          link
          description # multi language
          description_panel
          description_web
        }
        user_id
        createdAt
        updatedAt

        # user
      }
    }
  `,
  createImage: gql`
    mutation ($id: ID, $input: SliderImageInput) {
      result: addSliderImage(id: $id, input: $input) {
        id
        name # multi language
        name_panel
        name_web
        key
        description # multi language
        description_panel
        description_web
        status
        images {
          id
          sort
          media {
            media_id
            alt # multi language
            url
          }

          title # multi language
          title_panel
          title_web
          link
          description # multi language
          description_panel
          description_web
        }
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: SliderInput!) {
      result: updateSlider(id: $id, input: $input) {
        id
        name # multi language
        name_panel
        name_web
        key
        description # multi language
        description_panel
        description_web
        status
        images {
          id
          sort
          media {
            media_id
            alt # multi language
            url
          }

          title # multi language
          title_panel
          title_web
          link
          description # multi language
          description_panel
          description_web
        }
        user_id
        createdAt
        updatedAt

        # user
      }
    }
  `,
  delete: gql`
    mutation ($id: ID) {
      result: deleteSlider(id: $id) {
        success
        message
      }
    }
  `,
  deleteImage: gql`
    mutation ($id: ID, $image_id: ID) {
      result: removeSliderImage(id: $id, image_id: $image_id) {
        success
        message
      }
    }
  `,
  statusSlider: gql`
    mutation ($id: ID, $input: setStatusSliderInput) {
      result: setStatusSlider(id: $id, input: $input) {
        id
      }
    }
  `,
  updateImage: gql`
    mutation ($id: ID, $image_id: ID, $input: SliderImageInput) {
      result: updateSliderImage(id: $id, image_id: $image_id, input: $input) {
        id
        name # mulit language
        name_panel
        name_web
        key
        description # mulit language
        description_panel
        description_web
        status
        images {
          id
          sort
          media {
            media_id
            alt # multi language
            url
          }

          title # mulit language
          title_panel
          title_web
          link
          description # mulit language
          description_panel
          description_web
        }
      }
    }
  `,
  sortSlider: gql`
    mutation ($id: ID, $input: [SliderImageSortInput]) {
      result: sortSliderImages(id: $id, input: $input) {
        success
        message
      }
    }
  `,
}
