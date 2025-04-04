export const EXTERNAL_ENDPOINT = {
  GET_DESTINATION: (keyword: string) =>
    `/v1/contentsvc/public/delivery-fee/destination?keyword=${keyword}`,
  CHECK_DELIVERY_FEE: () =>
    `/v1/contentsvc/public/delivery-fee/fare-non-international`,
};
