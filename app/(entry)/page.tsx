import { HomePage } from '@/components/pages';
import { metadata as siteMetadata } from '@/lib/site';
export const metadata = siteMetadata('en');
export default function Page() {
  return <HomePage lang="en" />;
}
