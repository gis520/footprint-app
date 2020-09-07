const formatNum = n => {
  const m = n.toString();
  return m[1] ? m : "0" + m;
};

export const formatDate = (date, seperator = "-") => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNum).join(seperator);
};

// 时间格式化
export const formatDateTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNum).join("-") +
    " " +
    [hour, minute, second].map(formatNum).join(":")
  );
};
