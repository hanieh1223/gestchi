import { Link } from "react-router-dom";

function NotFoundPage() {
  return <section className="empty-state not-found"><h1>صفحه پیدا نشد</h1><p>آدرسی که وارد کرده‌اید در دسترس نیست.</p><Link className="button button--primary" to="/">بازگشت به خانه</Link></section>;
}

export default NotFoundPage;
