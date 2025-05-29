export type patronDetailType = {
  label: string;
  type: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
};

export const patronDetail: patronDetailType[] = [
  { label: 'Patron Type', type: 'select', name: 'patronType' },
  { label: 'Surname', type: 'text', name: 'surname', required: false },
  { label: 'Firstname', type: 'text', name: 'firstname', required: false },
  { label: 'Middlename', type: 'text', name: 'middlename' },
  { label: 'Email', type: 'email', name: 'email' },
  { label: 'Phone Number', type: 'text', name: 'phoneNumber' },
  { label: 'Gender', type: 'select', name: 'gender', required: false },
  {
    label: 'Date Of Birth',
    type: 'date',
    name: 'dateOfBirth',
    placeholder: 'YYYY-MM-DD',
  },
];

export const formFields = [
  {
    legend: 'Patron Detail',
    type: 'all',
    inputs: [
      { label: 'Patron Type', type: 'select', name: 'patronType' },
      { label: 'Surname', type: 'text', name: 'surname', required: false },
      { label: 'Firstname', type: 'text', name: 'firstname', required: false },
      { label: 'Middlename', type: 'text', name: 'middlename' },
      { label: 'Email', type: 'email', name: 'email' },
      { label: 'Phone Number', type: 'text', name: 'phoneNumber' },
      { label: 'Gender', type: 'select', name: 'gender', required: false },
      {
        label: 'Date Of Birth',
        type: 'date',
        name: 'dateOfBirth',
        placeholder: 'YYYY-MM-DD',
      },
    ],
  },
  {
    legend: 'Patron Address',
    type: 'all',
    inputs: [
      { label: 'Street', type: 'text', name: 'street' },
      { label: 'City', type: 'text', name: 'city', defaultValue: 'ijero' },
      { label: 'State', type: 'text', name: 'state', defaultValue: 'ekiti' },
      {
        label: 'Country',
        type: 'text',
        name: 'country',
        defaultValue: 'nigeria',
      },
    ],
  },
  {
    legend: 'Library Managment',
    type: 'all',
    inputs: [
      { label: 'Barcode', type: 'text', name: 'barcode' },
      { label: 'Library', type: 'text', name: 'library', defaultValue: 'aaoj' },
    ],
  },
  {
    legend: 'Employer Infomation',
    type: 'employer',
    inputs: [
      { label: 'Employer Name', type: 'text', name: 'employerName' },
      { label: 'School Name', type: 'text', name: 'schoolName' },
      { label: 'School Address', type: 'text', name: 'schoolAdress' },
      { label: 'Head Of School', type: 'text', name: 'headOfSchool' },
      { label: 'School Email', type: 'text', name: 'schoolEmail' },
      { label: 'School Phone Number', type: 'text', name: 'schoolPhoneNumber' },
    ],
  },
  {
    legend: 'Student School Info',
    type: 'student',
    inputs: [
      { label: 'School Name', type: 'select', name: 'schoolName' },
      {
        label: 'If Other School, Type Here',
        type: 'text',
        name: 'otherSchool',
      },
      { label: 'School Address', type: 'text', name: 'schoolAdress' },
      { label: 'Head Of School', type: 'text', name: 'headOfSchool' },
      { label: 'Current Class', type: 'text', name: 'currentClass' },
      { label: 'School Email', type: 'text', name: 'schoolEmail' },
      { label: 'School Phone Number', type: 'text', name: 'schoolPhoneNumber' },
    ],
  },

  {
    legend: 'Parent Information',
    type: 'student',
    inputs: [
      { label: 'Parent Name', type: 'text', name: 'parentName' },
      { label: 'Parent Address', type: 'text', name: 'parentAddress' },
      { label: 'Parent Phone Number', type: 'text', name: 'parentPhoneNumber' },
      {
        label: 'Relationship To Applicant',
        type: 'select',
        name: 'relationshipToPatron',
      },
      { label: 'Parent Email', type: 'text', name: 'parentEmail' },
    ],
  },
  {
    legend: 'General Information',
    type: 'all',
    value: 'email,sms,call',
    inputs: [
      {
        label: 'Message Preferences',
        type: 'text',
        name: 'messagePreferences',
        value: 'email,sms,call',
      },
    ],
  },
];
