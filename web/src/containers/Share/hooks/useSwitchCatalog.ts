import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { checkedMenuAction, getCheckedMenu, getParentMenu } from "store/shareSlice";
import routes from "@/src/routes";
import type { MenuItem } from "components/Menu";

const useSwitchCatalog = () => {
  const dispatch = useDispatch()
  const checkedMenu = useSelector(getCheckedMenu)
  const parentMenu = useSelector(getParentMenu)
  const history = useRouter()

  console.log(history, 2213)

  const [focus, setFocus] = useState(false)

  const onCheckedMenu = (option: MenuItem) => {
    dispatch(checkedMenuAction(option))

    return option.child ? history.push(routes.share(option.id)) : history.push(routes.shareCategory(parentMenu.id, option.id))
  }

  return {
    focus,
    setFocus,
    parentMenu,
    checkedMenu,
    onCheckedMenu
  }
}

export default useSwitchCatalog
