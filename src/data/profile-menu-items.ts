
export interface ProfileMenuItemsProps {
  name: string;
  url: string;
}

export const ProfileMenuItems: Array<ProfileMenuItemsProps> = [
  { name: 'Profile', url: '/profile' },
  { name: 'Settings', url: '/settings' },
  { name: 'Billings', url: '/billing' },
  { name: 'Sign Out', url: '/signout' },
];

