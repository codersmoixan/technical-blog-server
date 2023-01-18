import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectSpeedDial, changeSpeedDial, clearSpeedDial } from "containers/App/slice";

const useSpeedDial = () => {
  const dispatch = useDispatch()
  const speedDial = useSelector(selectSpeedDial, shallowEqual)

  const change = (id: string) => dispatch(changeSpeedDial(id))

  const clear = () => dispatch(clearSpeedDial())

  return {
    speedDial,
    clearSpeedDial: clear,
    changeSpeedDial: change
  }
}

export default useSpeedDial
