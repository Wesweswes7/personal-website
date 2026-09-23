import Link from '@/components/site-link';
export default function NotFound() {
  return (
    <div className="container inner-page">
      <div className="page-heading">
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <p>This page is not available. / 页面不存在。</p>
      </div>
      <div className="related-links">
        <Link className="text-link" href="/en/">
          English home →
        </Link>
        <Link className="text-link" href="/zh/">
          返回中文首页 →
        </Link>
      </div>
    </div>
  );
}
