import TabbedLayout from './TabbedLayout';

export default function SettingsLayout({ children }: React.PropsWithChildren<{}>) {
  const navigation = [
    { name: 'General', href: '/settings/general' },
    { name: 'Change Password', href: '/settings/password' },
  ];

  return (
    <TabbedLayout title="Settings" navigation={navigation}>
      {children}
    </TabbedLayout>
  );
}
