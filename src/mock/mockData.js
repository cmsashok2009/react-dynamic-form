export const cards_bk = Array.from({ length: 5 }, (_, index) => ({
  title: `Card ${index + 1}`,
  subtitle: `Subtitle ${index + 1}`,
  inputs: [
    { type: "text", label: `Text Input ${index + 1} - 1`, priority: 1 },
    { type: "text", label: `Text Input ${index + 1} - 2`, priority: 2 },
    {
      type: "dropdown",
      label: `Dropdown ${index + 1}`,
      options: [
        { label: `Option 1 for Card ${index + 1}`, value: "1" },
        { label: `Option 2 for Card ${index + 1}`, value: "2" },
      ],
      priority: 1,
    },
  ],
  subcards: Array.from({ length: 2 }, (_, subIndex) => ({
    title: `Subcard ${subIndex + 1} of Card ${index + 1}`,
    inputs: [
      { type: "text", label: `Subcard Input ${subIndex + 1}`, priority: 1 },
      {
        type: "dropdown",
        label: `Subcard Dropdown ${subIndex + 1}`,
        options: [
          { label: `Option A for Subcard ${subIndex + 1}`, value: "A" },
          { label: `Option B for Subcard ${subIndex + 1}`, value: "B" },
        ],
        priority: 2,
      },
    ],
  })),
}));

export const cards = [
  {
    title: "Personal Information",
    subtitle: "Tell us about yourself",
    inputs: [
      { type: "text", label: "Full Name", priority: 1 },
      { type: "text", label: "Email Address", priority: 1 },
      {
        type: "dropdown",
        label: "Gender",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ],
        priority: 2,
      },
    ],
    subcards: [],
  },
  {
    title: "Contact Details",
    subtitle: "How can we reach you?",
    inputs: [
      { type: "text", label: "Phone Number", priority: 1 },
      { type: "text", label: "Address Line 1", priority: 1 },
      {
        type: "dropdown",
        label: "Country",
        options: [
          { label: "United States", value: "us" },
          { label: "Canada", value: "ca" },
          { label: "India", value: "in" },
        ],
        priority: 2,
      },
    ],
    subcards: [],
  },
  {
    title: "Education History",
    subtitle: "Your academic background",
    inputs: [],
    subcards: [
      {
        title: "High School",
        inputs: [
          { type: "text", label: "School Name", priority: 1 },
          { type: "text", label: "Graduation Year", priority: 2 },
        ],
      },
      {
        title: "College",
        inputs: [
          { type: "text", label: "College Name", priority: 1 },
          { type: "text", label: "Degree", priority: 2 },
        ],
      },
    ],
  },
  {
    title: "Work Experience",
    subtitle: "Where have you worked?",
    inputs: [],
    subcards: [
      {
        title: "Most Recent Job",
        inputs: [
          { type: "text", label: "Company Name", priority: 1 },
          { type: "text", label: "Job Title", priority: 2 },
        ],
      },
      {
        title: "Previous Job",
        inputs: [
          { type: "text", label: "Company Name", priority: 1 },
          { type: "text", label: "Job Title", priority: 2 },
        ],
      },
    ],
  },
  {
    title: "References",
    subtitle: "People who can vouch for you",
    inputs: [
      { type: "text", label: "Reference Name", priority: 1 },
      { type: "text", label: "Relationship", priority: 2 },
    ],
    subcards: [
      {
        title: "Reference Contact",
        inputs: [
          { type: "text", label: "Phone Number", priority: 1 },
          { type: "text", label: "Email", priority: 2 },
        ],
      },
    ],
  },
];
