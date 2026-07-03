export interface SummaryStats {
  promotions: number;
  categories: number;
  newCompanies: number;
  activeCompanies: number;
}

export interface SummarySales {
  id: string;
  companyId: string;
  companyTitle: string;
  sold: number;
  income: number;
}

export interface SummaryPromotion {
  promotionId: string;
  promotionName: string;
  companyTitle: string;
  discount: number;
}

export interface SummaryCategory {
  categoryId: string;
  categoryTitle: string;
  count: number;
}

export interface SummaryCountry {
  countryId: string;
  countryTitle: string;
  count: number;
}

export interface Country {
  id: string;
  title: string;
}

export interface Category {
  id: string;
  title: string;
}

export enum CompanyStatus {
  Active = 'active',
  NotActive = 'notActive',
  Pending = 'pending',
  Suspended = 'suspended',
}

export interface Company {
  id: string;
  title: string;
  description: string;
  status: CompanyStatus;
  joinedDate: string;
  hasPromotions: boolean;
  categoryId: string;
  categoryTitle: string;
  countryId: string;
  countryTitle: string;
  avatar?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  companyId: string;
  companyTitle: string;
  avatar?: string;
}

interface SummaryStatsRow {
  id: string;
  promotions: number;
  categories: number;
  new_companies: number;
  active_companies: number;
}

interface SummarySalesRow {
  id: string;
  company_id: string;
  company_title: string;
  sold: number;
  income: number;
}

interface CompanyRow {
  id: string;
  title: string;
  description: string;
  status: CompanyStatus;
  joined_date: string;
  has_promotions: boolean;
  category_id: string;
  category_title: string;
  country_id: string;
  country_title: string;
  avatar?: string;
}

interface PromotionRow {
  id: string;
  title: string;
  description: string;
  discount: number;
  company_id: string;
  company_title: string;
  avatar?: string;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const buildUrl = (table: string, query = 'select=*') => {
  return `${SUPABASE_URL}/rest/v1/${table}?${query}`;
};

const sendRequest = async <T>(url: string, init?: RequestInit) => {
  const headers = new Headers(init?.headers);

  headers.set('apikey', SUPABASE_KEY);
  headers.set('Authorization', `Bearer ${SUPABASE_KEY}`);

  const res = await fetch(url, {
    cache: 'no-store',
    ...init,
    headers,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return (await res.json()) as T;
};

const mapSummaryStats = (row: SummaryStatsRow): SummaryStats => ({
  promotions: row.promotions,
  categories: row.categories,
  newCompanies: row.new_companies,
  activeCompanies: row.active_companies,
});

const mapSummarySales = (row: SummarySalesRow): SummarySales => ({
  id: row.id,
  companyId: row.company_id,
  companyTitle: row.company_title,
  sold: row.sold,
  income: row.income,
});

const mapCompany = (row: CompanyRow): Company => ({
  id: row.id,
  title: row.title,
  description: row.description,
  status: row.status,
  joinedDate: row.joined_date,
  hasPromotions: row.has_promotions,
  categoryId: row.category_id,
  categoryTitle: row.category_title,
  countryId: row.country_id,
  countryTitle: row.country_title,
  avatar: row.avatar,
});

const mapPromotion = (row: PromotionRow): Promotion => ({
  id: row.id,
  title: row.title,
  description: row.description,
  discount: row.discount,
  companyId: row.company_id,
  companyTitle: row.company_title,
  avatar: row.avatar,
});

const columnByParam: Record<string, string> = {
  companyId: 'company_id',
  companyTitle: 'company_title',
  categoryId: 'category_id',
  countryId: 'country_id',
};

const stringifySupabaseQueryParams = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    const column = columnByParam[key] ?? key;

    if (value.includes('.')) {
      searchParams.set(column, value);
      return;
    }

    searchParams.set(column, `eq.${value}`);
  });

  return searchParams.toString();
};

export const getSummaryStats = async (init?: RequestInit) => {
  const rows = await sendRequest<SummaryStatsRow[]>(
    buildUrl('summary_stats', 'id=eq.1&select=*'),
    init,
  );

  if (!rows[0]) {
    throw new Error('Summary stats not found');
  }

  return mapSummaryStats(rows[0]);
};

export const getSummarySales = async (init?: RequestInit) => {
  const rows = await sendRequest<SummarySalesRow[]>(
    buildUrl('summary_sales', 'select=*'),
    init,
  );

  return rows.map(mapSummarySales);
};

export const getCountries = (init?: RequestInit) => {
  return sendRequest<Country[]>(buildUrl('countries', 'select=*'), init);
};

export const getCategories = (init?: RequestInit) => {
  return sendRequest<Category[]>(buildUrl('categories', 'select=*'), init);
};

export const getCompanies = async (init?: RequestInit) => {
  const rows = await sendRequest<CompanyRow[]>(
    buildUrl('companies', 'select=*'),
    init,
  );

  return rows.map(mapCompany);
};

export const getCompany = async (id: string, init?: RequestInit) => {
  const rows = await sendRequest<CompanyRow[]>(
    buildUrl('companies', `id=eq.${id}&select=*`),
    init,
  );

  if (!rows[0]) {
    throw new Error('Company not found');
  }

  return mapCompany(rows[0]);
};

export const getPromotions = async (
  params: Record<string, string> = {},
  init?: RequestInit,
) => {
  const query = stringifySupabaseQueryParams(params);
  const fullQuery = query ? `${query}&select=*` : 'select=*';

  const rows = await sendRequest<PromotionRow[]>(
    buildUrl('promotions', fullQuery),
    init,
  );

  return rows.map(mapPromotion);
};

export const getSummaryPromotions = async (
  init?: RequestInit,
): Promise<SummaryPromotion[]> => {
  const promotions = await getPromotions({}, init);

  return promotions.map((promotion) => ({
    promotionId: promotion.id,
    promotionName: promotion.title,
    companyTitle: promotion.companyTitle,
    discount: promotion.discount,
  }));
};

export const getSummaryCategories = async (
  init?: RequestInit,
): Promise<SummaryCategory[]> => {
  const [categories, companies] = await Promise.all([
    getCategories(init),
    getCompanies(init),
  ]);

  return categories.map((category) => ({
    categoryId: category.id,
    categoryTitle: category.title,
    count: companies.filter((company) => company.categoryId === category.id)
      .length,
  }));
};

export const getSummaryCountries = async (
  init?: RequestInit,
): Promise<SummaryCountry[]> => {
  const [countries, companies] = await Promise.all([
    getCountries(init),
    getCompanies(init),
  ]);

  return countries.map((country) => ({
    countryId: country.id,
    countryTitle: country.title,
    count: companies.filter((company) => company.countryId === country.id)
      .length,
  }));
};
