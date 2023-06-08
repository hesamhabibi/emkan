import { gql } from "@apollo/client";

export default {
  getFiles: gql`
    {
      result: getSettingByKey(key: "all_tutorial_files") {
        value
      }
      users: getAllUsers {
        id
        name: full_name
      }
    }
  `,
};
