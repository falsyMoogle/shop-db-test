export const formatDate = (date) => {
  return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export const getFormattedDate = (timestamp) => {
  const date = new Date(timestamp);
  return formatDate(date);
}

export const formatToTimestamp = (date) => {
  return date.getTime();
}

export const compareDates = (checkingDate) => {
  const date = new Date();
  const parsedDate = new Date(checkingDate);

  const expWithinOneMonth = new Date();
  expWithinOneMonth.setMonth(date.getMonth() + 1)
  const expWithinTwoMonth = new Date();
  expWithinTwoMonth.setMonth(date.getMonth() + 2)
  const expWithinThreeMonth = new Date();
  expWithinThreeMonth.setMonth(date.getMonth() + 3)

  if (parsedDate >= date && parsedDate < expWithinOneMonth) {
    return 'danger'
  } else if (parsedDate > expWithinOneMonth && parsedDate < expWithinTwoMonth) {
    return 'warning'
  } else if (parsedDate > expWithinTwoMonth && parsedDate < expWithinThreeMonth) {
    return 'success'
  } else {
    return ''
  }
}