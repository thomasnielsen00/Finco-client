export type LanguageTextInfo = {
  property: string;
  portfolio: string;
  home: string;
  marked: string;
  about: string;
  log_in: string;
  profile: string;
  admin: string;
  change_language: string;
  mail: string;
  password: string;
  //HOME
  get_started: string;
  header: string;
  welcome_text: string;
  //MARKED
  calculated_stock_value: string;
  live_stock_value: string;
  calculated: string;
  explore_company: string;
  difference: string;
  watchlist: string;
  calculate: string;
  search: string;
  sort_by: string;
  no_sort: string;
  key_figures: string;
  buy_stock: string;
  calculated_return: string;
  buy: string;
  estimated5years: string;
  //PORTFOLIO
  show_details: string;
  //REGISTER
  register_text: string;
  sign_up: string;
  create_user: string;
  full_name: string;
  confirm_password: string;
  cancel: string;
  write_full_name: string;
  email_not_valid: string;
  password_not_long_enough: string;
  passwords_not_matching: string;
  wrong_email_or_password: string;
  network_error: string;
  email_in_use: string;
  portfolio_right: string;
  //USER-ACCOUNT
  my_account: string;
  //LOG-IN NEEDED PROMPT
  log_in_needed_text: string;
  log_in_here: string;
  or: string;
  create_a_user: string;
  to_access_portfolio: string;
  //USERDETAILS
  general_information: string;
  email_inputLabel: string;
  password_inputLabel: string;
  full_name_inputLabel: string;
  phone_number_inputLabel: string;
  investing_details: string;
  monthly_savings_inputLabel: string;
  from_kr_underLabel: string;
  to_kr_underLabel: string;
  risk_willingness_inputLabel: string;
  prefered_industries_inputLabel: string;
  button_save: string;
  button_saved: string;
  sign_out: string;
  //PORTFOLIODETAILS
  company_name: string;
  total_price: string;
  return_percentage: string;
  return_kr: string;
  current_value: string;
  history: string;
  investment_date: string;
  amount: string;
  historic_share_price: string;
  price_kr: string;
  sell_button: string;
  sell_confirmation_header: string;
  sell_confirmation_first_part: string;
  sell_confirmation_second_part: string;
  sell_confirmation_third_part: string;
  sell_confirmation_fourth_part: string;
  sell_confirmation_cancel: string;
  sell_confirmation_confirm: string;
  //CALCULATIONS
  ebitda: string;
};

export const languageText = {
  norwegian: {
    property: "norwegian",
    portfolio: "Portefølje",
    home: "Hjem",
    marked: "Marked",
    about: "Om oss",
    log_in: "Logg inn",
    admin: "Admin",
    profile: "Min profil",
    change_language: "Change language",
    mail: "E-post",
    password: "Passord",
    //HOME
    get_started: "Kom i gang",
    header: "Vanskelig å komme i gang med aksjer?",
    welcome_text:
      "Velkommen til FINCO og vår investeringsapplikasjon. Vi tar oss av analysen, slik at du kan lene deg tilbake. Sjekk ut våre beregninger og gjør investeringer på en trygg måte!",
    //MARKED
    calculated_stock_value: "Kalkulert akjseverdi",
    live_stock_value: "Sanntids aksjekurs",
    calculated: "Kalkulert",
    explore_company: "Utforsk",
    difference: "Differanse",
    watchlist: "Følg selskap",
    calculate: "Se beregninger",
    search: "Søk her",
    sort_by: "Sorter etter",
    no_sort: "Ingen sortering",
    key_figures: "Nøkkeltall",
    buy_stock: "Kjøp akjse",
    calculated_return: "Kalkulert avkastning",
    buy: "Kjøp",
    estimated5years: "Estimert verdi de neste 5 år",
    //PORTFOLIO
    show_details: "Vis detaljer",
    //REGISTER
    register_text: "Har du ingen bruker? Registrer deg her",
    sign_up: "Registrer deg her",
    create_user: "Lag bruker",
    full_name: "Fullt navn",
    confirm_password: "Gjenta passord",
    cancel: "Avbryt",
    write_full_name: "Vennligst skriv inn ditt fulle navn",
    email_not_valid: "E-post ikke gyldig",
    password_not_long_enough: "Vennligst velg et passord med minumum 8 tegn",
    passwords_not_matching:
      "Passordene dine er ikke like, vennligst prøv igjen",
    wrong_email_or_password: "Feil e-post eller passord!",
    network_error: "Nettverksfeil!",
    email_in_use: "E-post er allerede i bruk",
    portfolio_right: "Porteføljeoversikt",
    //USER-ACCOUNT
    my_account: "Min profil",
    //LOG-IN NEEDED PROMPT
    log_in_needed_text: "Ikke logget inn, eller ikke en bruker enda?",
    log_in_here: "Logg inn her",
    or: "eller",
    create_a_user: "lag en bruker",
    to_access_portfolio: "for å få tilgang til din portefølje",
    //USERDETAILS
    general_information: "Generell informasjon",
    email_inputLabel: "E-post",
    password_inputLabel: "Passord",
    full_name_inputLabel: "Fullt navn",
    phone_number_inputLabel: "Telefonnummer",
    investing_details: "Investeringsdetaljer",
    monthly_savings_inputLabel: "Månedlig sparebeløp",
    from_kr_underLabel: "Fra kr",
    to_kr_underLabel: "Til kr",
    risk_willingness_inputLabel: "Risikovilje",
    prefered_industries_inputLabel: "Foretrukne bransjer",
    button_save: "Lagre endringer",
    button_saved: "Lagret",
    sign_out: "Logg ut",
    //PORTFOLIODETAILS
    company_name: "Selskap",
    total_price: "Totalbeløp",
    return_percentage: "Avkastning(%)",
    return_kr: "Avkastning(kr)",
    current_value: "Nåværende verdi",
    history: "Historikk",
    investment_date: "Dato",
    amount: "Antall akjser",
    historic_share_price: "Anskaffelsesverdi (kr)",
    price_kr: "Pris (kr)",
    sell_button: "Selg",
    sell_confirmation_header: "Sikker på at du vil selge denne investeringen?",
    sell_confirmation_body_first_part: "Hvis du selger denne investeringen på",
    sell_confirmation_body_second_part: "akjser i",
    sell_confirmation_body_third_part: "sitter du igjen med",
    sell_confirmation_body_fourth_part: "kr i avkastning",
    sell_confirmation_cancel: "Avbryt",
    sell_confirmation_confirm: "Bekreft",
    //CALCULATIONS
    ebitda: "Earnings before interest, tax, depreciation and amorization",
  },
  english: {
    property: "english",
    portfolio: "Portfoilo",
    home: "Home",
    marked: "Market",
    about: "About us",
    log_in: "Sign in",
    admin: "Admin",
    profile: "My profile",
    change_language: "Endre språk",
    mail: "E-mail adress",
    password: "Password",
    //HOME
    get_started: "Get started",
    header: "Struggling to get started with stocks?",
    welcome_text:
      "Welcome to FINCO-investement. We provide you with a new way to handle your savings. Browse our calculations and make safe investments!",
    //MARKED
    calculated_stock_value: "Calculated stock value",
    live_stock_value: "Current stock value",
    calculated: "Calculated",
    explore_company: "Explore",
    difference: "Difference",
    watchlist: "Add to watchlist",
    calculate: "See calculations",
    search: "Search",
    key_figures: "Key figures",
    buy_stock: "Buy stock",
    sort_by: "Sort by",
    no_sort: "No sorting",
    calculated_return: "Calculated return",
    buy: "Buy",
    estimated5years: "Estimated value the next 5 years",
    //PORTFOLIO
    show_details: "Show details",
    //REGISTER
    register_text: "No user? Sign up here",
    sign_up: "Sign up",
    create_user: "Create user",
    full_name: "Full name",
    confirm_password: "Confirm password",
    cancel: "Cancel",
    write_full_name: "Please write your full name",
    email_not_valid: "Provided email is not valid",
    password_not_long_enough:
      "Please choose a password with minimum 8 characters",
    passwords_not_matching: "Your passwords does not match, please try again",
    wrong_email_or_password: "Wrong e-mail or password!",
    network_error: "Network error!",
    email_in_use: "E-mail already in use",
    portfolio_right: "Portfolio overview",
    //PROFILE
    my_account: "My account",
    //LOG-IN NEEDED PROMPT
    log_in_needed_text: "Not logged in, or not a user yet?",
    log_in_here: "Log In here",
    or: "or",
    create_a_user: "create a user",
    to_access_portfolio: "to access your portfolio",
    //USERDETAILS
    general_information: "General information",
    email_inputLabel: "Email",
    password_inputLabel: "Password",
    full_name_inputLabel: "Full name",
    phone_number_inputLabel: "Phone number",
    investing_details: "Investing details",
    monthly_savings_inputLabel: "Monthly savings amount",
    from_kr_underLabel: "From kr",
    to_kr_underLabel: "To kr",
    risk_willingness_inputLabel: "Risk willingness",
    prefered_industries_inputLabel: "Prefered industries",
    button_save: "Save changes",
    button_saved: "Saved",
    sign_out: "Sign out",
    //PORTFOLIODETAILS
    company_name: "Company",
    total_price: "Total price",
    return_percentage: "Return(%)",
    return_kr: "Return(kr)",
    current_value: "Current value",
    history: "History",
    investment_date: "Date",
    amount: "Number of shares",
    historic_share_price: "acquisition value (kr)",
    price_kr: "Price (kr)",
    sell_button: "Sell",
    sell_confirmation_header: "Sure you want to sell this investment?",
    sell_confirmation_body_first_part: "If you sell your investment of",
    sell_confirmation_body_second_part: "shares in",
    sell_confirmation_body_third_part: "you are left with",
    sell_confirmation_body_fourth_part: "kr in return",
    sell_confirmation_cancel: "Cancel",
    sell_confirmation_confirm: "Confirm",
    //CALCULATIONS:
    ebitda: "Earnings before interest, tax, depreciation and amorization",
  },
};
