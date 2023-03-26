export const SUMMARY_UPDATE = "SUMMARY_UPDATE";


export function summaryUpdate(payload) {
    return {
      type: SUMMARY_UPDATE,
      payload,
    };
  }