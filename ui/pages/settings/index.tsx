import { useRouter } from 'next/router';

export default function ProfileSettings() {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    router.push('/settings/general');
  }
  return <></>;
}
