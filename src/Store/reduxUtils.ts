import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {store} from "./store";
import {useMemo} from "react";

export type AppRootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
export const useActions = <T extends ActionCreatorsMapObject<any>>(actions: T) => {
    const dispatch = useAppDispatch()
    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
    return boundActions
}