import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsMobile } from '../common/slices/ResponsiveSlice';

const useResponsive = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      dispatch(setIsMobile(isMobile));
    };

    // Initial check and then adding event listener for resize
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);
};

export default useResponsive;