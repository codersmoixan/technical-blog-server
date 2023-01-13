import React, { useEffect } from "react"
import isEmpty from "lodash/isEmpty";
import { useDispatch, useSelector } from "react-redux";
import useNotifier from "components/Snackbar/hooks/useNotifier";
import { getNotifications, removeSnackbar } from "components/Snackbar/slice";

function Snackbar() {
  const notifications = useSelector(getNotifications)
  const dispatch = useDispatch()
  const notify = useNotifier()

  useEffect(() => {
    if (!isEmpty(notifications)) {
      notifications.forEach(notification => {
        notify(notification.message, notification.variant, {
          key: notification.key,
          onExited: (event, key) => {
            dispatch(removeSnackbar(key));
          },
        })
      })
    }
  }, [notifications])

  return null
}

export default Snackbar
