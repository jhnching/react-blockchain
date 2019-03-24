export type Crypto = {
  id: number,
  name: string,
  symbol: string,
  slug: string,
  is_active: number,
  first_historical_data: string,
  last_historical_data: string,
  platform: null,
  cmc_rank?: number,
  price?: number
}