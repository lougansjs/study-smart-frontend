import { IconType } from "react-icons";
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings } from "react-icons/fi";

export interface SidebarItemsProps {
  name: string;
  icon: IconType;
  url: string;
}

export const SidebarItems: Array<SidebarItemsProps> = [
  { name: 'Home', icon: FiHome, url: '/' },
  { name: 'Trending', icon: FiTrendingUp, url: '/trending' },
  { name: 'Explore', icon: FiCompass, url: '/explore' },
  { name: 'Favourites', icon: FiStar, url: '/favorites' },
  { name: 'Settings', icon: FiSettings, url: '/settings' },
];

