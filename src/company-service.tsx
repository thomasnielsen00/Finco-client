import axios from 'axios';

axios.defaults.baseURL = 'https://vercel-express-ebon-six.vercel.app/api';

export type Company = {
  company_id: number;
  company_name: string;
  calculated_value_per_share: number;
  currentSharePrice: number;
  calculated_difference: number;
};

export type companycalculations = {
  company_id: number;
  company_name: string;
  calculated_value_per_share: number;
  calculated_difference: number;
  EBITDA: number;
  OCFBT: number;
  CFBT: number;
  PFCF: number;
  UFCF: number;
  discount: number;
  presentvalue: number;
  future_EBITDA: [];
  future_changeNWC: [];
  futureOCFBT: [];
  future_CAPEX: [];
  future_CFBT: [];
  future_taxespaid: [];
  future_PFCF: [];
  future_depLeaseAdjustment: [];
  future_opLeaseAdjustment: [];
  future_UFCF: [];
  futureDiscount: [];
  presentValueUFCF: [];
  EBITDAresult: number; // EBITDAresult i database
  futureDiscount2027: number;
  discountedTerminalValue: number;
  PVofUnleveredFCF: number;
  enterpriseValue: number;
  impliedEquityValue: number;
  ImpliedEquityofCommonStockholders: number;
  currentSharePrice: number;
  amountShares: number;
  value_per_share: number;
};

class CompanyService {
  /**
   * Get company with given id.
   */
  get(company_id: number) {
    return axios.get<Company>('/companies/' + company_id).then((response) => response.data);
  }
  /**
   * Get all companies.
   */
  getAll() {
    return axios.get<Company[]>('/companies').then((response) => response.data);
  }
  /**
   * Create new task having the given title.
   *
   * Resolves the newly created task id.
   */
  // create(title: string) {
  //   return axios
  //     .post<{ id: number }>('/tasks', { title: title })
  //     .then((response) => response.data.id);
  // }

  getCompanyCalculations(company_id: number) {
    return axios
      .get<companycalculations>('/companycalculations/' + company_id)
      .then((response) => response.data);
  }
}

const companyService = new CompanyService();
export default companyService;
