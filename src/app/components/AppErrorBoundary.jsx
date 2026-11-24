import { Component } from "react";

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // در مرحله اتصال سرویس پایش خطا، گزارش به سرویس مرکزی ارسال خواهد شد.
    console.error("Application rendering error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-screen" dir="rtl">
          <h1>مشکلی در نمایش این صفحه پیش آمد.</h1>
          <p>صفحه را دوباره بارگذاری کنید. اگر مشکل ادامه داشت، بعداً تلاش کنید.</p>
          <button type="button" onClick={() => window.location.reload()}>بارگذاری مجدد</button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
