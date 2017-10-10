exports.announcePayrollCutOff = (start_date, end_date) => {
  return new Promise((resolve, reject) => {
    let msg = `*PAYROLL PERIOD: ${start_date} to ${end_date}*
    Please be reminded that our cutoff is *TODAY, October 10 (Tuesday)*. Please *DOUBLE CHECK* your *ATTENDANCE REPORT* in HR HUB and FILE the necessary requirements or adjustments ON or BEFORE 2:00 PM on October 11 (Wednesday). *Final computation of payroll* will be done at exact 6:00 PM on October 11 (Wednesday) also. Thank you very much.`
    resolve(msg);
  });
};