import fetch_api from "../../helpers/api";

const prefix = "media/upload-media-brand";

export const upload_media_service = async (data) => {
  const header = { "content-type": "multipart/form-data" };
  return await fetch_api(prefix, data, "POST", header);
};
