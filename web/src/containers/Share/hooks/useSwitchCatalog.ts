import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { checkedMenuAction, getCheckedMenu, getParentMenu, parentMenuAction } from "store/shareSlice";
import routes from "@/src/routes";
import type { MenuItem } from "components/Menu";
import get from "lodash/get";
import isString from "lodash/isString";

const useSwitchCatalog = () => {
  const dispatch = useDispatch()
  const checkedMenu = useSelector(getCheckedMenu)
  const parentMenu = useSelector(getParentMenu)
  const history = useRouter()

  const [focus, setFocus] = useState(false)
  const checked = get(history, 'query.id', [])

  const onCheckedMenu = (option: MenuItem, parent: MenuItem | null) => {
    dispatch(checkedMenuAction(option))

    if (parent) {
      dispatch(parentMenuAction(parent))
      return history.push(routes.shareCategory(parent.id, option.id))
    }

    return history.push(routes.share(option.id))
  }

  return {
    focus,
    checked: isString(checked) ? [checked] : checked,
    parentMenu,
    checkedMenu,
    setFocus,
    onCheckedMenu
  }
}

export default useSwitchCatalog
