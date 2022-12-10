import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkedMenuAction, getCheckedMenu } from "store/shareSlice";
import type { MenuItem } from "components/common/Menu";

const useCatalogMenu = () => {
  const dispatch = useDispatch()
  const checkedMenu = useSelector(getCheckedMenu)

  const [focus, setFocus] = useState(false)

  const onCheckedMenu = (option: MenuItem) => {
    dispatch(checkedMenuAction(option))
  }

  return {
    focus,
    setFocus,
    checkedMenu,
    onCheckedMenu
  }
}

export default useCatalogMenu
