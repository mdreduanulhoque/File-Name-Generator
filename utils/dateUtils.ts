export const getFormattedDateParts = (date: Date) => {
  const day = date.getDate();
  const year = date.getFullYear();
  // Using 'en-US' to ensure we get the full month name properly
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  
  return { day, month, year };
};

const getOrdinalSuffix = (n: number): string => {
  const v = n % 100;
  if (v >= 11 && v <= 13) return 'th';
  switch (n % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

export const generateFileString = (
  date: Date, 
  fileNumber: number, 
  options: { lowercaseMonth?: boolean } = {}
): string => {
  const { day, month, year } = getFormattedDateParts(date);
  
  const monthStr = options.lowercaseMonth ? month.toLowerCase() : month;
  const ordinalDay = `${day}${getOrdinalSuffix(day)}`;
  
  // New Format: 1st_April_2026_File_1
  return `${ordinalDay}_${monthStr}_${year}_File_${fileNumber}`;
};