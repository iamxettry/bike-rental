interface ButtonProps {
  className?: string;
  path?: string;
  title: string;
  icon?: any;
  onClick?: () => void | undefined;
}

type feature ={
  start:string;
  engine:string;
  distance:string;
}
interface Bike {
  id?: string;
  name: string;
  rating?: number;
  brand?: string;
  model?: string;
  year?: number;
  color?: string;
  features: Features;
  price: number;
  description?: string;
  image?: string;
  date?: string;
}
interface BikeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Bike[];
}

interface userData {
  email:string;
  first_name: string;
  id: string;
  is_superuser: boolean;
  last_name: string;
  profile_picture: string;
  username: string;
};