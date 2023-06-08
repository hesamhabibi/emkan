import Styles from "./progress.module.scss";

export default function ProgressBar({ percent }) {
  return (
    <div className={Styles.wrapper}>
      <div
        className={Styles.Loading}
        style={{ width: `${(percent.loaded / percent.total) * 100}%` }}
      />
      <p className="text-center">
        {percent.loaded} از {percent.total} کیلوبایت
      </p>
    </div>
  );
}
