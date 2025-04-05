import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../services/store';

export function usePageTitle(title: string) {
    useEffect(() => {
        document.title = title;
    }, [title]);
}

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
