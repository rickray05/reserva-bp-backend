export const utils = {
  diff: function (datetime2, datetime1) {
    const dateStart = new Date(datetime1);
    const dateEnd = new Date(datetime2);
    const miliseconds = dateEnd.getTime() - dateStart.getTime();
    const seconds = miliseconds / 1000;
    const minutes = seconds / 60;

    return Math.abs(Math.round(minutes));
  },
};
