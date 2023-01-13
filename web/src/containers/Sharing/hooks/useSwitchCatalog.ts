import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { checkedMenuAction, selectCheckedMenu, selectParentMenu, parentMenuAction } from "containers/Sharing/slice";
import routes from "@/src/routes";
import get from "lodash/get";
import isString from "lodash/isString";
import type { MenuItem } from "components/Menu";

const useSwitchCatalog = () => {
  const dispatch = useDispatch()
  const checkedMenu = useSelector(selectCheckedMenu, shallowEqual)
  const parentMenu = useSelector(selectParentMenu, shallowEqual)
  const history = useRouter()

  const [focus, setFocus] = useState(false)
  const checked = get(history, 'query.id', [])

  const onCheckedMenu = (option: MenuItem, parent: MenuItem | null) => {
    dispatch(checkedMenuAction(option))

    if (parent) {
      dispatch(parentMenuAction(parent))
      return history.push(routes.shareCategory(parent.id, option.id))
    }

    return history.push(routes.sharing(option.id))
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
