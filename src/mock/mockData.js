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
      {
        type: "text",
        label: "Full Name",
        priority: 1,
        required: true,
        validation: {
          pattern: "^[a-zA-Z ]+$",
          message: "Only letters and spaces are allowed",
        },
      },
      {
        type: "text",
        label: "Email Address",
        priority: 1,
        required: false,
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Invalid email format",
        },
      },
      {
        type: "dropdown",
        label: "Gender",
        priority: 2,
        required: true,
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ],
      },
    ],
    subcards: [],
  },
  {
    title: "Contact Details",
    subtitle: "How can we reach you?",
    inputs: [
      {
        type: "text",
        label: "Phone Number",
        priority: 1,
        required: true,
        validation: {
          pattern: "^[0-9]{10}$",
          message: "Phone number must be 10 digits",
        },
      },
      {
        type: "text",
        label: "Address Line 1",
        priority: 1,
        required: false,
        validation: {
          pattern: "^[\\w\\s,.-]{5,}$",
          message: "Minimum 5 characters",
        },
      },
      {
        type: "dropdown",
        label: "Country",
        priority: 2,
        required: true,
        options: [
          { label: "United States", value: "us" },
          { label: "Canada", value: "ca" },
          { label: "India", value: "in" },
        ],
      },
    ],
  },
  {
    title: "Education History",
    subtitle: "Your academic background",
    inputs: [],
    subcards: [
      {
        title: "High School",
        inputs: [
          {
            type: "text",
            label: "School Name",
            priority: 1,
            required: true,
            validation: {
              pattern: "^[a-zA-Z0-9 .'-]{3,}$",
              message: "Invalid school name",
            },
          },
          {
            type: "text",
            label: "Graduation Year",
            priority: 2,
            required: false,
            validation: {
              pattern: "^(19|20)\\d{2}$",
              message: "Enter a valid year",
            },
          },
        ],
      },
      {
        title: "College",
        inputs: [
          {
            type: "text",
            label: "College Name",
            priority: 1,
            required: true,
            validation: {
              pattern: "^[a-zA-Z0-9 .'-]{3,}$",
              message: "Invalid college name",
            },
          },
          {
            type: "text",
            label: "Degree",
            priority: 2,
            required: true,
            validation: {
              pattern: "^[a-zA-Z .'-]{2,}$",
              message: "Invalid degree name",
            },
          },
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
          {
            type: "text",
            label: "Company Name",
            priority: 1,
            required: true,
            validation: {
              pattern: "^[a-zA-Z0-9 &.,'-]{2,}$",
              message: "Invalid company name",
            },
          },
          {
            type: "text",
            label: "Job Title",
            priority: 2,
            required: true,
            validation: {
              pattern: "^[a-zA-Z &]{2,}$",
              message: "Invalid job title",
            },
          },
        ],
      },
      {
        title: "Previous Job",
        inputs: [
          {
            type: "text",
            label: "Company Name",
            priority: 1,
            required: false,
            validation: {
              pattern: "^[a-zA-Z0-9 &.,'-]{2,}$",
              message: "Invalid company name",
            },
          },
          {
            type: "text",
            label: "Job Title",
            priority: 2,
            required: false,
            validation: {
              pattern: "^[a-zA-Z &]{2,}$",
              message: "Invalid job title",
            },
          },
        ],
      },
    ],
  },
  {
    title: "References",
    subtitle: "People who can vouch for you",
    inputs: [
      {
        type: "text",
        label: "Reference Name",
        priority: 1,
        required: true,
        validation: {
          pattern: "^[a-zA-Z ]+$",
          message: "Only letters and spaces allowed",
        },
      },
      {
        type: "text",
        label: "Relationship",
        priority: 2,
        required: false,
        validation: {
          pattern: "^[a-zA-Z ]+$",
          message: "Only letters and spaces allowed",
        },
      },
    ],
    subcards: [
      {
        title: "Reference Contact",
        inputs: [
          {
            type: "text",
            label: "Phone Number",
            priority: 1,
            required: true,
            validation: {
              pattern: "^[0-9]{10}$",
              message: "Must be 10 digits",
            },
          },
          {
            type: "text",
            label: "Email",
            priority: 2,
            required: true,
            validation: {
              pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
              message: "Invalid email format",
            },
          },
        ],
      },
    ],
  },
];
