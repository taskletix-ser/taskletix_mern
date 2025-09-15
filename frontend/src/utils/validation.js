// Email validation (Gmail specific)
export const validateGmail = (email) => {
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(email);
};

// Phone number validation
export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Country code validation
export const validateCountryCode = (code) => {
  return code && code !== '';
};

// Name validation
export const validateName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 50;
};

// Project details validation
export const validateProjectDetails = (details) => {
  return details && details.trim().length >= 10 && details.trim().length <= 1000;
};

// Complete contact form validation
export const validateContactForm = (data) => {
  const errors = {};

  if (!validateName(data.name)) {
    errors.name = 'Name must be between 2 and 50 characters';
  }

  if (!validateGmail(data.email)) {
    errors.email = 'Please enter a valid Gmail address';
  }

  if (!validateCountryCode(data.country_code)) {
    errors.country_code = 'Please select a country code';
  }

  if (!validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }

  if (!data.company || data.company.trim().length < 2) {
    errors.company = 'Company name is required (minimum 2 characters)';
  }

  if (!data.project_type || data.project_type === '') {
    errors.project_type = 'Please select a project type';
  }

  if (!data.budget_range || data.budget_range === '') {
    errors.budget_range = 'Please select a budget range';
  }

  if (!data.timeline || data.timeline === '') {
    errors.timeline = 'Please select a timeline';
  }

  if (!validateProjectDetails(data.project_details)) {
    errors.project_details = 'Project details must be between 10 and 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Data sanitization
export const sanitizeFormData = (data) => {
  return {
    name: data.name?.trim(),
    email: data.email?.trim().toLowerCase(),
    country_code: data.country_code,
    phone: data.phone?.replace(/\D/g, ''),
    company: data.company?.trim(),
    project_type: data.project_type,
    budget_range: data.budget_range,
    timeline: data.timeline,
    project_details: data.project_details?.trim()
  };
};

// Format phone number for display
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Truncate text for display
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Timeline options
export const getTimelineOptions = () => [
  { value: '', label: 'Select Timeline' },
  { value: '1-2 weeks', label: '1-2 weeks' },
  { value: '2-4 weeks', label: '2-4 weeks' },
  { value: '1-2 months', label: '1-2 months' },
  { value: '2-3 months', label: '2-3 months' },
  { value: '3+ months', label: '3+ months' },
  { value: 'Not sure', label: 'Not sure' }
];

// Budget options
export const getBudgetOptions = () => [
  { value: '', label: 'Select Budget Range' },
  { value: '$1,000 - $5,000', label: '$1,000 - $5,000' },
  { value: '$5,000 - $10,000', label: '$5,000 - $10,000' },
  { value: '$10,000 - $25,000', label: '$10,000 - $25,000' },
  { value: '$25,000 - $50,000', label: '$25,000 - $50,000' },
  { value: '$50,000+', label: '$50,000+' },
  { value: 'Not sure', label: 'Not sure' }
];

// Project type options
export const getProjectTypeOptions = () => [
  { value: '', label: 'Select Project Type' },
  { value: 'Website Development', label: 'Website Development' },
  { value: 'E-commerce Website', label: 'E-commerce Website' },
  { value: 'Web Application', label: 'Web Application' },
  { value: 'Mobile App', label: 'Mobile App' },
  { value: 'UI/UX Design', label: 'UI/UX Design' },
  { value: 'Website Redesign', label: 'Website Redesign' },
  { value: 'Maintenance & Support', label: 'Maintenance & Support' },
  { value: 'Other', label: 'Other' }
];

// Country code options
export const getCountryCodeOptions = () => [
  { value: '', label: 'Code' },
  { value: '+1', label: '+1 (US/Canada)' },
  { value: '+44', label: '+44 (UK)' },
  { value: '+91', label: '+91 (India)' },
  { value: '+61', label: '+61 (Australia)' },
  { value: '+49', label: '+49 (Germany)' },
  { value: '+33', label: '+33 (France)' },
  { value: '+81', label: '+81 (Japan)' },
  { value: '+86', label: '+86 (China)' },
  { value: '+55', label: '+55 (Brazil)' },
  { value: '+7', label: '+7 (Russia)' },
  { value: '+971', label: '+971 (UAE)' },
  { value: '+966', label: '+966 (Saudi Arabia)' },
  { value: '+65', label: '+65 (Singapore)' },
  { value: '+852', label: '+852 (Hong Kong)' },
  { value: '+82', label: '+82 (South Korea)' },
  { value: '+31', label: '+31 (Netherlands)' },
  { value: '+46', label: '+46 (Sweden)' },
  { value: '+47', label: '+47 (Norway)' },
  { value: '+45', label: '+45 (Denmark)' },
  { value: '+358', label: '+358 (Finland)' },
  { value: '+48', label: '+48 (Poland)' },
  { value: '+420', label: '+420 (Czech Republic)' },
  { value: '+36', label: '+36 (Hungary)' },
  { value: '+39', label: '+39 (Italy)' },
  { value: '+34', label: '+34 (Spain)' },
  { value: '+351', label: '+351 (Portugal)' },
  { value: '+32', label: '+32 (Belgium)' },
  { value: '+41', label: '+41 (Switzerland)' },
  { value: '+43', label: '+43 (Austria)' },
  { value: '+30', label: '+30 (Greece)' },
  { value: '+90', label: '+90 (Turkey)' },
  { value: '+972', label: '+972 (Israel)' },
  { value: '+27', label: '+27 (South Africa)' },
  { value: '+234', label: '+234 (Nigeria)' },
  { value: '+254', label: '+254 (Kenya)' },
  { value: '+20', label: '+20 (Egypt)' },
  { value: '+212', label: '+212 (Morocco)' },
  { value: '+216', label: '+216 (Tunisia)' },
  { value: '+213', label: '+213 (Algeria)' },
  { value: '+225', label: '+225 (Ivory Coast)' },
  { value: '+233', label: '+233 (Ghana)' },
  { value: '+256', label: '+256 (Uganda)' },
  { value: '+255', label: '+255 (Tanzania)' },
  { value: '+251', label: '+251 (Ethiopia)' },
  { value: '+260', label: '+260 (Zambia)' },
  { value: '+263', label: '+263 (Zimbabwe)' },
  { value: '+267', label: '+267 (Botswana)' },
  { value: '+268', label: '+268 (Eswatini)' },
  { value: '+266', label: '+266 (Lesotho)' },
  { value: '+258', label: '+258 (Mozambique)' },
  { value: '+261', label: '+261 (Madagascar)' },
  { value: '+248', label: '+248 (Seychelles)' },
  { value: '+230', label: '+230 (Mauritius)' },
  { value: '+269', label: '+269 (Comoros)' },
  { value: '+291', label: '+291 (Eritrea)' },
  { value: '+253', label: '+253 (Djibouti)' },
  { value: '+252', label: '+252 (Somalia)' },
  { value: '+249', label: '+249 (Sudan)' },
  { value: '+211', label: '+211 (South Sudan)' },
  { value: '+235', label: '+235 (Chad)' },
  { value: '+236', label: '+236 (Central African Republic)' },
  { value: '+237', label: '+237 (Cameroon)' },
  { value: '+238', label: '+238 (Cape Verde)' },
  { value: '+239', label: '+239 (São Tomé and Príncipe)' },
  { value: '+240', label: '+240 (Equatorial Guinea)' },
  { value: '+241', label: '+241 (Gabon)' },
  { value: '+242', label: '+242 (Republic of the Congo)' },
  { value: '+243', label: '+243 (Democratic Republic of the Congo)' },
  { value: '+244', label: '+244 (Angola)' },
  { value: '+245', label: '+245 (Guinea-Bissau)' },
  { value: '+246', label: '+246 (British Indian Ocean Territory)' },
  { value: '+247', label: '+247 (Ascension Island)' },
  { value: '+250', label: '+250 (Rwanda)' },
  { value: '+257', label: '+257 (Burundi)' },
  { value: '+259', label: '+259 (Zanzibar)' },
  { value: '+262', label: '+262 (Réunion)' },
  { value: '+264', label: '+264 (Namibia)' },
  { value: '+265', label: '+265 (Malawi)' },
  { value: '+290', label: '+290 (Saint Helena)' },
  { value: '+297', label: '+297 (Aruba)' },
  { value: '+298', label: '+298 (Faroe Islands)' },
  { value: '+299', label: '+299 (Greenland)' },
  { value: '+350', label: '+350 (Gibraltar)' },
  { value: '+352', label: '+352 (Luxembourg)' },
  { value: '+353', label: '+353 (Ireland)' },
  { value: '+354', label: '+354 (Iceland)' },
  { value: '+355', label: '+355 (Albania)' },
  { value: '+356', label: '+356 (Malta)' },
  { value: '+357', label: '+357 (Cyprus)' },
  { value: '+359', label: '+359 (Bulgaria)' },
  { value: '+370', label: '+370 (Lithuania)' },
  { value: '+371', label: '+371 (Latvia)' },
  { value: '+372', label: '+372 (Estonia)' },
  { value: '+373', label: '+373 (Moldova)' },
  { value: '+374', label: '+374 (Armenia)' },
  { value: '+375', label: '+375 (Belarus)' },
  { value: '+376', label: '+376 (Andorra)' },
  { value: '+377', label: '+377 (Monaco)' },
  { value: '+378', label: '+378 (San Marino)' },
  { value: '+379', label: '+379 (Vatican City)' },
  { value: '+380', label: '+380 (Ukraine)' },
  { value: '+381', label: '+381 (Serbia)' },
  { value: '+382', label: '+382 (Montenegro)' },
  { value: '+383', label: '+383 (Kosovo)' },
  { value: '+385', label: '+385 (Croatia)' },
  { value: '+386', label: '+386 (Slovenia)' },
  { value: '+387', label: '+387 (Bosnia and Herzegovina)' },
  { value: '+389', label: '+389 (North Macedonia)' },
  { value: '+421', label: '+421 (Slovakia)' },
  { value: '+423', label: '+423 (Liechtenstein)' },
  { value: '+500', label: '+500 (Falkland Islands)' },
  { value: '+501', label: '+501 (Belize)' },
  { value: '+502', label: '+502 (Guatemala)' },
  { value: '+503', label: '+503 (El Salvador)' },
  { value: '+504', label: '+504 (Honduras)' },
  { value: '+505', label: '+505 (Nicaragua)' },
  { value: '+506', label: '+506 (Costa Rica)' },
  { value: '+507', label: '+507 (Panama)' },
  { value: '+508', label: '+508 (Saint Pierre and Miquelon)' },
  { value: '+509', label: '+509 (Haiti)' },
  { value: '+590', label: '+590 (Guadeloupe)' },
  { value: '+591', label: '+591 (Bolivia)' },
  { value: '+592', label: '+592 (Guyana)' },
  { value: '+593', label: '+593 (Ecuador)' },
  { value: '+594', label: '+594 (French Guiana)' },
  { value: '+595', label: '+595 (Paraguay)' },
  { value: '+596', label: '+596 (Martinique)' },
  { value: '+597', label: '+597 (Suriname)' },
  { value: '+598', label: '+598 (Uruguay)' },
  { value: '+599', label: '+599 (Netherlands Antilles)' },
  { value: '+670', label: '+670 (East Timor)' },
  { value: '+672', label: '+672 (Australian External Territories)' },
  { value: '+673', label: '+673 (Brunei)' },
  { value: '+674', label: '+674 (Nauru)' },
  { value: '+675', label: '+675 (Papua New Guinea)' },
  { value: '+676', label: '+676 (Tonga)' },
  { value: '+677', label: '+677 (Solomon Islands)' },
  { value: '+678', label: '+678 (Vanuatu)' },
  { value: '+679', label: '+679 (Fiji)' },
  { value: '+680', label: '+680 (Palau)' },
  { value: '+681', label: '+681 (Wallis and Futuna)' },
  { value: '+682', label: '+682 (Cook Islands)' },
  { value: '+683', label: '+683 (Niue)' },
  { value: '+685', label: '+685 (Samoa)' },
  { value: '+686', label: '+686 (Kiribati)' },
  { value: '+687', label: '+687 (New Caledonia)' },
  { value: '+688', label: '+688 (Tuvalu)' },
  { value: '+689', label: '+689 (French Polynesia)' },
  { value: '+690', label: '+690 (Tokelau)' },
  { value: '+691', label: '+691 (Micronesia)' },
  { value: '+692', label: '+692 (Marshall Islands)' },
  { value: '+850', label: '+850 (North Korea)' },
  { value: '+853', label: '+853 (Macau)' },
  { value: '+855', label: '+855 (Cambodia)' },
  { value: '+856', label: '+856 (Laos)' },
  { value: '+880', label: '+880 (Bangladesh)' },
  { value: '+886', label: '+886 (Taiwan)' },
  { value: '+960', label: '+960 (Maldives)' },
  { value: '+961', label: '+961 (Lebanon)' },
  { value: '+962', label: '+962 (Jordan)' },
  { value: '+963', label: '+963 (Syria)' },
  { value: '+964', label: '+964 (Iraq)' },
  { value: '+965', label: '+965 (Kuwait)' },
  { value: '+967', label: '+967 (Yemen)' },
  { value: '+968', label: '+968 (Oman)' },
  { value: '+970', label: '+970 (Palestine)' },
  { value: '+973', label: '+973 (Bahrain)' },
  { value: '+974', label: '+974 (Qatar)' },
  { value: '+975', label: '+975 (Bhutan)' },
  { value: '+976', label: '+976 (Mongolia)' },
  { value: '+977', label: '+977 (Nepal)' },
  { value: '+992', label: '+992 (Tajikistan)' },
  { value: '+993', label: '+993 (Turkmenistan)' },
  { value: '+994', label: '+994 (Azerbaijan)' },
  { value: '+995', label: '+995 (Georgia)' },
  { value: '+996', label: '+996 (Kyrgyzstan)' },
  { value: '+998', label: '+998 (Uzbekistan)' },
  { value: '+1242', label: '+1242 (Bahamas)' },
  { value: '+1246', label: '+1246 (Barbados)' },
  { value: '+1264', label: '+1264 (Anguilla)' },
  { value: '+1268', label: '+1268 (Antigua and Barbuda)' },
  { value: '+1284', label: '+1284 (British Virgin Islands)' },
  { value: '+1340', label: '+1340 (U.S. Virgin Islands)' },
  { value: '+1345', label: '+1345 (Cayman Islands)' },
  { value: '+1441', label: '+1441 (Bermuda)' },
  { value: '+1473', label: '+1473 (Grenada)' },
  { value: '+1649', label: '+1649 (Turks and Caicos Islands)' },
  { value: '+1664', label: '+1664 (Montserrat)' },
  { value: '+1684', label: '+1684 (American Samoa)' },
  { value: '+1758', label: '+1758 (Saint Lucia)' },
  { value: '+1767', label: '+1767 (Dominica)' },
  { value: '+1784', label: '+1784 (Saint Vincent and the Grenadines)' },
  { value: '+1787', label: '+1787 (Puerto Rico)' },
  { value: '+1809', label: '+1809 (Dominican Republic)' },
  { value: '+1868', label: '+1868 (Trinidad and Tobago)' },
  { value: '+1869', label: '+1869 (Saint Kitts and Nevis)' },
  { value: '+1876', label: '+1876 (Jamaica)' }
];

