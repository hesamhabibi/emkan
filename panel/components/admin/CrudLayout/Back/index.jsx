import { useRouter } from "next/router";
import Button from "@admin/Button";

export default function Back({ url, title, className }) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(url)}
      type="white"
      className={`${className || "mb-5"}`}
    >
      <i className="fas fa-arrow-right ml-2" />
      {title}
    </Button>
  );
}

Back.defaultProps = {
  className: "",
};
