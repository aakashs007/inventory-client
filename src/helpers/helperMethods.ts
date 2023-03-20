export function currentOrderBelongsToUser(currentOrder: any, userId: string | number): boolean {
  // if(currentOrder?.sent_from_user?.id === userId || currentOrder?.sent_to_user?.id === userId) {
  //   return true;
  // }

  // return false;
  return true;
}

export function parseDate(dateTime: string): string {
  if (dateTime) {
    const date = new Date(dateTime);
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
  }

  return "";
}