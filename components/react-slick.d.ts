declare module 'react-slick' {
  import { ComponentType } from 'react';
  
  interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    responsive?: Array<{
      breakpoint: number;
      settings: Partial<Settings>;
    }>;
  }
  
  interface SliderProps extends Settings {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }
  
  const Slider: ComponentType<SliderProps>;
  export default Slider;
} 