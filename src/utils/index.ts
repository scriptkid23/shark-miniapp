export const sleep = (ms: number) => {
  let timeoutId: NodeJS.Timeout;
  const promise = new Promise<void>((resolve) => {
    timeoutId = setTimeout(resolve, ms);
  });

  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return { promise, cancel };
};

export const stripVal = (val: string, start = 6, end = 4) => {
  return val ? val.slice(0, start) + '...' + val.slice(val.length - end, val.length) : '';
};

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export function getInitials(name: string) {
  try {
    return name
      .split(" ") // Tách chuỗi thành mảng các từ
      .map((word) => word.charAt(0).toUpperCase()) // Lấy chữ cái đầu và in hoa
      .join(""); // Nối lại thành chuỗi
  } catch (error) {
    return name
  }

}

export function getRandomColor(playerId: number): any {
  const colors = [
    "secondary",
    "default",
    "primary",
    "success",
    "warning",
    "danger",
  ];

  // Hash playerId to create a consistent index
  const index = playerId % colors.length;

  return colors[index];
}

export const getLevel = (points: number) => {
  if (points <= 10) return 1;
  if (points <= 50) return 2;
  if (points <= 300) return 3;
  return 4;
};